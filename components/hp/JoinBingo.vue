<template>
  <v-form class="join-form d-flex flex-column relative" @submit.prevent="join">
    <v-text-field
      v-model="pin"
      type="number"
      class="input mb-6 d-flex align-center rounded-lg"
      required
      :placeholder="placeholderPin"
      :loading="loading"
      @input="validatePin"
    />
    <v-text-field
      v-model="nickname"
      type="text"
      class="input mb-6 d-flex align-center rounded-lg"
      :placeholder="placeholderUser"
      :loading="loading"
      :counter="16"
    />
    <v-alert v-if="err" type="error">
      {{ err }}
    </v-alert>
    <loader v-if="isLoading" :is-loading="isLoading" class="loader" />

    <button type="submit" class="join-bingo-btn learn-more">BINGO</button>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex';
import { Ls, playerLocalStorge } from '~/app/utils/localStorage';
import Loader from '~/components/app/Loader.vue';

export default {
  name: 'JoinBingo',
  components: {
    Loader,
  },
  data() {
    return {
      pin: '',
      isNameNeeded: true,
      err: '',
      nickname: Ls.get(playerLocalStorge)?.name || '',
      placeholderPin: this.$t('Game Pin'),
      placeholderUser: this.$t('Player Name'),
      loading: false,
      maxLength: 4,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      socketMsgs: 'socket/getMsgs',
      socketErr: 'socket/getErr',
    }),
  },
  watch: {
    socketMsgs(newMsgs) {
      this.loading = false;
      this.err = '';
      if (
        newMsgs[newMsgs.length - 1].data &&
        newMsgs[newMsgs.length - 1].data.player_id
      ) {
        this.$store.dispatch(
          'player/setPlayer',
          newMsgs[newMsgs.length - 1].data
        );
        this.$router.push({
          path: this.localePath('/PlayBingo'),
          query: { pin: this.pin },
        });
        console.log(newMsgs[newMsgs.length - 1].data.player_id);
      }
    },
    socketErr() {
      this.err = 'This Pin is Invalid';
      this.isLoading = false;
    },
  },
  methods: {
    join() {
      if (this.pin.length === 4) {
        if (this.nickname.length > 16) {
          this.nickname = this.nickname.slice(0, 16);
        }
        const data = {
          message_type: 'add.player',
          firstMsg: 'User joined Game',
          game_id: this.pin,
          data: {
            game_id: this.pin,
            nickname: this.nickname,
          },
        };
        this.isLoading = true;
        this.wsInit(data);

        // this.$router.push(this.localePath({ name: 'Play' , query: { pin: this.pin } }));
      }
      if (this.pin.length !== this.maxLength) {
        this.err = 'This Pin is Invalid';
      }
    },
    wsInit(data) {
      this.$store.dispatch('socket/initSocket', data);
    },
    validatePin() {
      this.err = '';
      if (this.pin.length > this.maxLength) {
        setTimeout(() => {
          this.pin = this.pin.slice(0, this.maxLength);
        }, 0);
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
