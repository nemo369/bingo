<template>
  <v-navigation-drawer
    :value="drawer"
    disable-resize-watcher
    app
    clipped
    right
    absolute
  >
    <v-list-item v-if="user">
      <v-list-item-avatar>
        <v-img :src="user.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ user.username }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="menu in menus" :key="menu.id">
        <v-list-item-content @click="reDirect(menu)">
          <v-list-item-title>{{ menu.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { newAlbum } from '~/store/album';
export default {
  name: 'AppSideBar',
  props: ['drawer'],
  data() {
    return {
      menus: [
        {
          id: 1,
          name: this.$t('create a bingo'),
          href: this.localePath('album-create_a_bingo'),
        },
        {
          id: 2,
          name: this.$t('my bingos'),
          href: this.localePath('album-my_bingos'),
        },
        {
          id: 3,
          name: this.$t('add funds'),
          href: this.localePath('payments-deposits'),
        },
      ],
    };
  },
  methods: {
    reDirect(menu) {
      if (menu.id === 1) {
        this.$store.dispatch('album/setAlbum', newAlbum());
      }
      this.$router.push(menu.href);
    },
  },
};
</script>

<style></style>
