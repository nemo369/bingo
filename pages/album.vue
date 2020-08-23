<template>
  <section class="">
    <aside class="">
      <album-menu />
    </aside>
    <article class="full">
      <nuxt-child />
    </article>
  </section>
</template>

<script>
import AlbumMenu from '~/components/album/Menu.vue';

export default {
  name: 'Album',
  components: {
    AlbumMenu,
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped></style>
