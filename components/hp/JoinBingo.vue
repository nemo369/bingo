<template>
  <v-form
    class="form d-flex flex-column"
    style="width: 480px"
    @submit.prevent="join"
  >
    <v-text-field
      v-model="pin"
      type="number"
      class="input mb-6 d-flex align-center rounded-lg"
      required
      :placeholder="placeholder"
      :loading="loading"
    />
    <button type="submit" class="btn rounded-lg" x-large>BINGO</button>
  </v-form>
</template>

<script>
export default {
  name: 'JoinBingo',
  data() {
    return {
      pin: '',
      placeholder: this.$t('enter pin code'),
      loading: false,
    };
  },
  methods: {
    join() {
      if (this.pin) {
        this.loading = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.from {
  width: 480px;
}
.input {
  flex: 0 0 100px;
  width: 100%;
  border: 1px solid $prim-color;
  font-size: 24px;
  padding: 0 10px;

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.v-input input {
  font-family: $heading-font-family;
}
.btn,
.v-btn {
  width: 100%;
  flex: 0 0 100px;
  background-color: $prim-color;
  color: $op-color;
  font-family: $heading-font-family;
  font-size: 3rem;
}
</style>
