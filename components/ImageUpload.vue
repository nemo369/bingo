<template>
  <div>
    <button @click="deleteImage"></button>
    <v-file-input
      v-model="imageFile"
      accept="image/*"
      class="upload"
      :disabled="isLoading"
      :loading="isLoading"
      @change="onImageChange"
    >
    </v-file-input>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LvImageUpload',
  props: ['conditionId'],
  data() {
    return {
      imageFile: null,
      isLoading: false,
      presetName: process.env.cloudinaryPreset,
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
  },
  methods: {
    async imageUpload(file) {
      if (!file) {
        throw new Error('Image was not provided');
      }
      if (!file.type.includes('image/')) {
        throw new Error('Invalid file format');
      }
      const formData = new FormData();
      formData.append('upload_preset', this.presetName);
      formData.append('file', file);
      formData.append('folder', 'users_prizes');
      formData.append('tags', ['prize', 'user_prizes', this.user.username]);

      const response = await this.$uploadApi.$post('upload', formData);
      return response;
    },
    async onImageChange(file) {
      this.isLoading = true;
      if (!file) {
        return;
      }
      try {
        const img = await this.imageUpload(file);
        this.$emit('upload', { img, conditionId: this.conditionId });
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    deleteImage() {
      this.imageFile = {};
      this.$emit('delete');
    },
  },
};
</script>
