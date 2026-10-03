import { typewriter } from "./modules/typewriter.js";
import { initScrollspy } from "./modules/scrollspy.js";
import { initThemeToggle } from "./modules/theme.js";

for (const el of document.querySelectorAll("[data-current-year]")) {
  el.textContent = new Date().getFullYear();
}

const typed = document.querySelector(".typewriter");
if (typed) {
  typewriter(typed, {
    words: typed.dataset.words.split(","),
    delay: Number(typed.dataset.delay) || 80,
  });
}

const nav = document.querySelector(".navigation-bar");
if (nav) {
  initScrollspy(nav);
}

const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
  initThemeToggle(themeToggle);
}
