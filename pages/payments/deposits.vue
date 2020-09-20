<template>
  <section>
    <h1>amount:</h1>
    <form action="">
      <input v-model="amount" type="number" />
      <button>Add Fund</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Deposits',
  data() {
    return {
      amount: '',
    };
  },
};
</script>

<style></style>
