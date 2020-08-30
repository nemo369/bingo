<template>
  <div>
    <h1 class="col-1-1">{{ $t('create bingo') }}</h1>
    <v-text-field
      v-model="name"
      class="half mx-auto mb-8 v-text-field"
      :label="label"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
    <upload-images @filesSelected="setFiles"></upload-images>
    <images-grid
      :images="images"
      class="mt-10"
      @delete="removeImage"
      @title="addTitle"
    ></images-grid>
    <div class="choose mt-10">
      <h2 class="tac">{{ $t('choose card type') }}</h2>
      <form class="d-flex cards justify-space-around mt-10">
        <input
          id="3x3"
          v-model="choosedCard"
          type="radio"
          name="card"
          :disable="isDisabled"
        />
        <label for="3x3" class="label">
          <small class="tac small">Recommended: 22 - 36 pictures</small>
          <Card :card="{ pictures: [], card: { row: 3, column: 3 } }" />
        </label>
        <input
          id="4x4"
          v-model="choosedCard"
          type="radio"
          name="card"
          :disable="isDisabled"
        />
        <label for="4x4" class="label">
          <small class="tac small">Recommended: 22 - 36 pictures</small>
          <Card :card="{ pictures: [], card: { row: 4, column: 4 } }" />
        </label>
        <input
          id="5x5"
          v-model="choosedCard"
          type="radio"
          name="card"
          :disable="isDisabled"
        />
        <label for="5x5" class="label">
          <small class="tac small">Recommended: 22 - 36 pictures</small>
          <Card :card="{ pictures: [], card: { row: 5, column: 5 } }" />
        </label>
      </form>
    </div>
    <div class="d-flex justify-end">
      <v-btn
        color="primary"
        :disabled="canSendForm"
        :loading="loading"
        @click="createAlbum"
        >{{ $t('save') }}</v-btn
      >
    </div>
  </div>
</template>

<script>
import Card from '~/components/app/Card.vue';
import ImagesGrid from '~/components/create/ImagesGrid.vue';
import UploadImages from '~/components/app/UploadImages.vue';
import { albumService } from '~/services/album.service.ts';

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
      name: '',
      loading: false,
      images: [],
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
    canSendForm() {
      if (
        !this.choosedCard ||
        this.images.length < 25 ||
        this.images.length > 99
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    setFiles(images) {
      this.images = [...this.images, ...images];
      // console.log(files);
    },
    addTitle(title, url) {
      console.log(title, url);
      this.images = this.images.map((img) => {
        if (img.localUrl === url) {
          return {
            ...img,
            title,
          };
        }
        return img;
      });
    },
    removeImage(url) {
      this.images = this.images.filter((img) => img.localUrl !== url);
    },
    createAlbum() {
      this.loading = true;
      const album = {
        images: this.images,
        name: this.name,
        card: {
          row: +this.choosedCard[0],
          column: +this.choosedCard[2],
        },
      };

      albumService
        .createAlbum(album)
        .then((album) => {
          console.log(album, 'TODO: redirect o my bingos page');
          this.$router.push(this.localePath({ name: 'album/my_bingos' }));
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
    cursor: pointer;
  }
}
input[type='radio'] {
  display: none;
}

input[type='radio']:checked + .label {
  background-color: rgba(30, 143, 255, 0.253);
}
.small {
  display: block;
  margin-bottom: 5px;
}
</style>
