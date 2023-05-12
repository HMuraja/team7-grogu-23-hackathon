// reviel sections
const allSections = document.querySelectorAll(".section");
const revealElements = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  });
};
const sectionsObserver = new IntersectionObserver(revealElements, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((sec) => {
  sec.classList.add("section-hidden");
  sectionsObserver.observe(sec);
});
// Preloader fade out
const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  loader.classList.add("loader-hidden");
});