<template>
  <section class="tac d-flex flex-column align-center justify-center">
    <h1 class="mb-4">404 - No Bingo Here</h1>
    <h3 style="max-width: 340px" class="welcome-text mb-4">
      {{ $t('To Join a game...') }}
      <span>
        {{ $t('If you wish to create a new Matrix Bingo game') }}
        <nuxt-link :to="localePath(`/login`)">{{ $t('Sign In') }}</nuxt-link>
        /
        <nuxt-link :to="localePath(`/register`)">{{
          $t('register')
        }}</nuxt-link>
      </span>
    </h3>
    <h2>
      <nuxt-link :to="localePath(`/`)">{{
        $t('To Join a matrix bingo game enter game pin here')
      }}</nuxt-link>
    </h2>
  </section>
</template>

<script>
export default {
  name: 'Page404',
  data: () => ({}),

  head() {
    return {
      title: 'This Page doenst exist',
    };
  },
};
</script>

<style lang="scss" scoped></style>
