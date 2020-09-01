<template>
  <div>
    <h3 class="my-2 h3">
      {{ $t('Choose the amount of') }} <b>{{ $t('prizes') }}</b>
      {{ $t('in a game and winning conditions') }}
    </h3>

    <section
      v-if="grid"
      class="wrapper d-flex justify-space-between mx-auto flex-wrap"
    >
      <v-card
        v-for="(n, i) in prizes.length"
        :key="i"
        class="rounded pa-2 mx-2 d-flex flex-column mb-6"
        @click="$emit('button-selected', prizes.splice(0, n))"
      >
        <h4 class="h2">{{ n }} prize{{ n > 1 ? 's' : '' }}</h4>
        <div v-for="(_, index) in n" :key="index" class="mb-4">
          <Dumi-Board :condition="prizes[index]" />
        </div>
        <v-btn
          class="mt-auto"
          @click="$emit('button-selected', prizes.splice(0, n))"
        >
          {{ $t('play now') | startCase }}
        </v-btn>
      </v-card>
    </section>
  </div>
</template>

<script>
import DumiBoard from './dumiBoard';
import { conditions } from '~/app/const/conditions.ts';
export default {
  name: 'Conditions',
  components: {
    DumiBoard,
  },
  props: {
    grid: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    conditions: [...conditions],
  }),
  computed: {
    prizes() {
      return this.conditions?.filter(
        (condition) =>
          `${condition.row}${condition.column}` ===
          `${this.grid.row}${this.grid.column}`
      );
    },
  },
};
</script>

<style scoped lang="scss">
$l-bg-color: #e0e6e9;
$l-primary-color: #a7a7a7;
$l-primary-color-dk: #a3a0ab;
$l-secondary-color: #b73239;
.h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  border-bottom: 1px solid rgb(187, 187, 187);
  background: $white;
  font-size: rem(20);
}
.wrapper {
  max-width: 960px;
  background-color: $l-bg-color;
}
.v-card {
  flex: 3;
  transition: box-shadow 0.5s ease;
  &:hover {
    box-shadow: 8px 8px 16px 0 rgba(214, 0, 0, 0.15),
      -8px -8px 12px 0 rgba(148, 148, 148, 0.5);
  }
}
.h3 {
  font-weight: 300;
}
</style>
