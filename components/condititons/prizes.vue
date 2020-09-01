<template>
  <div>
    <h3 class="my-2 h3 tac">
      {{ conditions.length }}
      <b>Winnig Conditon{{ conditions.length > 1 ? 's' : '' }}</b>
    </h3>

    <section class="wrapper mx-auto">
      <v-card
        v-for="(condition, index) in conditions"
        :key="condition.id"
        class="bg-white my-5 pa-4 d-flex align-end"
      >
        <dumi-board
          :condition="condition"
          :add-text="$t('Choose the prize for ')"
        />
        <v-img
          :src="getRandomSrc()"
          height="200"
          max-width="200"
          aspect-ratio="1"
          class="mx-4"
        ></v-img>
        <div class="d-flex flex-column mx-4">
          <v-file-input
            v-model="files[index]"
            :rules="rules"
            accept=".jpg, .jpeg, .png"
            label="Prize image"
            placeholder="Upload Your Image"
            prepend-icon="mdi-camera"
            outlined
            dense
          ></v-file-input>
          <v-btn color="primary" :disabled="!!file" @click="imageUpload"
            >Upload</v-btn
          >
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

export default {
  name: 'Conditions',
  components: {
    DumiBoard,
  },
  props: {
    conditions: {
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
      return !this.conditions.every((condition) => condition.picture);
    },
  },
  methods: {
    getRandomSrc() {
      return 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=300&fit=max';
    },
    startGame() {
      this.loading = true;
      this.emit('start-game', this.conditions);
    },
 async imageUpload(file, tags) {
      if (!file) {
        throw new Error('Image was not provided')
      }
      if (!file.type.includes('image/')) {
        throw new Error('Invalid file format')
      }
      const presetName = process.env.cloudinaryPreset
      const formData = new FormData()
      formData.append('upload_preset', presetName)
      formData.append('file', file)
      if (tags) {
        formData.append('tags', tags)
        if (tags.includes('avatar')) {
          formData.append('folder', 'user_avatars')
        } else if (tags.includes('preview')) {
          formData.append('folder', 'article_preview')
        }
      }
      const response = await this.$uploadApi.$post('upload', formData);
      console.log(response);
      return response;
 }
  },
};
</script>

<style scoped lang="scss"></style>
