<template>
  <v-dialog v-model="dialog" persistent max-width="350px">
    <v-card>
      <v-form id="login-form" ref="form" @submit.prevent="login()">
        <v-card class="elevation-12">
          <v-toolbar color="#FFFFFF" flat>
            <v-toolbar-title>{{ $t('Welcome Back ') }}</v-toolbar-title>
            <v-spacer />
            <v-btn color="#fff" elevation="0" @click="hideModal()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <hr class="ma-auto" style="max-width: 90%;" />
          <v-card-text>
            <v-text-field
              v-model="email"
              name="login"
              :label="labels.email"
              type="text"
              class="mb-4"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="password"
              name="password"
              :label="labels.password"
              type="password"
              class="mb-4"
              :rules="[rules.required]"
            />
          </v-card-text>
          <v-alert v-if="!!errMsg" color="error">
            <small>{{ errMsg }}</small>
          </v-alert>
          <v-card-actions class="pa-4">
            <v-btn
              type="submit"
              form="login-form"
              color="#4D4D4D"
              class="white--text ok-btn col-1-1"
              large
              :loading="isLoading"
            >
              {{ $t('login') }}
            </v-btn>
          </v-card-actions>
          <div class="tac">
            <v-btn
              class="mt-6 mb-1"
              type="button"
              text
              @click.prevent="navigateToRegisterPage()"
            >
              {{ $t("Didn't Register Yet?") }}
              <strong>&nbsp; {{ $t('Register') }}</strong>
            </v-btn>
            <v-btn
              class="mt-1 mb-6"
              type="button"
              text
              @click.prevent="passwordReset()"
            >
              {{ $t('Forget Password') }}
            </v-btn>
          </div>
        </v-card>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      dialog: true,
      errMsg: '',
      password: '',
      email: '',
      labels: {
        email: this.$t('email'),
        password: this.$t('password'),
      },
      rules: {
        required: (value) => !!value || 'required',
      },
    };
  },
  mounted() {
    console.log(this.$route);
  },

  beforeRouteLeave(to, _, next) {
    if (to.name.includes('login')) {
      this.displayModal(to);
    } else {
      next();
    }
  },
  methods: {
    login() {
      if (!this.isValid()) {
        return;
      }
      this.isLoading = true;
      this.errMsg = '';
      this.$store
        .dispatch('user/logIn', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push('/');
        })
        .catch(() => {
          this.errMsg = 'Server Error';
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    navigateToRegisterPage() {
      this.hideModal();
      this.$router.push('/register');
    },
    passwordReset() {
      this.hideModal();
      this.$router.push('/forget_password');
    },
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
};
</script>

<style scoped></style>
