import { defineStore } from "pinia";
import { computed } from "vue";
import enTranslations from "../lib/locales/en.json";
import esTranslations from "../lib/locales/es.json";

const Languages = {
	EN: "en",
	ES: "es",
} as const;

type Language = (typeof Languages)[keyof typeof Languages];

const translations = {
	[Languages.EN]: enTranslations,
	[Languages.ES]: esTranslations,
};

// Get saved language from localStorage or default to EN
const savedLanguage =
	(localStorage.getItem("selectedLanguage") as Language) || Languages.EN;

export const useLanguageStore = defineStore("language", {
	state: () => ({
		CurrentLanguage: savedLanguage,
	}),
	getters: {
		getTranslation: (state) => {
			return computed(() => {
				return (key: string) => {
					const keys = key.split(".");
					// Aquí indicamos que translation es un objeto con propiedades string
					let translation: Record<string, any> | undefined =
						translations[state.CurrentLanguage];

					for (const k of keys) {
						if (
							translation &&
							typeof translation === "object" &&
							k in translation
						) {
							translation = translation[k];
						} else {
							return key;
						}
					}

					return typeof translation === "string" ? translation : key;
				};
			}).value;
		},
	},

	actions: {
		setCurrentLanguage(language: Language) {
			this.CurrentLanguage = language;
			// Save the selected language to localStorage
			localStorage.setItem("selectedLanguage", language);
		},
	},
});
