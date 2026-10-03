/*
 * Internationalization.
 *
 * The HTML is written in English. Elements carry translation keys:
 *   data-i18n="key"             -> text content (the element must contain only text)
 *   data-i18n-<attribute>="key" -> that attribute, e.g. data-i18n-aria-label
 * Other languages are dictionaries over the same keys (js/i18n/<lang>.js).
 * Month-year <time datetime="YYYY-MM"> elements are formatted with Intl.
 *
 * The inline script in <head> picks the language before the first paint
 * (saved choice, else browser languages, else English) and sets <html lang>;
 * this module translates the page to it and handles switching.
 */
import en from "../i18n/en.js";
import it from "../i18n/it.js";

const DICTIONARIES = { en, it };
const LANGUAGE_NAMES = {
  en: { code: "EN", switchLabel: "Switch to English" },
  it: { code: "IT", switchLabel: "Passa all'italiano" },
};
const ATTRIBUTES = ["aria-label", "alt", "content", "data-words"];
const STORAGE_KEY = "lang";

const root = document.documentElement;
const english = new Map(); // key -> English text, read from the HTML
let current = root.lang in DICTIONARIES ? root.lang : "en";

export const getLanguage = () => current;

export function t(key) {
  return DICTIONARIES[current][key] ?? english.get(key) ?? en[key] ?? key;
}

const keyedElements = (attribute) => document.querySelectorAll(`[data-i18n${attribute ? `-${attribute}` : ""}]`);

function readEnglish() {
  for (const el of keyedElements()) english.set(el.dataset.i18n, el.textContent);
  for (const attribute of ATTRIBUTES) {
    for (const el of keyedElements(attribute)) {
      english.set(el.getAttribute(`data-i18n-${attribute}`), el.getAttribute(attribute));
    }
  }
}

// House style for abbreviated months: "Jun 2020" in English, "Giu. 2020" in Italian.
const MONTH_SUFFIX = { it: "." };

function formatDates() {
  const format = new Intl.DateTimeFormat(current, { month: "short", year: "numeric" });
  for (const el of document.querySelectorAll("time[datetime]")) {
    const [year, month] = el.getAttribute("datetime").split("-").map(Number);
    if (!year || !month) continue;
    el.textContent = format
      .formatToParts(new Date(year, month - 1))
      .map(({ type, value }) => {
        if (type !== "month") return value;
        const name = value.replace(".", "");
        return name.charAt(0).toUpperCase() + name.slice(1) + (MONTH_SUFFIX[current] ?? "");
      })
      .join("");
  }
}

function translatePage() {
  root.lang = current;
  for (const el of keyedElements()) el.textContent = t(el.dataset.i18n);
  for (const attribute of ATTRIBUTES) {
    for (const el of keyedElements(attribute)) {
      el.setAttribute(attribute, t(el.getAttribute(`data-i18n-${attribute}`)));
    }
  }
  formatDates();
  document.dispatchEvent(new CustomEvent("i18n:change", { detail: { lang: current } }));
}

export function setLanguage(lang) {
  if (!(lang in DICTIONARIES) || lang === current) return;
  current = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage unavailable: the choice lasts until the page is reloaded.
  }
  translatePage();
}

export function initI18n() {
  readEnglish();
  translatePage();
  delete root.dataset.i18nPending;
}

/** A button that switches between the two languages. */
export function initLanguageToggle(button) {
  const render = () => {
    const other = current === "it" ? "en" : "it";
    // Labelled in the language it switches to, so it is understandable either way.
    button.textContent = LANGUAGE_NAMES[other].code;
    button.lang = other;
    button.setAttribute("aria-label", LANGUAGE_NAMES[other].switchLabel);
  };

  button.addEventListener("click", () => setLanguage(current === "it" ? "en" : "it"));
  document.addEventListener("i18n:change", render);
  button.hidden = false;
  render();
}
