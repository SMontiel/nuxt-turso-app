// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt Turso app'
    }
  },
  devtools: { enabled: process.env.NODE_ENV !== 'production' }
})
