<template>
  <section class="play relative">
    <v-btn text class="text--secondery" @click="shout"
      ><h2>SHOUT FOR BINGO</h2></v-btn
    >
    <card v-if="card" :card="card" />
    <colors />
  </section>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import Card from '~/components/app/Card.vue';
import Colors from '~/components/player/Colors.vue';

export default {
  name: 'Play',

  components: {
    Card,
    Colors,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cards: 'game/getCard',
    }),
  },
  mounted() {},
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
