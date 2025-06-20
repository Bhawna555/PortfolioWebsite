document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((btn) => btn.classList.remove("active-tab"));
    document
      .querySelectorAll(".tab-content")
      .forEach((tab) => tab.classList.add("hidden"));
    button.classList.add("active-tab");
    document.getElementById(button.dataset.target).classList.remove("hidden");
  });
});
const scrollBtn = document.getElementById("scrollTopBtn");
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});
scrollBtn.style.display = "none";
const toggleBtn = document.getElementById("mobileMenuToggle");
const drawer = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeMenu");

toggleBtn.addEventListener("click", () => {
  drawer.classList.remove("-translate-x-full");
  drawer.setAttribute("aria-hidden", "false");
});

closeBtn.addEventListener("click", () => {
  drawer.classList.add("-translate-x-full");
  drawer.setAttribute("aria-hidden", "true");
});

window.addEventListener("click", (e) => {
  if (!drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
    drawer.classList.add("-translate-x-full");
    drawer.setAttribute("aria-hidden", "true");
  }
});

const carousel = document.getElementById("carousel");
const slides = carousel.children.length;
const slideWidth = carousel.firstElementChild.offsetWidth;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentIndex = 0;

function updateCarousel() {
  carousel.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  prevBtn.style.display = currentIndex > 0 ? "block" : "none";
  nextBtn.style.display = currentIndex < slides - 1 ? "block" : "none";
}

nextBtn.onclick = () => {
  if (currentIndex < slides - 1) {
    currentIndex++;
    updateCarousel();
  }
};

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
};
updateCarousel();
window.addEventListener("resize", () => {
  carousel.style.transition = "none";
  carousel.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  setTimeout(() => {
    carousel.style.transition = "";
  }, 100);
});

document.querySelectorAll("#mobileMenu nav a[data-tab]").forEach((link) => {
  link.addEventListener("click", (e) => {
    const tabId = e.currentTarget.dataset.tab;
    const tabBtn = document.querySelector(`.tab-btn[data-target="${tabId}"]`);

    if (tabBtn) {
      tabBtn.click();
      setTimeout(() => {
        document.getElementById(tabId).scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
    document.getElementById("mobileMenu").classList.add("-translate-x-full");
  });
});
