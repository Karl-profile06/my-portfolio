const navLinks = document.querySelectorAll(".navbar a");
const sections = [...navLinks].map(link => document.querySelector(link.getAttribute("href")));

let manualClick = false;

// Highlight active nav link based on scroll position
function updateActiveLink() {
  if (manualClick) return; // Skip update if user clicked manually

  let index = sections.length;
  while (--index && window.scrollY + 120 < sections[index].offsetTop) {}
  navLinks.forEach(link => link.classList.remove("active"));
  if (navLinks[index]) {
    navLinks[index].classList.add("active");
  }
}
window.addEventListener("scroll", updateActiveLink);

// Smooth scroll for nav links and immediate underline
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    // Set manual flag to true and remove after delay
    manualClick = true;
    setTimeout(() => manualClick = false, 1000);

    // Instantly update active class
    navLinks.forEach(link => link.classList.remove("active"));
    link.classList.add("active");

    const id = link.getAttribute("href").substring(1);
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  });
});

// Fade-in animation on scroll
const faders = document.querySelectorAll("section");

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(section => {
  section.classList.add("fade-in");
  appearOnScroll.observe(section);
});