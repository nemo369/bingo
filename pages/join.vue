<template>
  <v-dialog v-model="isDialog" persistent>
    <join-bingo class="mb-16" />
  </v-dialog>
</template>

<script>
import JoinBingo from '~/components/hp/JoinBingo.vue';
export default {
  name: 'Join',
  components: {
    JoinBingo,
  },
  data() {
    return {
      isDialog: true,
    };
  },
  beforeRouteLeave(to, _, next) {
    if (to.name.includes('join')) {
      this.displayModal(to);
    } else {
      next();
    }
  },
  methods: {
    displayModal(route) {
      this.isDialog = true;
      window.history.pushState({}, null, route.path);
    },
    hideModal() {
      this.isDialog = false;
      if (window.history.length > 2) {
        this.$router.push('/');
      } else {
        this.$router.go(-1);
      }
    },
  },
  head() {
    return {
      title: 'Enter Pin To Join a Game',
    };
  },
};
</script>

<style></style>
