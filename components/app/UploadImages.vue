<template>
  <div class="upload my-4 mx-auto" tabindex="0">
    <v-card class="pt-4 pt-4 pb-16" :class="{ active: dragover }">
      <div class="drop mx-auto my-4 d-flex flex-column align-center tac">
        <div class="svg block mt-auto" v-html="noImg"></div>
        <h2 class="mb-2 h2">{{ $t('drop your pictures here, or browse') }}</h2>
        <span>Maximum {{ maxPictures }} pictures</span>
        <span>Supports {{ supports.join(',') }} </span>
        <span class="mb-auto">{{ maxFileSize / 1000 }}MB </span>
      </div>
      <input type="file" :accept="supports" class="d-none" />
      <v-alert
        v-for="(file, i) in errorFiles"
        :key="i"
        dense
        outlined
        type="error"
        class="error pa-2 mb-4 mx-auto"
      >
        <span>{{ file.name }}</span> -
        <span v-for="(err, i) in file.errors" :key="i">
          <i v-if="i">,</i>
          {{ err.msg }}
        </span>
      </v-alert>
    </v-card>
  </div>
</template>

<script>
import { getSvg } from '~/app/utils/svgs';

export default {
  name: 'UploadImages',
  data: () => ({
    noImg: getSvg('noImg'),
    supports: ['jpg', 'jpeg', 'png'],
    maxFileSize: 2000,
    maxPictures: 99,
    dragover: false,
    errorFiles: [],
  }),
  mounted() {
    const dropzone = this.$el;
    const fileupload = this.$el.querySelector('input');
    // register listeners on your dropzone / v-sheet
    if (!dropzone) {
      return;
    }
    // drag & drop event listeners
    dropzone.addEventListener('dragenter', (e) => {
      e.preventDefault();
      this.dragover = true;
    });
    dropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      this.dragover = false;
    });
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.dragover = true;
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      const dragevent = e;
      if (dragevent.dataTransfer) {
        this.filesSelected(dragevent.dataTransfer.files);
      }
    });

    //   BROWSE EVNETS (click and enter)
    dropzone.addEventListener('click', () => {
      this.dragover = true;
      setTimeout(() => {
        this.dragover = false;
      }, 500);
      if (fileupload) {
        fileupload.click();
      }
    });
    dropzone.addEventListener('keypress', () => {
      const keyEvent = event;
      this.dragover = true;
      setTimeout(() => {
        this.dragover = false;
      }, 500);
      if (keyEvent.key === 'Enter') {
        if (fileupload) fileupload.click();
      }
    }); // register listeners on the file input
    if (fileupload) {
      fileupload.addEventListener('change', ({ target }) => {
        this.dragover = false;
        if (target.files) {
          this.filesSelected(target.files);
        }
      });
    }
  },
  methods: {
    filesSelected(files) {
      this.dragover = false;
      // TODO: valide files
      const validFiles = this.doValidation(files);
      this.errorFiles = validFiles.filter((file) => !file.isValid);
      setTimeout(() => {
        this.errorFiles = [];
      }, 6000);
      if (validFiles) {
        this.$emit(
          'filesSelected',
          validFiles.filter((file) => file.isValid)
        );
      }
    },
    doValidation(files) {
      if (!files) {
        return [];
      }
      return Array.from(files).map((file) => {
        const errors = [];
        const type = file.type.split('/');
        // valid type
        if (!type[0].includes('image') || !this.supports.includes(type[1])) {
          errors.push({ msg: this.$t('wrong file type') });
        }
        // valid size -> from byes to KB
        const sizeInKb = file.size / 1024;
        if (sizeInKb > this.maxFileSize) {
          errors.push({ msg: this.$t('this file is to big') });
        }
        const localUrl = URL.createObjectURL(file);
        return {
          name: file.name,
          blob: file.type,
          type: {
            type: file.type,
            blob: type[0],
            format: type[1],
          },
          size: sizeInKb,
          isValid: !errors.length,
          errors,
          localUrl,
          title: '',
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  width: 75%;
}
.upload.active {
  border: 5px solid;
}
.drop {
  height: 250px;
  border-radius: 4px;
  border: 2px dashed $sec-color;
  max-width: 620px;
  span {
    color: gray;
  }
}
.h2 {
  font-size: rem(20);
}
span {
  font-size: 12px;
}
.error {
  width: 90%;
  border-radius: 4px;
  color: white;
}
</style>
