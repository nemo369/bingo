<template>
  <section class="play relative">
    <v-alert v-if="err" type="error">
      {{ err }}
    </v-alert>
    <v-btn text class="text--secondery" @click="shout"
      ><h2>SHOUT FOR BINGO</h2></v-btn
    >
    <loader v-if="isLoading" :is-loading="isLoading" />

    <card v-if="card" :card="card" />
    <colors />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '~/components/app/Card.vue';
import Colors from '~/components/player/Colors.vue';
import Loader from '~/components/app/Loader.vue';
export default {
  name: 'Play',

  components: {
    Card,
    Colors,
    Loader,
  },
  data() {
    return {
      gameSocket: null,
      pin: this.$route.query.pin,
      card: null,
      err: '',
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters({
      cards: 'player/getCards',
    }),
  },
  mounted() {
    if (!this.pin || this.pin.length !== 4) {
      this.$router.push(this.localePath('/'));
      return;
    }
    // const gameId = this.pin;
    // this.gameSocket = new WebSocket(`${process.env.socketUrl}/ws/game/`);
    this.gameSocket = new WebSocket(
      `${process.env.socketUrl}/ws/game/${this.pin}`
    );
    this.gameSocket.onopen = (e) => {
      console.log(e);
      this.isLoading = false;
    };
    this.gameSocket.onclose = (e) => {
      console.err(`oh no`, e);
      this.isLoading = false;
    };

    this.gameSocket.addEventListener('error', () => {
      this.err = `No luck, Something wont wrong`;
      this.isLoading = false;
    });
  },
  beforeRouteLeave(to, _, next) {
    if (to.name?.includes('bingo')) {
      prompt('Are you sure you want to Exit game?');
    } else {
      next();
    }
  },
  methods: {
    shout() {
      console.error('BINGO!!!');
    },
  },
};
</script>

<style lang="scss" scoped></style>
