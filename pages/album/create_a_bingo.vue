<template>
  <div v-if="album">
    <h1 class="col-1-1 mt-4">{{ $t('create bingo') }}</h1>
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
      <form class="d-flex cards justify-space-around mt-10 flex-wrap">
        <label class="label">
          <input
            v-model="choosedCard"
            type="radio"
            name="card"
            :disable="isDisabled"
            value="3x3"
          />
          <small class="tac small">Recommended: 22 - 36 pictures</small>
          <Card :card="{ pictures: [], row: 3, column: 3 }" />
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
          <Card :card="{ pictures: [], row: 4, column: 4 }" />
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
          <Card :card="{ pictures: [], row: 5, column: 5 }" />
        </label>
      </form>
    </div>
    <div class="d-flex justify-end align-center mt-4">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </template>
        <span>
          {{ $t('Free your album photos open to users to play') }}
          <br />
          {{ $t('Make sure you have copyrights on them') }} &copy;
        </span>
      </v-tooltip>

      <v-switch
        v-model="is_public"
        :label="`${$t('Open To all')}`"
        class="mr-16"
      ></v-switch>

      <v-btn
        rounded
        color="primary"
        class="px-16"
        :disabled="album.pictures.length > 99 || !choosedCard"
        :loading="loading"
        x-large
        @click="createAlbum"
        >{{ !album.albumId ? $t('save') : $t('update') }}</v-btn
      >
      <v-alert v-if="errMsg" type="error">
        {{ errMsg }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '~/components/app/Card.vue';
import ImagesGrid from '~/components/create/ImagesGrid.vue';
import UploadImages from '~/components/app/UploadImages.vue';
import { albumService } from '~/services/album.service.ts';
import { convertErr } from '~/app/utils/helpers';

export default {
  name: 'CreateAlbum',
  // middleware: 'auth',

  components: {
    UploadImages,
    ImagesGrid,
    Card,
  },
  data() {
    return {
      loading: false,
      choosedCard: '3x3',
      label: this.$t('Enter Bingo Name'),
      is_public: false,
      errMsg: '',
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length <= 25) || 'Max 25 characters',
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
  mounted() {
    if (this.album.board) {
      this.choosedCard = `${this.album.board.row}x${this.album.board.column}`;
    }
  },
  methods: {
    setFiles(addedPictures) {
      const clearErros = addedPictures.filter((pic) => !!pic);
      const pictures = [...this.album.pictures, ...clearErros];
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
        name: this.album.name ? this.album.name : 'Untitled',
        is_public: this.is_public,
        board: {
          row: parseInt(this.choosedCard[0], 10),
          column: parseInt(this.choosedCard[2], 10),
        },
      };
      if (this.album.albumId) {
        this.updateAlbum(album);
        return;
      }
      albumService
        .createAlbum(album)
        .then(() => {
          this.$router.push(this.localePath({ name: 'album-my_bingos' }));
        })
        .catch((err) => {
          this.handleErr(err);
        });
    },
    updateAlbum(album) {
      albumService
        .updateAlbum(album, this.album.albumId)
        .then(() => {
          this.$router.push(this.localePath({ name: 'album-my_bingos' }));
        })
        .catch((err) => {
          this.handleErr(err);
        });
    },
    handleErr(err) {
      const obj = convertErr(err);
      this.loading = false;
      if (obj.data.status === 400) {
        this.errMsg = 'Something is Missing in your Bingo';
      } else {
        this.errMsg = 'Server Error';
      }
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
    transition: all 0.3;
    &:hover {
      background-color: #e11b3c07;
    }
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
    background-color: $op-color;
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
  color: $prim-color;
  position: relative;
  z-index: 2;
}
</style>
