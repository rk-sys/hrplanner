import App from '@/App.vue'
import Router from './router/router'
import pl from './i18n/pl.json'
import en from './i18n/en.json'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { createApp, h, provide } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './style.css'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

const i18n = createI18n({
  locale: 'pl',
  fallbackLocale: 'pl',
  messages: {
    pl,
    en
  }
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(createPinia()).use(Router).use(i18n).use(autoAnimatePlugin).mount('#app')
