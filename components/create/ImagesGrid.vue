<template>
  <section>
    <h2 class="tac">{{ $t('total') }}:{{ images.length }}</h2>
    <div class="images-grid mx-auto my-10">
      <image-box
        v-for="(img, i) in images"
        :key="img.asset_id"
        :index="i + 1"
        :img="img"
        @update:title="edit"
        @delete="onDelete"
      ></image-box>
    </div>
  </section>
</template>

<script>
import ImageBox from '~/components/create/ImageBox.vue';
export default {
  name: 'ImagesGrid',
  components: {
    ImageBox,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    edit({ title, assetId }) {
      this.$emit('title', { title, assetId });
    },
    onDelete(assetId) {
      this.$emit('delete', assetId);
    },
  },
};
</script>

<style lang="scss" scoped></style>
