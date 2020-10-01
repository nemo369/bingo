<template>
  <nav>
    <!-- {{ $auth.loggedIn }} -->
    <ul v-if="$auth.loggedIn" class="d-flex justify-end row-1-1 gray--color">
      <li
        v-for="menu in menus"
        :key="menu.id"
        :class="{ active: isActive(menu.href) }"
        class="px-4 tac inherit row-1-1 d-flex justify-center flex-column"
      >
        <a class="text-uppercase fs18" @click="reDirect(menu)">
          {{ menu.name }}
        </a>
      </li>
    </ul>
    <ul v-if="!$auth.loggedIn" class="d-flex justify-end row-1-1 gray--color">
      <li class="px-4 tac inherit row-1-1 d-flex justify-center flex-column">
        <nuxt-link :to="localePath('/login')" class="text-uppercase fs18">
          {{ $t('login') }}
        </nuxt-link>
      </li>
      <li class="px-4 tac inherit row-1-1 d-flex justify-center flex-column">
        <nuxt-link :to="localePath('/register')" class="text-uppercase fs18">
          {{ $t('register') }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { newAlbum } from '~/store/album';

export default {
  name: 'MainMenu',
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
    reDirect(menu) {
      if (menu.id === 1) {
        this.$store.dispatch('album/setAlbum', newAlbum());
      }
      this.$router.push(menu.href);
    },
  },
};
</script>

<style lang="scss" scoped>
.fs18 {
  font-size: 14px;
  font-weight: 200;
}
</style>
