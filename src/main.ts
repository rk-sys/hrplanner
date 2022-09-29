import App from '@/App.vue'
import Router from './router/router'
import pl from './i18n/pl.json'
import en from './i18n/en.json'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia';
import { createApp } from 'vue'
import './style.css'

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        pl,
        en
    }
})

createApp(App)
    .use(createPinia())
    .use(Router)
    .use(i18n)
    .mount('#app')
