<template>
  <section>
    <deposit v-if="isDeposit" @setDeposit="setDeposit" />
    <checkout-type v-if="isCheckoutType" @goTo="goTo" />
  </section>
</template>

<script>
import Deposit from '~/components/payments/Deposit.vue';
import CheckoutType from '~/components/payments/CheckoutType.vue';
export default {
  name: 'Deposits',
  middleware: 'auth',
  components: {
    Deposit,
    CheckoutType,
  },
  data() {
    return {
      amount: 25,
      isDeposit: true,
      isCheckoutType: false,
    };
  },
  methods: {
    setDeposit(amount) {
      this.amount = amount;
      this.isDeposit = false;
      this.isCheckoutType = true;
    },
    goTo(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped lang="scss">
.v-card {
  max-width: 600px;
}
</style>
