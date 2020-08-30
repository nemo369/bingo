<template>
  <section>
    <h2 class="tac">{{ $t('total') }}:{{ images.length }}</h2>
    <div class="images-grid mx-auto my-10">
      <image-box
        v-for="(img, i) in images"
        :key="i"
        :index="(i+1)"
        :img="img"
        @update:title="edit"
        @delete="onDelete"
      ></image-box>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ImagesGrid',
  props: {
    images: {
      type: Array,
      default: [],
    },
  },
  methods: {
    edit({ name, img }) {
      this.$emit('title', name, img.localUrl);
    },
    onDelete(url) {
      this.$emit('delete', url);
    },
  },
};
</script>

<style lang="scss" scoped></style>
