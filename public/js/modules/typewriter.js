const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Types each word of `el.dataset.words` (comma separated) into `el`, holds it,
 * erases it and moves to the next one, forever. The list is re-read for every
 * word, so changing the attribute (e.g. on a language switch) takes effect on
 * the next word. With reduced motion it just shows the last word.
 */
export async function typewriter(el, { delay = 80, hold = 1600 } = {}) {
  const words = () => el.dataset.words.split(",");

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const showLast = () => (el.textContent = words().at(-1));
    showLast();
    document.addEventListener("i18n:change", showLast);
    return;
  }

  for (let i = 0; ; i++) {
    const list = words();
    const word = list[i % list.length];

    for (let n = 1; n <= word.length; n++) {
      el.textContent = word.slice(0, n);
      await sleep(delay);
    }
    await sleep(hold);

    for (let n = word.length - 1; n >= 0; n--) {
      el.textContent = word.slice(0, n);
      await sleep(delay / 2);
    }
    await sleep(delay * 4);
  }
}
