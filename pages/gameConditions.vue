<template>
  <section>
    <h1 class="tac">winning conditions</h1>
    <div>{{ album }}</div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GameCondititons',
  computed: {
    ...mapGetters({
      album: 'album/getAlbum',
    }),
  },
};
</script>

<style></style>
