<template>
  <v-navigation-drawer :value="drawer" absolute temporary right>
    <v-list-item v-if="user">
      <v-list-item-avatar>
        <v-img :src="user.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ user.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="menu in menus" :key="menu.title" link>
        <v-list-item-content>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'GameHeader',
  props: ['drawer'],
  data() {
    return { menus: [{ title: 'Exit Game' }] };
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
  },
};
</script>

<style></style>
