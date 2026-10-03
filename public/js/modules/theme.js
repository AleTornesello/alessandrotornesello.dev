/*
 * Light/dark toggle. Without a saved choice the page follows the OS setting;
 * a click saves the opposite of the current theme. An inline script in
 * <head> applies the saved choice before the first paint.
 */
const STORAGE_KEY = "theme";
const root = document.documentElement;
const prefersDark = matchMedia("(prefers-color-scheme: dark)");

const currentTheme = () => root.dataset.theme ?? (prefersDark.matches ? "dark" : "light");

export function initThemeToggle(button) {
  const icon = button.querySelector("i");

  const render = () => {
    const isDark = currentTheme() === "dark";
    button.setAttribute("aria-label", isDark ? "Passa al tema chiaro" : "Passa al tema scuro");
    icon.classList.toggle("fa-sun", isDark);
    icon.classList.toggle("fa-moon", !isDark);
  };

  button.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies): the choice
      // then lasts until the page is reloaded.
    }
    render();
  });

  prefersDark.addEventListener("change", render);
  button.hidden = false;
  render();
}
