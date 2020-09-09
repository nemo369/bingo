<template>
  <v-card
    class="mx-auto album-grid__li overflow-hidden"
    max-width="400"
    :loading="loading"
    :disabled="loading"
  >
    <v-hover v-if="album.pictures.length" v-slot:default="{ hover }">
      <div
        class="d-grid imgs"
        :class="`${hover ? 'hover-img' : ''}`"
        :style="{
          gridTemplateColumns: `repeat(${album.board.row}, 1fr)`,
          gridTemplateRows: ` repeat(${album.board.column}, 1fr)`,
        }"
      >
        <div
          v-for="(pic, i) in album.board.column * album.board.column"
          :key="i"
          class="white--text align-end"
        >
          <img v-if="album.pictures[i]" :src="album.pictures[i].url" />
          <div
            v-else
            class="svg d-flex align-center justify-center svg--clear"
            v-html="noImg"
          ></div>
        </div>
      </div>
    </v-hover>
    <div v-else class="svg block svg-full" v-html="noImg"></div>

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
      <v-btn
        class="text-capitalize"
        :disabled="!!album.pictures.length"
        color="primary"
        @click="setGame"
      >
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
    setGame() {
      this.loading = true;
      this.$store.dispatch('album/setAlbum', this.album).then(() => {
        this.$router.push(this.localePath({ name: 'GameConditions' }));
      });
    },
    editAlbum() {
      this.loading = true;
      this.$store
        .dispatch('album/getBingo', this.album.albumId)
        .then(() => {
          this.$router.push(this.localePath({ name: 'album-create_a_bingo' }));
        })
        .catch(() => (this.loading = false));
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-full {
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
.imgs {
  height: 200px;
  background-color: $prim-color;
  grid-gap: 1px;
}
.svg--clear {
  background-color: $sec-color;
  height: 100%;
}
</style>
