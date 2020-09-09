<template>
  <div class="tac d-flex flex-column align-center">
    <h1>
      {{ $t('welcome to') | startCase }} <br />
      <span style="opacity: 0">{{ $t('matrix bingo') | startCase }}</span>
      <logo class="logo" />
    </h1>
    <h3 style="max-width: 340px" class="my-16">
      {{ $t('To Join a game...') }}
      <span v-if="!isLogedIn">
        {{ $t('If you wish to create a new Matrix Bingo game') }}
        <nuxt-link :to="localePath(`/login`)">{{ $t('Sign In') }}</nuxt-link>
        /
        <nuxt-link :to="localePath(`/register`)">{{
          $t('register')
        }}</nuxt-link>
      </span>
    </h3>

    <join-bingo class="mb-16" />

    <hr class="hr" />
    <div class="d-none d-sm-flex">
      <landing-page />
    </div>
    <v-divider class="my-16" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import JoinBingo from '~/components/hp/JoinBingo.vue';
import LandingPage from '~/components/hp/LandingPage.vue';
import Logo from '~/components/app/Logo.vue';

export default {
  name: 'HomePage',
  components: {
    JoinBingo,
    LandingPage,
    Logo,
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      isLogedIn: 'user/isLogedIn',
    }),
  },
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
.logo {
  width: 290px;
  margin: -94px auto 0;
}
</style>
