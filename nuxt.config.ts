// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  plugins: ["./plugins/firebase", "./plugins/toast"],
  modules: ["@nuxtjs/tailwindcss", "vuetify-nuxt-module"],
  css: ["./assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_API_KEY,
      authDomain: process.env.NUXT_AUTH_DOMAIN,
      projectId: process.env.NUXT_PROJECT_ID,
      storageBucket: process.env.NUXT_STORAGE_BUCKET,
      messsagindSenderId: process.env.NUXT_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_APP_ID,
    },
  },
});
