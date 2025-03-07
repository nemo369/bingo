import cloudinary from 'cloudinary-core';

const $cloudinary = new cloudinary.Cloudinary({
  cloud_name: process.env.cloudinaryName,
  secure: true,
});
// Vue.prototype.$cloudinary = $cloudinary

export default (_, inject) => {
  inject('cloudinary', $cloudinary);
};
