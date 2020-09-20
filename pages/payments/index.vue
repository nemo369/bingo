<template>
  <div>
    <h3>Loading...</h3>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$route.path === '/payments') {
      this.$router.push(this.localePath({ name: 'payments-deposits' }));
    }
  },
};
</script>
