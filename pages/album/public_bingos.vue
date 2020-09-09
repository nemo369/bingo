<template>
  <div>
    <h2 class="col-1-1">{{ $t('public bingos') }}</h2>
    <h2 v-if="error">{{ error.message }}</h2>
    <ol class="album-grid">
      <li v-for="album in albums" :key="album.id" class="mt-4">
        <album-preview :album="album" />
      </li>
    </ol>
  </div>
</template>

<script type="ts">
import AlbumPreview from '~/components/album/AlbumPreview.vue';
import {albumService} from '~/services/album.service.ts';

export default {
  name: 'PublicsAlbum',
  components: {
    AlbumPreview,
  },
  async fetch () {
    try {
      const albums= await albumService.getPublic();
      this.albums = albums
    } catch (e) {
      this.error ={
        statusCode: 503,
        message: 'Unable to fetch albums at this time. Please try again.'
      }
    }
  },
  data: () => ({
    albums: [],
    error: null
  }),
};
</script>

<style></style>
