<template>
  <v-card class="pa-16 d-flex align-center justify-center">
    <v-form
      class="join-form d-flex flex-column relative"
      @submit.prevent="join"
    >
      <!-- <v-text-field
        v-model="pin"
        type="number"
        class="input mb-6 d-flex align-center rounded-lg"
        required
        :placeholder="placeholderPin"
        :loading="loading"
        @input="validatePin"
      /> -->
      <div class="d-flex align-center justify-space-between">
        <div
          v-for="i in 4"
          :key="i"
          class="pin d-flex align-center justify-center"
        >
          <span v-if="i - 1" class="mr-6 dash">-</span>
          <input
            ref="pin"
            v-model="pin[i - 1]"
            :data-key="i - 1"
            class="input mb-6 d-flex align-center rounded-lg full tac"
            type="number"
            maxLength="1"
            size="1"
            min="0"
            max="9"
            pattern="[0-9]{1}"
            @input="validatePin(i - 1)"
          />
        </div>
      </div>

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

      <button
        type="submit"
        class="join-bingo-btn learn-more"
        :disabled="isLoading"
      >
        BINGO
      </button>
    </v-form>
  </v-card>
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
      pin: [],
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
        newMsgs.length &&
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
    join(e) {
      e.preventDefault();
      if (this.isLoading) {
        return;
      }
      if (this.pin.length === 4) {
        if (this.nickname.length > 16) {
          this.nickname = this.nickname.slice(0, 16);
        }
        const pin = +this.pin.join('');
        const data = {
          message_type: 'add.player',
          firstMsg: 'User joined Game',
          game_id: pin,
          data: {
            game_id: pin,
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
    validatePin(index) {
      this.err = '';
      if (!this.pin[index]) {
        return;
      }
      const ref = this.$refs.pin[index + 1];
      if (index < 4 && ref) {
        ref.focus();
      }
      this.pin = this.pin.map((pin) => (pin ? pin[0] : ''));

      // if(index === 3){

      // }
    },
    toglleDialog(bol) {
      this.isDialog = bol;
    },
  },
};
</script>

<style lang="scss" scoped>
.from {
  width: 480px;
}
.input {
  // flex: 0 0 100px;
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
.pin {
  height: 75px;
}
.dash {
  font-size: 0px;
  width: 10px;
  border-top: 2px solid $black;
}
@media #{$mobile} {
  .form {
    width: 99%;
  }
}
</style>
