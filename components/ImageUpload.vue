<template>
  <div>
    <button @click="deleteImage"></button>
    <v-file-input
      v-model="imageFile"
      accept="image/*"
      class="upload"
      :disabled="isLoading"
      @change="onImageChange"
    >
    </v-file-input>
  </div>
</template>

<script>
export default {
  name: 'LvImageUpload',
  props: {},
  data() {
    return {
      imageFile: null,
      isLoading: false,
    };
  },
  methods: {
    async imageUpload(file, tags) {
      if (!file) {
        throw new Error('Image was not provided');
      }
      if (!file.type.includes('image/')) {
        throw new Error('Invalid file format');
      }
      const presetName = process.env.cloudinaryPreset;
      const formData = new FormData();
      formData.append('upload_preset', presetName);
      formData.append('file', file);
      if (tags) {
        formData.append('tags', tags);
        if (tags.includes('avatar')) {
          formData.append('folder', 'user_avatars');
        } else if (tags.includes('preview')) {
          formData.append('folder', 'article_preview');
        }
      }
      const response = await this.$uploadApi.$post('upload', formData);
      return response;
    },
    async onImageChange(file) {
      console.log(file);
      this.isLoading = true;
      try {
        const response = await this.imageUpload(file, this.imageTag);
        this.$emit('change', response);
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
