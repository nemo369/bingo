<template>
  <div>
    <h3 class="my-2 h3 tac">
      {{ conditions.length }}
      <b>Winnig Conditon{{ conditions.length > 1 ? 's' : '' }}</b>
    </h3>

    <section class="wrapper mx-auto">
      <v-card
        v-for="(condition, i) in conditions"
        :key="condition.id"
        class="bg-white my-5 pa-4 d-flex align-end"
      >
        <dumi-board
          :condition="condition"
          :add-text="$t('Choose the prize for')"
        />
        <v-img
          :src="prizes[i].picture.url"
          height="200"
          max-width="200"
          aspect-ratio="1"
          class="mx-4"
        ></v-img>
        <div class="d-flex flex-column mx-4">
          <lv-image-upload :condition-id="condition.id" @upload="imgUploaded" />
          <v-text-field
            v-model="condition.name"
            :placeholder="$t('Enter Prize Name')"
          ></v-text-field>
        </div>
      </v-card>
    </section>
    <v-btn
      class="mx-auto d-flex"
      x-large
      color="success"
      :loading="loading"
      :disabled="disabled"
      @click="startGame"
    >
      {{ $t('Start Game') }}
    </v-btn>
  </div>
</template>

<script>
import DumiBoard from './dumiBoard';
import LvImageUpload from '~/components/ImageUpload.vue';

export default {
  name: 'Prizes',
  components: {
    DumiBoard,
    LvImageUpload,
  },
  props: {
    conditions: {
      type: Array,
      required: true,
    },
    prizes: {
      type: Array,
      required: true,
    },
    grid: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    file: null,
    loading: false,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Image size should be less than 2 MB!',
    ],
  }),
  computed: {
    disabled() {
      // The every() method tests whether all elements in the array pass the test implemented by the
      return this.prizes.every((prize) => prize.picture);
    },
  },
  methods: {
    startGame() {
      this.loading = true;
      this.emit('start-game', this.conditions);
    },
    imgUploaded({ img, conditionId }) {
      const prizes = this.prizes.map((prize) => {
        if (prize.conditionId === conditionId) {
          return {
            ...prize,
            picture: {
              ...img,
            },
          };
        }
        return prize;
      });
      this.$emit('update-prizes', prizes);
    },
  },
};
</script>

<style scoped lang="scss"></style>
