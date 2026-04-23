// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import matomo from "astro-matomo";

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale: "en",
		locales: ["en", "nl"],
		routing: {
			prefixDefaultLocale: true,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		matomo({
			enabled: true,
			host: "https://adam-vromman.be/analytics/",
			siteId: 1,
			heartBeatTimer: 5,
			disableCookies: true,
			debug: false,
			viewTransition: true,
		}),
	],
});
