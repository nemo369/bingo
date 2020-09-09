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
  middleware: 'hasAlbum',
  components: {
    Prizes,
    Conditions,
  },
  data() {
    return {
      e1: 1,
      conditions: [],
      prizes: [],
    };
  },

  computed: {
    ...mapGetters({
      album: 'album/getAlbum',
    }),
  },
  methods: {
    chosedAlbum([...conditions]) {
      console.log('images');

      this.conditions = conditions;
      this.setPrizes(conditions);
      // add pictue to conditions
      this.e1 = 2;
    },
    startGame([...conditions], [...prizes]) {
      this.$store
        .dispatch('game/trySetGame', { conditions, prizes })
        .then(() => {
          this.$router.push(this.localePath({ name: '/bingo' }));
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
};
</script>

<style scoped>
.bg-color {
  background-color: #e0e6e9;
  min-height: calc(100vh - 250px);
}
</style>
