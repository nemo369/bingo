<template>
  <div class="bg-white pa-6 d-flex flex-column">
    <v-form v-if="!card" class="full" @submit.prevent="validteCard">
      <div class="d-flex">
        <legend>Enter Card Numer</legend>
        <v-spacer />
        <v-btn text type="button" @click="continueGame">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-text-field
        v-model="cardId"
        type="number"
        :placeholder="$t('Eg 46463')"
      ></v-text-field>
      <div class="d-flex">
        <v-btn
          type="submit"
          color="primary"
          class="mx-auto"
          :disabled="!cardId"
          >{{ $t('validate') }}</v-btn
        >
      </div>
    </v-form>
    <div v-if="card" class="full d-flex justify-space-between">
      <card-cmp :card="card" class="half" />
      <div>
        <v-btn rounded @click="checkAnother"> Check Another Card</v-btn>
        <v-btn rounded @click="continueGame"> Continue</v-btn>
        <v-btn rounded @click="endGame"> End Game</v-btn>
      </div>
    </div>
    <v-alert v-if="msg" dense outlined :type="type" class="mt-2">
      {{ msg }}
    </v-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { gameService } from '~/services/game.service';
import { isCardValidate } from '~/app/utils/gameUtil';
import CardCmp from '~/components/app/Card.vue';

export default {
  name: 'CheckCardDiglaog',
  components: {
    CardCmp,
  },
  data() {
    return {
      cardId: null,
      card: null,
      type: 'error',
      msg: '',
    };
  },
  computed: {
    ...mapGetters({
      game: 'game/getGame',
      ballsInMachine: 'game/getBallsInMachine',
    }),
  },
  methods: {
    checkAnother() {
      this.$emit('check-bingo', { num: 2, bol: false });
      this.card = null;
    },
    continueGame() {
      this.$emit('check-bingo', { num: 1, bol: false });
      this.card = null;
    },
    endGame() {
      this.$emit('check-bingo', { num: 4, bol: false });
    },
    validteCard() {
      if (!this.cardId) {
        return;
      }
      gameService
        .gameWinnings(this.cardId, this.game.pin)
        .then((card) => {
          const conditions = this.game.conditions;
          const isValid = isCardValidate(card, conditions);
          // this.card = card;
          this.card = card.card;
          if (isValid) {
            this.$emit('check-bingo', { num: 3, bol: true });
          } else {
            this.$emit('check-bingo', { num: 1, bol: true });
          }
        })
        .catch(() => {
          this.msg = 'Invalid Card Number';
          // this.$emit('check-bingo', { num: 1, bol: false });
        });
    },
  },
};
</script>

<style></style>
