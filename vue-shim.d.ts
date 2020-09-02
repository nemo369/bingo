import { Cloudinary } from 'cloudinary-core';

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $cloudinary: Cloudinary;
  }
}
