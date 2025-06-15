import { defineStore } from "pinia";
import { computed } from "vue";

// Carga dinámica de todos los archivos de idioma
// @ts-ignore: Vite import.meta.globEager
const modules = import.meta.glob("../lib/locales/*.json", { eager: true });

const translations: Record<string, any> = {};
Object.entries(modules).forEach(([path, mod]: any) => {
	const code = path.match(/([a-zA-Z0-9_-]+)\.json$/)?.[1] || '';
	translations[code] = mod.default;
});

// Obtener el idioma guardado o por defecto 'en'
const savedLanguage = localStorage.getItem("selectedLanguage") || "en";

export const useLanguageStore = defineStore("language", {
	state: () => ({
		CurrentLanguage: savedLanguage,
	}),
	getters: {
		getTranslation: (state) => {
			return computed(() => {
				return (key: string) => {
					const keys = key.split(".");
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
		availableLanguages: () => {
			return Object.entries(translations)
				.map(([code, data]) => ({
					code,
					name: data?.language?.name || code,
				}))
				.sort((a, b) => a.name.localeCompare(b.name));
		},
	},

	actions: {
		setCurrentLanguage(language: string) {
			this.CurrentLanguage = language;
			localStorage.setItem("selectedLanguage", language);
		},
	},
});
