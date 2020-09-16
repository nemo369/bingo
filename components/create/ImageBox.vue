<template>
  <div class="box pa-2 relative" elevation="2">
    <v-badge color="green" :content="index" />
    <h4>{{ img.title }} &nbsp;</h4>
    <cld-image
      :public-id="img.public_id"
      width="150"
      height="150"
      crop="fit"
      fetch-format="auto"
      quality="auto"
      loading="lazy"
      class="ma-auto"
    ></cld-image>
    <v-text-field
      v-model="title"
      label="Name"
      maxlength="12"
      @input="$emit('update:title', { title, assetId: img.asset_id })"
    ></v-text-field>
    <v-btn
      class="close"
      fab
      dark
      small
      color="pink"
      @click="$emit('delete', img.asset_id)"
    >
      <v-icon dark>mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ImageBox',
  props: {
    img: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    title: '',
  }),
};
</script>

<style lang="scss" scoped>
.box {
  background-color: $sec-color;
  border-radius: 8px;
  height: 250px;
}
.close {
  position: absolute;

  top: -10px;
  right: -10px;
}
</style>
