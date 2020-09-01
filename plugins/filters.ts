import Vue from 'vue';

Vue.filter('startCase', (value: string) => {
  if (!value) {
    return '';
  }
  return value
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ');
});
