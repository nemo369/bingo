<template>
  <div class="tac d-flex flex-column align-center">
    <h1>
      {{ $t('welcome to') | startCase }} <br />{{
        $t('matrix bingo') | startCase
      }}
    </h1>
    <h3 style="max-width: 340px" class="my-16">
      {{ $t('To Join a game...') }}
      <nuxt-link :to="localePath(`/login`)">{{ $t('Sign In') }}</nuxt-link>
      /
      <nuxt-link :to="localePath(`/register`)">{{ $t('Register') }}</nuxt-link>
    </h3>

    <join-bingo class="mb-16" />

    <hr class="hr" />
    <landing-page />
    <v-divider class="my-16" />
  </div>
</template>

<script lang="ts">
import JoinBingo from '~/components/hp/JoinBingo.vue';
import LandingPage from '~/components/hp/LandingPage.vue';
export default {
  name: 'HomePage',
  components: {
    JoinBingo,
    LandingPage,
  },
  data: () => ({}),
  head: {
    bodyAttrs: {
      class: 'home-page',
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  &:hover {
    background-color: $op-color;
    color: $prim-color;
  }
}
</style>
