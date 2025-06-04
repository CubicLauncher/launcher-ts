import { defineStore } from 'pinia'

const Languages = {
    EN: "en",
    ES: "es",
}

type Language = keyof typeof Languages;

export const useLanguageStore = defineStore('language', {
    state: () => ({
      CurrentLanguage: Languages.EN,
    }),
    actions: {
      setCurrentLanguage(language: Language) {
        this.CurrentLanguage = language
      }
    }
})