<template>
  <v-form class="join-form d-flex flex-column" @submit.prevent="join">
    <v-alert v-if="!!err" color="error">
      <small class="white--text">{{ err }}</small>
    </v-alert>
    <v-text-field
      v-if="!isNameNeeded"
      v-model="pin"
      type="number"
      class="input mb-6 d-flex align-center rounded-lg"
      required
      :placeholder="placeholderPin"
      :loading="loading"
    />
    <div v-if="isNameNeeded" class="tac">
      <h3 class="h2">Enter Player Name:</h3>
      <v-text-field
        v-model="user"
        type="text"
        class="input mb-6 d-flex align-center rounded-lg"
        :placeholder="placeholderUser"
        :loading="loading"
      />
    </div>
    <button type="submit" class="btn rounded-lg" x-large>BINGO</button>
  </v-form>
</template>

<script>
import { Ls, playerLocalStorge } from '~/app/utils/localStorage';
export default {
  name: 'JoinBingo',
  data() {
    return {
      pin: '',
      isNameNeeded: false,
      err: '',
      user: Ls.get(playerLocalStorge)?.name || '',
      placeholderPin: this.$t('Game Pin'),
      placeholderUser: this.$t('Player Name'),
      loading: false,
    };
  },
  methods: {
    join() {
      if (this.pin) {
        this.loading = true;
        this.$store
          .dispatch('game/joinGame')
          .then((joinData) => {
            this.loading = false;

            this.isNameNeeded = true;
            console.log(joinData);
          })
          .catch(() => {
            this.loading = false;
            this.isNameNeeded = true;

            this.err = 'Oh No, Something wont Wrong...';
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.from {
  width: 480px;
}
.input {
  flex: 0 0 100px;
  width: 100%;
  border: 1px solid $prim-color;
  font-size: 24px;
  padding: 0 10px;

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.v-input input {
  font-family: $heading-font-family;
}
.btn,
.v-btn {
  width: 100%;
  flex: 0 0 100px;
  background-color: $prim-color;
  color: $op-color;
  font-family: $heading-font-family;
  font-size: 3rem;
}
@media #{$mobile} {
  .form {
    width: 99%;
  }
}
</style>
