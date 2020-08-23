<template>
  <div class="tac">
    <h1>{{ $t('welcome') }}</h1>
    <h3>{{ $t('To Join a game...') }}</h3>

    <v-btn>
      <nuxt-link to="album"> {{ $t('select or build an album') }} </nuxt-link>
    </v-btn>
  </div>
</template>

<script lang="ts">
export default {};
</script>
