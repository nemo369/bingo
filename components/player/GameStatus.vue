<template>
  <div v-if="player">
    <v-dialog :value="!player.approved">
      <v-card class="tac py-6">
        <h2>{{ $t('Watiting For Host') }}</h2>
        <h3>{{ player.nickname }}</h3>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GameStatus',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      player: 'player/getPlayer',
    }),
  },
};
</script>

<style lang="scss" scoped>
.color {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
</style>
