<template>
  <div class="box pa-2 relative" elevation="2">
    <v-badge color="green" :content="index" />
    <v-img
      :src="img.localUrl"
      :aspect-ratio="1"
      width="150"
      on-load
      class="ma-auto"
      @load="onLoad"
    ></v-img>
    <v-text-field
      v-model="name"
      label="Name"
      maxlength="12"
      @change="$emit('update:title', { name, img })"
    ></v-text-field>
    <v-btn
      class="close"
      fab
      dark
      small
      color="pink"
      @click="$emit('delete', img.localUrl)"
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
    name,
  }),
  methods: {
    onLoad() {
      URL.revokeObjectURL(this.imglocalUrl);
    },
  },
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
