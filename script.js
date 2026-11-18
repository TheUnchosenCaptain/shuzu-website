const year = document.querySelector("#year");
year.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(".reveal");
const tagline = document.querySelector("[data-reveal-words]");

tagline.innerHTML = tagline.innerHTML
  .split(/(<br>|\s+)/)
  .map((part) => part === "<br>" || !part.trim() ? part : `<span>${part}</span>`)
  .join("");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.18 });

revealTargets.forEach((target) => observer.observe(target));

const wordObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    wordObserver.unobserve(entry.target);
  });
}, { rootMargin: "0px 0px -18%", threshold: 1 });

document.querySelectorAll("[data-reveal-words] span").forEach((word, index) => {
  word.style.transitionDelay = `${index * 65}ms`;
  wordObserver.observe(word);
});
