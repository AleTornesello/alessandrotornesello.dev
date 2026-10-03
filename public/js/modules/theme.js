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
  const icon = button.querySelector("use");

  const render = () => {
    const isDark = currentTheme() === "dark";
    button.setAttribute("aria-label", isDark ? "Passa al tema chiaro" : "Passa al tema scuro");
    // Swap the sprite symbol, keeping the sprite file path.
    const href = icon.getAttribute("href").replace(/#.*/, isDark ? "#sun" : "#moon");
    icon.setAttribute("href", href);

    // The browser UI color (e.g. the mobile address bar) follows an explicit
    // choice too; without one, the media-specific theme-color tags apply.
    if (root.dataset.theme) {
      const color = getComputedStyle(root).backgroundColor;
      for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
        meta.content = color;
      }
    }
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
