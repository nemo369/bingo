<template>
  <div>
    <h3 v-if="error">{{ error.message }}</h3>

    <div v-if="myAlbums && myAlbums.length">
      <h2 class="col-1-1 mt-4">{{ $t('my uploads') }}</h2>
      <ol class="album-grid">
        <li v-for="album in myAlbums" :key="album.id" class="mt-4">
          <album-preview :album="album" />
        </li>
      </ol>
    </div>

    <div v-if="publicAlbums && publicAlbums.length">
      <h2 class="col-1-1 mt-10">{{ $t('public board i played') }}</h2>
      <ol class="album-grid">
        <li v-for="album in publicAlbums" :key="album.id" class="mt-4">
          <album-preview :album="album" />
        </li>
      </ol>
    </div>
  </div>
</template>

<script type="ts">
import AlbumPreview from '~/components/album/AlbumPreview.vue';
import {albumService} from '~/services/album.service.ts';

export default {
  name: 'MyAlbums',
  middleware: 'auth',
  components: {
    AlbumPreview,
  },
  async fetch () {
    try {
      const albums = await albumService.getBingos();
        this.myAlbums = albums.filter(album => !album.isPublic)
        this.publicAlbums = albums.filter(album => album.isPublic)
} catch (e) {
      this.error ={
        statusCode: 503,
        message: 'Unable to fetch bingos at this time. Please try again.'
      }
    }
  },
  data: () => ({
    myAlbums: [],
    publicAlbums: [],
    error: null
  }),
};
</script>

<style></style>
