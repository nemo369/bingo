<template>
  <v-card class="pb-16 pt-5 px-16 my-2 mx-auto">
    <h1 class="text-h4 mb-4 tac">Payment Type</h1>
    <h2 class="text--secondary tac my-2 text-h4 text-caption">
      Select Your Payment Method
    </h2>
    <div class="d-flex justify-space-around">
      <v-btn class="px-6" @click="setMethod('paypal')">Pay Pal</v-btn>
      <v-btn class="px-6" @click="setMethod('stripe')">Credit Card</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'CheckoutType',
  data() {
    return {
      method: null,
    };
  },

  methods: {
    setMethod(value) {
      this.loading = true;
      const data = {
        method: value,
      };
      this.$emit('goTo', data);
    },
  },
};
</script>

<style scoped lang="scss">
.v-card {
  max-width: 600px;
}
</style>
