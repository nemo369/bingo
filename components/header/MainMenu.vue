<template>
  <nav>
    <ul v-if="isLogedIn" class="d-flex justify-end row-1-1">
      <li
        v-for="menu in menus"
        :key="menu.href"
        :class="{ active: isActive(menu.href) }"
        class="px-4 tac black--text row-1-1 d-flex justify-center flex-column fs18"
      >
        <nuxt-link :to="menu.href">
          {{ menu.name }}
        </nuxt-link>
      </li>
    </ul>
    <ul v-else class="d-flex justify-end row-1-1">
      <li
        class="px-4 tac black--text row-1-1 d-flex justify-center flex-column fs18 text-capitalize"
      >
        <nuxt-link to="signIn">
          sign in
        </nuxt-link>
      </li>
      <li
        class="px-4 tac black--text row-1-1 d-flex justify-center flex-column fs18 text-capitalize"
      >
        <nuxt-link to="register">
          register
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MainMenu',
  data: () => ({
    menus: [
      {
        name: 'Balance',
        href: '#',
      },
    ],
  }),
  computed: {
    ...mapGetters({
      isLogedIn: 'user/isLogedIn',
    }),
  },
  methods: {
    isActive(href) {
      const currentRoute = this.$nuxt.$route.path;
      if (currentRoute.includes(href)) {
        return true;
      }
    },
  },
};
</script>
