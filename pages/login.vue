<template>
  <v-dialog v-model="dialog" persistent max-width="350px">
    <login-form
      v-if="!isForgetPassword"
      @forget-password="isForgetPassword = true"
      @close-modal="hideModal"
    />
    <forget-password v-if="isForgetPassword" @close-modal="hideModal" />
  </v-dialog>
</template>

<script>
import LoginForm from '~/components/header/LoginForm.vue';
import ForgetPassword from '~/components/header/ForgetPassword.vue';
export default {
  name: 'Login',
  middleware: 'guest',
  components: {
    LoginForm,
    ForgetPassword,
  },
  data() {
    return {
      dialog: true,
      isForgetPassword: false,
    };
  },
  beforeRouteLeave(to, _, next) {
    if (to.name.includes('login')) {
      this.displayModal(to);
    } else {
      next();
    }
  },
  methods: {
    displayModal(route) {
      this.dialog = true;
      window.history.pushState({}, null, route.path);
    },
    hideModal() {
      this.dialog = false;
      if (window.history.length > 2) {
        this.$router.push('/');
      } else {
        this.$router.go(-1);
      }
    },
    isValid() {
      const isFormValid = this.$refs.form.validate();
      return isFormValid;
    },
  },

  head() {
    return {
      title: 'Log in to Matrix Bingo',
    };
  },
};
</script>

<style scoped></style>
