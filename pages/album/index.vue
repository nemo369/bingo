<template>
  <div>
    <h3>Loading...</h3>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$route.path === '/album') {
      this.$router.push(this.localePath({ name: 'album-public_bingos' }));
    }
  },
};
</script>
