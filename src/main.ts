import App from '@/App.vue'
import Router from './router/router'
import pl from './i18n/pl/pl'
import en from './i18n/en.json'
import Notifications from '@kyvg/vue3-notification'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { useGlobalStore } from './store/global';
import './style.css'

export const i18n = createI18n({
  legacy: false,
  locale: 'pl',
  messages: {
    pl,
    en
  }
})

createApp(App)
    .use(createPinia())
    .use(Router)
    .use(i18n)
    .use(autoAnimatePlugin)
    .use(Notifications)
    .mount('#app')

const store = useGlobalStore();

store.$subscribe((_, state) => {
  // @ts-ignore
  i18n.global.locale.value = state.activeLang
})
