<template>
  <div v-if="$auth.loggedIn" class="user mx-1">
    <button text @click="snackbar = true">
      <v-avatar color="secondary" class="white--text text-capitalize">
        {{ userInitial }}
      </v-avatar>
    </button>
    <v-snackbar v-model="snackbar">
      <template v-slot:action="{ attrs }">
        <v-btn text class="mr-6" @click="logOut"
          >Are you sure you want to Log Out?</v-btn
        >
        <v-btn color="secondary" text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      snackbar: false,
    };
  },
  userInitial() {
    if (this.$auth.user && this.$auth.user.username) {
      const [firstName, lastName] = this.$auth.user.username.split(' ');
      return firstName[0] + `${lastName ? `.${lastName[0]}` : ``}`;
    }
    return '';
  },
  methods: {
    logOut() {
      this.snackbar = false;
      this.$auth.logout();
      // this.$store.dispatch('user/logOut');
    },
  },
};
</script>

<style scoped lang="scss">
.user {
  border-radius: 50%;
}
</style>
