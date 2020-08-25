<template>
  <v-card
    class="mx-auto album-grid__li overflow-hidden"
    max-width="400"
    :loading="loading"
    :disabled="loading"
  >
    <v-hover v-if="album.pictures.length" v-slot:default="{ hover }">
      <v-img
        class="white--text align-end"
        height="200px"
        :src="album.pictures[0].url"
        :class="`${hover ? 'hover-img' : ''}`"
      >
      </v-img>
    </v-hover>

    <div v-else class="svg block" v-html="noImg"></div>

    <v-card-text class="text--primary">
      <div>{{ album.name }}</div>
    </v-card-text>

    <v-card-subtitle v-if="album.pictures && album.board" class="pt-0">
      {{ album.pictures.length }} pictures, {{ album.board.row }}X{{
        album.board.column
      }}
    </v-card-subtitle>

    <v-card-actions class="d-flex justify-end">
      <v-btn
        v-if="!album.isPublic"
        class="mx-2"
        fab
        dark
        small
        color="primary"
        @click="editAlbum"
      >
        <v-icon dark>mdi-square-edit-outline</v-icon>
      </v-btn>
      <v-btn class="text-capitalize" @click="setGame">
        let's Game
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getSvg } from '~/app/utils/svgs';

export default {
  name: 'AlbumPreview',
  props: {
    album: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    noImg: getSvg('noImg'),
  }),
  methods: {
    setGame: () => {
      this.loading = true;
      console.log('TODO...redirect and set store');
    },
    editAlbum: () => {
      this.loading = true;
      console.log('TODO...redirect and set store');
    },
  },
};
</script>

<style lang="scss" scoped>
.svg {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $sec-color;
}
.v-card {
  transition: all 0.4s ease-in-out;
  * {
    transition: all 0.4s ease-in-out;
  }
}
.hover-img {
  transform: scale(1.02);
}
</style>
