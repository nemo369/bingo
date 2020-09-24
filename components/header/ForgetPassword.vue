<template>
  <v-card>
    <v-form id="login-form" ref="form" @submit.prevent="forget()">
      <v-card class="elevation-12">
        <v-toolbar color="#FFFFFF" flat>
          <v-toolbar-title>{{ $t('Forget Password') }}</v-toolbar-title>
          <v-spacer />
          <v-btn
            rounded
            color="#fff"
            elevation="0"
            @click="$emit('close-modal')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <hr class="ma-auto" style="max-width: 90%" />
        <v-card-text>
          <v-text-field
            v-model="email"
            required
            name="login"
            :label="labels.email"
            type="text"
            class="mb-4"
            :rules="[rules.required, rules.email]"
            @input="errMsg = ''"
          />
        </v-card-text>
        <v-alert v-if="!!errMsg" color="error">
          <small>{{ errMsg }}</small>
        </v-alert>
        <v-alert v-if="!!successMsg" color="success" class="px-2">
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
            {{ $t('Send Reset Email') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-card>
</template>

<script>
import UserService from '~/services/users.service';
export default {
  name: 'ForgetPassword',
  data() {
    return {
      isLoading: false,
      errMsg: '',
      successMsg: '',
      email: '',
      labels: {
        email: this.$t('email'),
      },
      rules: {
        required: (value) => !!value || 'required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || `Not a Valid E-mail`;
        },
      },
    };
  },
  methods: {
    forget() {
      this.errMsg = '';
      this.isLoading = true;
      UserService.resetPassword(this.email)
        .then((res) => {
          console.log(res);
          this.successMsg = 'We sent you an email to reset your password';
          setTimeout(() => {
            this.$emit('close-modal');
          }, 5000);
        })
        .catch(() => {
          this.errMsg = 'Something isnt right';
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style></style>
