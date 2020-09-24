<template>
  <v-dialog v-model="dialog" persistent max-width="350px">
    <v-card>
      <v-form id="login-form" ref="form" @submit.prevent="reset()">
        <v-card class="elevation-12">
          <v-toolbar color="#FFFFFF" flat>
            <v-toolbar-title>{{ $t('Reset Password') }}</v-toolbar-title>
            <v-spacer />
            <v-btn rounded color="#fff" elevation="0" @click="hideModal">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <hr class="ma-auto" style="max-width: 90%" />
          <v-card-text>
            <v-text-field
              v-model="password1"
              required
              name="login"
              :label="labels.password1"
              type="text"
              class="mb-4"
              :rules="[
                rules.required,
                rules.passwordLength,
                rules.passwordNumric,
              ]"
              @input="errMsg = ''"
            />
            <v-text-field
              v-model="password2"
              required
              name="login"
              :label="labels.password2"
              type="text"
              class="mb-4"
              :rules="[rules.required, rules.password2]"
              @input="errMsg = ''"
            />
          </v-card-text>
          <v-alert v-if="!!errMsg" color="error">
            <small>{{ errMsg }}</small>
          </v-alert>
          <v-alert v-if="!!successMsg" color="success">
            <small>{{ successMsg }}</small>
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
              {{ $t('Reset Email') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import UsersService from '~/services/users.service';
export default {
  name: 'PasswordReset',
  middleware: 'disconnect',
  data() {
    return {
      isLoading: false,
      dialog: !!this.$route.query.token,
      token: this.$route.query.token,
      uid: this.$route.query.uid,
      password1: '',
      password2: '',
      labels: {
        password1: this.$t('New Password'),
        password2: this.$t('Confirm Password'),
      },
      errMsg: '',
      successMsg: '',
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
        password2: (value) => {
          const isValid = value === this.password1;
          return isValid || 'Password must match';
        },
      },
    };
  },
  beforeRouteLeave(to, _, next) {
    if (to.name.includes('passwordreset')) {
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
    reset() {
      if (!this.isValid()) {
        return;
      }
      this.isLoading = true;
      this.errMsg = '';
      const data = {
        password1: this.password1,
        password2: this.password2,
        uid: this.uid,
        token: this.token,
      };
      UsersService.newPassword(data)
        .then((res) => {
          console.log(res);
          this.successMsg =
            'your password has been reset. You may go ahead and login now';
          setTimeout(() => {
            this.dialog = false;
          }, 5000);
        })
        .catch(() => {
          this.errMsg = 'Something isnt right';
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped></style>
