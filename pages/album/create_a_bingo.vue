<template>
  <div v-if="album">
    <h1 class="col-1-1">{{ $t('create bingo') }}</h1>
    <v-text-field
      :value="album.name"
      class="half mx-auto mb-8 v-text-field"
      :label="label"
      :rules="rules"
      hide-details="auto"
      @input="updateName"
    ></v-text-field>
    <upload-images @filesSelected="setFiles"></upload-images>
    <images-grid
      :images="album.pictures"
      class="mt-10"
      @delete="removeImage"
      @title="addTitle"
    ></images-grid>
    <div class="choose mt-10">
      <h2 class="tac">{{ $t('choose card type') }}</h2>
      <form class="d-flex cards justify-space-around mt-10">
        <label class="label">
          <input
            v-model="choosedCard"
            type="radio"
            name="card"
            :disable="isDisabled"
            value="3x3"
          />
          <small class="tac small">Recommended: 22 - 36 pictures</small>
          <Card :card="{ pictures: [], card: { row: 3, column: 3 } }" />
        </label>
        <label class="label">
          <input
            v-model="choosedCard"
            type="radio"
            name="card"
            :disable="isDisabled"
            value="4x4"
          />
          <small class="tac small">Recommended: 22 - 36 pictures</small>
          <Card :card="{ pictures: [], card: { row: 4, column: 4 } }" />
        </label>
        <label class="label">
          <input
            v-model="choosedCard"
            type="radio"
            name="card"
            :disable="isDisabled"
            value="5x5"
          />
          <small class="tac small">Recommended: 22 - 36 pictures</small>
          <Card :card="{ pictures: [], card: { row: 5, column: 5 } }" />
        </label>
      </form>
    </div>
    <div class="d-flex justify-end mt-4">
      <v-btn
        color="primary"
        :disabled="
          album.pictures.length < 25 ||
          album.pictures.length > 99 ||
          !choosedCard
        "
        :loading="loading"
        @click="createAlbum"
        >{{ $t('save') }}</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Card from '~/components/app/Card.vue';
import ImagesGrid from '~/components/create/ImagesGrid.vue';
import UploadImages from '~/components/app/UploadImages.vue';
import { albumService } from '~/services/album.service.ts';
import { newAlbum } from '~/store/album';

export default {
  name: 'CreateAlbum',
  middleware: 'auth',

  components: {
    UploadImages,
    ImagesGrid,
    Card,
  },
  data() {
    return {
      loading: false,
      choosedCard: '3x3',
      label: this.$t('enter bingo name'),
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length <= 12) || 'Max 12 characters',
      ],
    };
  },
  computed: {
    isDisabled() {
      return false;
      // return !this.images.length < 36;
    },

    ...mapGetters({
      album: 'album/getAlbum',
    }),
  },
  methods: {
    setFiles(addedPictures) {
      const pictures = [...this.album.pictures, ...addedPictures];
      this.$store.dispatch('album/setAlbum', { pictures });
      // console.log(files);
    },
    canSendForm() {
      if (
        !this.choosedCard ||
        this.album?.pictures?.length < 25 ||
        this.album?.pictures?.length > 99
      ) {
        return true;
      }
      return false;
    },
    addTitle({ title, assetId }) {
      console.log(title, assetId);
      const pictures = this.album.pictures.map((img) => {
        if (img.asset_id === assetId) {
          return {
            ...img,
            title,
          };
        }
        return img;
      });
      this.$store.dispatch('album/setAlbum', { pictures });
    },
    removeImage(assetId) {
      const pictures = this.album.pictures.filter(
        (img) => img.asset_id !== assetId
      );
      this.$store.dispatch('album/setAlbum', { pictures });
    },
    updateName(name) {
      this.$store.dispatch('album/setAlbum', { name });
    },
    createAlbum() {
      this.loading = true;
      const album = {
        ...this.album,
        card: {
          row: parseInt(this.choosedCard[0], 10),
          column: parseInt(this.choosedCard[2], 10),
        },
      };

      albumService
        .createAlbum(album)
        .then(() => {
          this.$router.push(this.localePath({ name: 'album-my_bingos' }));
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style lang="scss" scoped>
.v-text-field {
  height: 70px;
}
.cards {
  min-height: 400px;
  .label {
    flex: 0 0 300px;
    padding: 10px;
    box-sizing: content-box;
    position: relative;
    cursor: pointer;
  }
}
input[type='radio'] {
}

.label :checked {
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(30, 143, 255, 0.253);
    right: 0;
    margin: auto;
    z-index: 0;
    border-radius: 4px;
  }
}
.card {
  z-index: 1;
  position: relative;
}
.small {
  display: block;
  margin-bottom: 5px;
}
</style>
