function setupBurgerMenu() {
  const burgerMenu = document.querySelector(".header-nav");
  const burgerBtn = document.querySelector(".header__burger-menu-btn");
  const body = document.querySelector(".body");

  if (burgerBtn && burgerMenu && body) {
    burgerBtn.addEventListener("click", () => {
      burgerBtn.classList.toggle("header__burger-menu-btn_active");
      burgerMenu.classList.toggle("header-nav_burger-active");
      body.classList.toggle("body_no-scroll");
    });

    const links = document.querySelectorAll(".header-nav__link");
    const menuBtn = document.querySelector(".header__btn-menu");
    const navLinks = [menuBtn, ...links];
    navLinks.forEach((el) => {
      if (el) {
        el.addEventListener("click", () => {
          burgerBtn.classList.toggle("header__burger-menu-btn_active");
          burgerMenu.classList.toggle("header-nav_burger-active");
          body.classList.toggle("body_no-scroll");
        });
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", setupBurgerMenu);
