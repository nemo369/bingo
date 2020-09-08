<template>
  <nav>
    <ul v-if="isLogedIn" class="d-flex justify-end row-1-1 gray--color">
      <li
        v-for="menu in menus"
        :key="menu.href"
        :class="{ active: isActive(menu.href) }"
        class="px-4 tac inherit row-1-1 d-flex justify-center flex-column"
      >
        <nuxt-link :to="menu.href" class="text-uppercase fs18">
          {{ menu.name }}
        </nuxt-link>
      </li>
    </ul>
    <ul v-else class="d-flex justify-end row-1-1 gray--color">
      <li class="px-4 tac inherit row-1-1 d-flex justify-center flex-column">
        <nuxt-link :to="localePath('login')" class="text-uppercase fs18">
          {{ $t('login') }}
        </nuxt-link>
      </li>
      <li class="px-4 tac inherit row-1-1 d-flex justify-center flex-column">
        <nuxt-link :to="localePath('register')" class="text-uppercase fs18">
          {{ $t('register') }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MainMenu',
  data() {
    return {
      menus: [
        {
          name: this.$t('create a bingo'),
          href: this.localePath('album-create_a_bingo'),
        },
        {
          name: this.$t('my bingos'),
          href: this.localePath('album-my_bingos'),
        },
        {
          name: this.$t('add funds'),
          href: this.localePath('#'),
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
  },
};
</script>

<style lang="scss" scoped>
.fs18 {
  font-size: 14px;
  font-weight: 200;
}
</style>
