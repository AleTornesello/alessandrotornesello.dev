const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Types each word into `el`, holds it, erases it and moves to the next one,
 * forever. With reduced motion it just shows the last word.
 */
export async function typewriter(el, { words, delay = 80, hold = 1600 }) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = words.at(-1);
    return;
  }

  for (let i = 0; ; i = (i + 1) % words.length) {
    const word = words[i];

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
