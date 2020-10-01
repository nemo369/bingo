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
Vue.filter('onlyDigs', (value: string) => {
  if (!value) {
    return '';
  }
  const num = value.replace(/[^0-9]/g, '');
  return num;
});
