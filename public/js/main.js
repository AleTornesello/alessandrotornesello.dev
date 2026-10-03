import { initI18n, initLanguageToggle } from "./modules/i18n.js";
import { typewriter } from "./modules/typewriter.js";
import { initScrollspy } from "./modules/scrollspy.js";
import { initThemeToggle } from "./modules/theme.js";

// Translate first: the other modules read translated text and attributes.
initI18n();

for (const el of document.querySelectorAll("[data-current-year]")) {
  el.textContent = new Date().getFullYear();
}

const typed = document.querySelector(".typewriter");
if (typed) {
  typewriter(typed, { delay: Number(typed.dataset.delay) || 80 });
}

const nav = document.querySelector(".navigation-bar");
if (nav) {
  initScrollspy(nav);
}

const languageToggle = document.querySelector(".language-toggle");
if (languageToggle) {
  initLanguageToggle(languageToggle);
}

const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
  initThemeToggle(themeToggle);
}
