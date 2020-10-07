<template>
  <div class="tac d-flex flex-column align-center">
    <h1>
      {{ $t('host picture bingo') | startCase }} <br />
      <span style="opacity: 0">{{ $t('matrix bingo') | startCase }}</span>
      <logo class="logo" />
    </h1>
    <!-- <h3 style="max-width: 340px" class="welcome-text my-1">
      {{ $t('To Join a game...') }}
      <span v-if="!isLogedIn">
        {{ $t('If you wish to create a new Matrix Bingo game') }}
        <nuxt-link :to="localePath(`/login`)">{{ $t('Sign In') }}</nuxt-link>
        /
        <nuxt-link :to="localePath(`/register`)">{{
          $t('register')
        }}</nuxt-link>
      </span>
    </h3> -->
    <nuxt-link
      :to="localePath(`/join`)"
      class="join-bingo-btn learn-more"
      @click="toglleDialog(true)"
    >
      JOIN BINGO
    </nuxt-link>

    <hr class="hr" />
    <!-- <div class="d-none d-sm-flex"> -->
    <div class="d-flex">
      <landing-page />
    </div>
    <v-divider class="my-16" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LandingPage from '~/components/hp/LandingPage.vue';
import Logo from '~/components/app/Logo.vue';

export default {
  name: 'HomePage',
  components: {
    LandingPage,
    Logo,
  },
  data: () => ({}),

  computed: {
    ...mapGetters({
      isLogedIn: 'user/isLogedIn',
    }),
  },

  head() {
    return {
      title: 'Join a matrix bingo game',
      bodyAttrs: {
        class: 'home-page',
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Join a matrix bingo game',
        },
      ],
    };
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
.join-bingo-btn.learn-more {
  margin: 0 0 10px;
  padding: 0 5px;
  font-size: 20px;
}
.join-bingo-btn.learn-more::before {
  opacity: 0.1;
}
@media #{$mobile} {
  .welcome-text {
    margin: -20px 0 1px !important;
  }
}
</style>
