<template>
  <ul class="colors d-flex justify-end">
    <li v-for="(color, i) in colors" :key="i">
      <button
        :style="{ backgroundColor: color.bg }"
        class="color ml-1"
        @click="setColor(color)"
      ></button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Colors',
  data() {
    return {
      colors: [
        {
          prim: 'red',
          sec: 'blue',
          bg: 'red',
        },
        {
          prim: 'blue',
          sec: 'yellow',
          bg: 'blue',
        },
      ],
    };
  },
  methods: {
    setColor(color) {
      console.log(color);
      this.$store.dispatch('player/setColor', color);
    },
  },
};
</script>

<style lang="scss" scoped>
.color {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
</style>
