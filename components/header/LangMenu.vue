<template>
  <nav>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <button class="lang-btn" v-on="on">
          <img
            v-if="currentLocale.iso"
            class="full"
            :src="`https://www.countryflags.io/${
              currentLocale.iso.split('-')[1]
            }/flat/64.png`"
          />
        </button>
      </template>
      <v-card>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="locale in availableLocales" :key="locale.code">
              <button @click="changeLang(locale.code)">
                <v-list-item-content>
                  <v-list-item-title v-text="locale.name"></v-list-item-title>
                </v-list-item-content>
              </button>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
  </nav>
</template>

<script>
export default {
  name: `LangMenu`,
  data() {
    return {};
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
    currentLocale() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale);
    },
  },
  methods: {
    changeLang(code) {
      this.$i18n.setLocale(code);
    },
  },
};
</script>

<style lang="scss">
.lang-btn {
  padding: 3px 6px;
  min-width: unset;
  width: 30px;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  background-color: #f5f5f5;
}
</style>
