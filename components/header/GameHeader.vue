<template>
  <v-navigation-drawer :value="drawer" app temporary right>
    <v-list-item v-if="$auth.loggedIn">
      <v-list-item-avatar>
        <v-img :src="$auth.user.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ $auth.user.username }}</v-list-item-title>
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
export default {
  name: 'GameHeader',
  props: ['drawer'],
  data() {
    return { menus: [{ title: 'Exit Game' }] };
  },
};
</script>

<style></style>
