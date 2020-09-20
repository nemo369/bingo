<template>
  <section>
    <h1>amount:</h1>
    <h2>${{ amount }}</h2>
  </section>
</template>

<script>
export default {
  name: 'ThankYou',
  data() {
    return {
      amount: this.$route.query.amount,
    };
  },
};
</script>

<style></style>
