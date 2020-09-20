<template>
  <v-card class="pb-16 pt-5 px-16 my-2 mx-auto">
    <h1 class="text-h4 mb-4 tac">Add Funds</h1>
    <form @submit.prevent="addfund">
      <legend class="d-flex mb-6">
        <span class="text--secondary">Deposit amount:</span>
        <v-select
          v-model="currency"
          class="ml-2"
          :items="currencys"
          item-text="name"
          item-value="name"
          label="Currency"
          @input="setSelected"
        ></v-select>
      </legend>
      <div class="d-flex align-center">
        <v-btn
          v-for="amount in amounts"
          :key="amount"
          class="mr-4 px-10"
          :class="{ primary: amount === amountToAdd }"
          @click="amountToAdd = amount"
          >{{ currency.symbol }}{{ amount }}</v-btn
        >
        <v-text-field v-model="amountToAdd" type="number" />
      </div>
      <small class="d-block tac grey--text mt-2">
        Total Balance: {{ currency.symbol }}{{ amountToAdd }}
      </small>
      <v-alert v-if="err">{{ err }}</v-alert>
      <v-btn
        :loading="loading"
        type="submit"
        class="d-block mt-6 ml-auto col-1-1"
        x-large
        color="primary"
        >Add Fund</v-btn
      >
    </form>
  </v-card>
</template>

<script>
import PaymentService from '~/services/payment.service.ts';
export default {
  name: 'Deposit',
  data() {
    return {
      loading: false,
      err: null,
      currencys: [
        { name: 'dolar', symbol: '$' },
        { name: 'shekel', symbol: '₪' },
        { name: 'euro', symbol: '€' },
      ],
      currency: null,
      amountToAdd: +this.$route.query.amount || 25,
      amounts: [5, 10, 25],
    };
  },
  created() {
    this.currency = this.currencys[0];
  },
  methods: {
    setSelected(value) {
      this.currency = this.currencys.find((c) => c.name === value);
    },
    addfund() {
      this.loading = true;
      const data = {
        amount: +this.amountToAdd,
        currency: this.currency.name,
      };
      PaymentService.addDeposits(data)
        .then(() => {
          this.$emit('setDeposit', data);
        })
        .catch((err) => {
          this.err = err;
        })
        .finally(() => {
          this.loading = false;
        });
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
