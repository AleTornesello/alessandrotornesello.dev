/**
 * Marks the navigation link of the section currently in view with
 * aria-current="location", and exposes that section's accent color to the
 * nav as --active-accent.
 *
 * A section counts as "in view" when it crosses a thin band just above the
 * middle of the viewport.
 */
export function initScrollspy(nav) {
  const list = nav.querySelector("ul");
  const links = new Map(
    [...nav.querySelectorAll('a[href^="#"]')].map((a) => [a.hash.slice(1), a]),
  );
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const setActive = (id) => {
    for (const [key, link] of links) {
      if (key === id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    }

    const link = links.get(id);
    if (!link) return;

    const section = document.getElementById(id);
    nav.style.setProperty("--active-accent", getComputedStyle(section).getPropertyValue("--accent"));

    // On narrow screens the list scrolls sideways: keep the active link centered.
    if (list.scrollWidth > list.clientWidth) {
      const listRect = list.getBoundingClientRect();
      const itemRect = link.getBoundingClientRect();
      list.scrollTo({
        left: list.scrollLeft + itemRect.left - listRect.left - (listRect.width - itemRect.width) / 2,
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id || null);
      }
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  for (const id of links.keys()) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }

  // Back at the top, no section is active.
  const hero = document.querySelector(".hero");
  if (hero) observer.observe(hero);
}
