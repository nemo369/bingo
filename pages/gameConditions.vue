<template>
  <section>
    <h1 class="tac">{{ $t('winning conditions') }}</h1>
    <h2 class="tac">{{ $t('bingo') }} - {{ album.name }}</h2>

    <v-stepper v-model="e1" class="bg-color pa-0 mb-16">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" editable>{{
          `Prizes Amout` | startCase
        }}</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"
          >Winning Conditions</v-stepper-step
        >
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <conditions
            v-if="album.board"
            :grid="album.board"
            @button-selected="chosedAlbum"
          />
        </v-stepper-content>
        <v-stepper-content step="2">
          <prizes
            v-if="conditions"
            :conditions="conditions"
            :prizes="prizes"
            :grid="album.board"
            @start-game="startGame"
            @update-prizes="updatePrizes"
          />
          <v-alert v-if="!!errMsg" color="error" class="ma-2">
            <small class="white--text">{{ errMsg }}</small>
          </v-alert>
          <div class="d-flex align-center justify-center">
            <h4 class="mr-6">Choose Game Type:</h4>
            <v-switch
              v-model="isPublic"
              color="secondary"
              inset
              :label="`${
                isPublic
                  ? 'Open - anyone can join'
                  : 'Selective - host approvel requiered'
              }`"
            ></v-switch>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Prizes from '~/components/condititons/prizes.vue';
import Conditions from '~/components/condititons/conditions.vue';

export default {
  name: 'GameCondititons',
  middleware: ['hasAlbum', 'auth'],
  components: {
    Prizes,
    Conditions,
  },
  data() {
    return {
      e1: 1,
      conditions: [],
      prizes: [],
      isPublic: true,
      errMsg: '',
    };
  },

  computed: {
    ...mapGetters({
      album: 'album/getAlbum',
      game: 'game/getGame',
    }),
  },
  methods: {
    chosedAlbum([...conditions]) {
      this.conditions = conditions;
      this.setPrizes(conditions);
      // add pictue to conditions
      this.e1 = 2;
    },
    startGame([...conditions]) {
      const prizes = [...this.prizes];
      const isPublic = this.isPublic;
      this.$store
        .dispatch('game/trySetGame', {
          conditions,
          prizes,
          isPublic,
          album: this.album,
        })
        .then(() => {
          this.$router.push(
            this.localePath({ name: 'Bingo', query: { pin: this.game.pin } })
          );
        })
        .catch(() => {
          this.errMsg = 'Oh no :)';
        });
    },
    setPrizes(conditions) {
      const prizes = [];
      conditions.forEach((condition) => {
        prizes.push({
          conditionId: condition.id,
          picture: this.getRandomPrizePic(),
          name: '',
        });
      });

      this.prizes = prizes;
    },
    updatePrizes(prizes) {
      this.prizes = prizes;
    },
    getRandomPrizePic() {
      const prizes = [
        `https://res.cloudinary.com/bingomatrix/image/upload/v1598971478/prizes/fauzan-saari-AmhdN68wjPc-unsplash_ttnxrg.jpg`,
      ];
      // const images = this.$cloudinary.url('v1598971478', {
      //   width: 100,
      //   crop: 'fit',
      // });
      // console.log('images,', images);

      return { url: prizes[0] };
    },
  },
  head() {
    return {
      title: 'Choose Game Conditions and Select Prizes',
    };
  },
};
</script>

<style scoped lang="scss">
.bg-color {
  background-color: #e0e6e9;
  min-height: calc(100vh - 250px);
}
.v-input--switch {
  flex: 0 0 320px;
}
</style>
