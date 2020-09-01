<template>
  <div v-if="isLogedIn" class="user mx-1">
    <button text @click="logOut">
      <v-avatar color="red">
        {{ userInitial }}
      </v-avatar>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserProfile',
  computed: {
    ...mapGetters({
      isLogedIn: 'user/isLogedIn',
      user: 'user/getUser',
    }),
    userInitial() {
      if (this.user) {
        const [firstName, lastName] = this.user.name.split(' ');
        return firstName[0] + `${lastName ? `.${lastName[0]}` : ``}`;
      }
      return '';
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('user/logOut');
    },
  },
};
</script>

<style scoped lang="scss">
.user {
  border-radius: 50%;
}
</style>
