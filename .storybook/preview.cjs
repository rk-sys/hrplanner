import { app } from '@storybook/vue3'
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import messages from '../src/i18n/en.json';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

const pinia = createPinia();

app.use(pinia).use(i18n)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
