<template>
  <v-dialog v-model="dialog" persistent max-width="350px">
    <v-card>
      <v-form id="login-form" ref="form" @submit.prevent="reset()">
        <v-card class="elevation-12">
          <v-toolbar color="#FFFFFF" flat>
            <v-toolbar-title>{{ $t('Reset Your Password') }}</v-toolbar-title>
            <v-spacer />
            <v-btn color="#fff" elevation="0" @click="hideModal">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <hr class="ma-auto" style="max-width: 90%" />
          <v-card-text>
            <v-text-field
              v-model="password"
              required
              name="password"
              :label="labels.password"
              type="password"
              class="mb-4"
              :rules="[
                rules.required,
                rules.passwordLength,
                rules.passwordNumric,
              ]"
            />

            <v-text-field
              v-model="password2"
              required
              name="password2"
              :label="labels.password2"
              type="password"
              class="mb-4"
              :rules="[rules.required, rules.passwordMatch]"
            />
          </v-card-text>
          <v-alert v-if="!!errMsg" color="error" class="mx-2">
            <small class="white--text">{{ errMsg }}</small>
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
              {{ $t('reset password') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import LoginForm from '~/components/header/LoginForm.vue';
import ForgetPassword from '~/components/header/ForgetPassword.vue';
import { convertErr } from '~/app/utils/helpers';
export default {
  name: 'PasswordReset',
  middleware: 'disconnect',
  components: {},
  data() {
    return {
      dialog: true,
      password: '',
      password2: '',
      isLoading: false,
      token: this.$route.query.token,
      email: this.$route.query.email,
      errMsg: '',
      labels: {
        password: this.$t('password'),
        password2: this.$t('password again'),
      },
      rules: {
        required: (value) => !!value || 'required',
        passwordLength: (value) => {
          const isValid = !!value && value.length >= 6;
          return isValid || 'at least 6 chars';
        },
        passwordNumric: (value) => {
          const isValid = !!value && !/^\d+$/.test(value);
          return isValid || 'Password must have digits and charcthers';
        },
        passwordMatch: (value) => {
          const isValid = value === this.password;
          return isValid || 'Password must much';
        },
      },
    };
  },
  beforeRouteLeave(to, _, next) {
    if (to.name.includes('Password_Reset')) {
      this.displayModal(to);
    } else {
      next();
    }
  },
  methods: {
    reset() {
      this.isLoading = true;
      this.errMsg = '';
      this.$store
        .dispatch('user/resetPassword', {
          password: this.password2,
          token: this.token,
          email: this.email,
        })
        .then(() => {
          this.$router.push(this.localePath({ name: '/' }));
        })
        .catch((err) => {
          const obj = convertErr(err);
          if (obj.data.status === 400) {
            this.errMsg = 'Unable to login with given credential';
          } else {
            this.errMsg = 'Server Error';
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
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
