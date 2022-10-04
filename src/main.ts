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
import { useGlobalStore } from './store/global';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APP_GRAPHQL_SERVER,
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

const i18n = createI18n({
  locale: 'pl',
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

const store = useGlobalStore();

store.$subscribe((_, state) => {
  // @ts-ignore
  i18n.global.locale = state.activeLang
})
