import { defineStore } from 'pinia';
import { RootStore } from './global.types';

export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        lang: 'pl',
        token: ''
    } as RootStore),
    getters: {
        //Getters are just computed so we can not passed any params to them
        getLang: (state: RootStore): String => state.lang,
    },
    actions: {
        changeLanguage(payload: string) {
            this.lang = payload
        },
        setToken(payload: string): void {
            document.cookie = `hrpToken=${payload}; max-age=3600;`;
            this.token = payload;
        },
        setTokenFromCookie(): void {
            if (this.token === '') {
                const cookiesToken = document.cookie.replace('hrpToken=', '')
                if (cookiesToken !== '') {
                    this.token = cookiesToken;
                }
            }
        }
    },
});
