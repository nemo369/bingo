<template>
  <v-card>
    <v-form id="login-form" ref="form" @submit.prevent="login()">
      <v-card class="elevation-12">
        <v-toolbar color="#FFFFFF" flat>
          <v-toolbar-title>{{ $t('Welcome Back ') }}</v-toolbar-title>
          <v-spacer />
          <v-btn color="#fff" elevation="0" @click="$emit('close-modal')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <hr class="ma-auto" style="max-width: 90%;" />
        <v-card-text>
          <v-text-field
            v-model="email"
            required
            name="login"
            :label="labels.email"
            type="text"
            class="mb-4"
            :rules="[rules.required, rules.email]"
          />
          <v-text-field
            v-model="password"
            name="password"
            :label="labels.password"
            type="password"
            required
            class="mb-4"
            :rules="[rules.required, rules.passwordLength]"
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
            @click.prevent="$emit('forget-password')"
          >
            {{ $t('Forget Password') }}
          </v-btn>
        </div>
      </v-card>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      isLoading: false,
      errMsg: '',
      password: '',
      email: '',
      labels: {
        email: this.$t('email'),
        password: this.$t('password'),
      },
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
      },
    };
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
          this.$router.push(this.localePath({ name: '/' }));
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
    isValid() {
      const isFormValid = this.$refs.form.validate();
      return isFormValid;
    },
  },
};
</script>

<style></style>
