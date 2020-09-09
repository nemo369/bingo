<template>
  <v-dialog v-model="dialog" persistent max-width="350px">
    <v-card>
      <v-form id="register" ref="form" @submit.prevent="register()">
        <v-card class="elevation-12">
          <v-toolbar color="#FFFFFF" flat>
            <v-toolbar-title>{{
              $t('Register to Bingo Matrix')
            }}</v-toolbar-title>
            <v-spacer />
            <v-btn color="#fff" elevation="0" @click="hideModal()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <hr class="ma-auto" style="max-width: 90%" />
          <v-card-text>
            <v-text-field
              v-model="name"
              name="login"
              :label="label.name"
              type="text"
              required
              class="mb-4"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="email"
              name="login"
              :label="label.email"
              type="email"
              class="mb-4"
              required
              :rules="[rules.required, rules.email]"
            />
            <v-text-field
              v-model="password"
              name="login"
              :label="label.password"
              type="password"
              class="mb-4"
              required
              :rules="[
                rules.required,
                rules.passwordLength,
                rules.passwordNumric,
              ]"
            />
          </v-card-text>
          <v-alert v-if="!!errorMsg" color="error">
            <small>{{ errorMsg }}</small>
          </v-alert>
          <v-card-actions class="pa-4">
            <v-btn
              type="submit"
              form="register"
              class="white--text ok-btn col-1-1"
              large
              color="primary"
              :loading="isLoading"
            >
              {{ $t('Sign Up') }}
            </v-btn>
          </v-card-actions>
          <div class="tac">
            <v-btn
              class="mt-6 mb-1"
              type="button"
              text
              @click.prevent="navigateToLoginPage()"
            >
              {{ $t('Already a user?') }}
              <strong>&nbsp;{{ $t('Login') }}</strong>
            </v-btn>
          </div>
        </v-card>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Register',
  middleware: 'disconnect',
  data() {
    return {
      isLoading: false,
      dialog: true,
      name: '',
      email: '',
      password: '',
      label: {
        name: this.$t('name'),
        email: this.$t('email'),
        password: this.$t('password'),
      },
      errorMsg: '',
      from: null,
      rules: {
        required: (value) => !!value || 'required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || `Not a Valid E-mail`;
        },
        passwordLength: (value) => {
          const isValid = !!value && value.length >= 6;
          return isValid || 'at least 6 chars';
        },
        passwordNumric: (value) => {
          const isValid = !!value && !/^\d+$/.test(value);
          return isValid || 'Password must have digits and charcthers';
        },
      },
    };
  },
  beforeRouteLeave(to, from, next) {
    this.from = from;
    if (to.name?.includes('register')) {
      this.displayModal(to);
    } else {
      next();
    }
  },
  methods: {
    register() {
      if (!this.isValid()) {
        return;
      }
      this.isLoading = true;
      this.errorMsg = '';
      this.$store
        .dispatch('user/signUp', this.getSignUpObj())
        .then(() => {
          this.$router.push('/');
        })
        .catch(() => {
          this.errorMsg = 'Server Error';
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getSignUpObj() {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
      };
    },
    navigateToLoginPage() {
      this.dialog = false;
      this.$router.push('/login');
    },
    displayModal(route) {
      this.dialog = true;
      window.history.pushState({}, null, route.path);
    },
    hideModal() {
      this.dialog = false;
      window.history.pushState({}, null, this.$route.path);

      if (!this.from) {
        this.$router.push('/');
      } else {
        this.$router.go(this.from);
      }
    },
    isValid() {
      const isFormValid = this.$refs.form.validate();
      return isFormValid;
    },
  },
};
</script>

<style lang="scss" scoped></style>
