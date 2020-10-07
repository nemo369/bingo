<template>
  <section class="d-block pt-6 main-footer">
    <footer class="">
      <div class="footer-inner d-flex justify-space-around mb-2 align-center">
        <div
          v-for="menu in menus"
          :key="menu.href"
          class="px-4 tac black--text row-1-1 d-flex justify-center flex-column fs18"
        >
          <nuxt-link :to="menu.href" color="secondary">
            {{ menu.name }}
          </nuxt-link>
        </div>
        <lang-menu />
      </div>
    </footer>
    <footer class="">
      <div class="footer-inner d-flex justify-center mb-2 align-center">
        <span class="mx-2">&copy; {{ new Date().getFullYear() }}</span>
        <v-spacer />
        <div class="mx-auto d-flex justify-center align-center">
          <span class="mr-1">MATRIX BINGO</span>
          <v-img max-width="95" contain :src="getImgUrl('secure-payments')" />
        </div>
        <v-spacer />

        <div class="devs d-flex ml-auto align-center justify-end">
          <span class="mx-2"
            >DEV:&nbsp;
            <a
              href="http://actappon.com"
              target="_blank"
              rel="noopener noreferrer"
              >Actappon</a
            >&nbsp; &
          </span>
          <a
            href="http://naamanfrenkel.dev"
            target="_blank"
            rel="noopener noreferrer"
            class=""
          >
            NEMO
          </a>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
// import LangMenu from '~/components/header/LangMenu.vue';

export default {
  name: 'AppFooter',
  components: {
    // LangMenu,
  },
  data: () => ({
    menus: [
      {
        name: 'About',
        href: '/page/about',
      },
      {
        name: 'Why and how',
        href: '/page/why',
      },
      {
        name: 'Terms and conditions',
        href: '/page/terms',
      },
      {
        name: 'Contact',
        href: '/page/contact',
      },
    ],
  }),
  methods: {
    getImgUrl(file) {
      return require(`~/assets/${file}.png`);
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  background: $white;
}
.devs *,
.devs {
  font-size: 0.7rem;
}
</style>
