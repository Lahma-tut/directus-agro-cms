// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["nuxt-directus", "@pinia/nuxt", "@nuxt/fonts", "@primevue/nuxt-module", "@vueuse/nuxt"],
  css: ["~/assets/css/index.css"],

  fonts: {
    families: [
      {
        name: "Rubik",
        provider: 'google',
        weights: [300, 400, 500, 600, 700],
        styles: ["normal", "italic"],
      }
    ]
  },

  directus: {
    url: process.env.DIRECTUS_PUBLIC_URL,
    token: process.env.DIRECTUS_ADMIN_TOKEN,
  },
  primevue: {
    importTheme: { from: "@/themes/mytheme.js" },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
})
