document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".mobile-menu-open-btn");
  const closeBtn = document.querySelector(".mobile-menu-close-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  burgerBtn.addEventListener("click", () => {
    // console.log("Burger clicked");
    mobileMenu.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
      mobileMenu.classList.remove("active");
    }
  });
  const navLinks = document.querySelectorAll(".mobile-nav-list-item-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
});
