const sliderData = [
  {
    index: 1,
    title: "S’mores Frappuccino",
    desc: "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "$5.50",
    img: "./assets/pictures/slider/coffee-slider-1.png",
  },
  {
    index: 2,
    title: "Caramel Macchiato",
    desc: "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "$5.50",
    img: "./assets/pictures/slider/coffee-slider-2.png",
  },
  {
    index: 3,
    title: "Ice coffee",
    desc: "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "$4.50",
    img: "./assets/pictures/slider/coffee-slider-3.png",
  },
];

const arrow = `<svg
class="btn-arrow__icon"
width="24"
height="24"
viewBox="0 0 24 24"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
</svg>`;

function createElement(
  tagName = "div",
  classNames = [],
  textContent = "",
  parentNode
) {
  const node = document.createElement(tagName);
  node.classList.add(...classNames);
  node.textContent = textContent;
  if (parentNode) {
    parentNode.append(node);
  }
  return node;
}

let activeSlideId = 0;

let navBtns = [];

function setupNav(parent) {
  const container = createElement(
    "div",
    ["slider-coffee-nav", "slider-nav"],
    "",
    parent
  );

  const btnClasses = ["slider-coffee-nav__btn", "slider-nav__btn"];

  for (let i = 0; i < 3; i++) {
    const btn = createElement("button", btnClasses, "", container);
    navBtns.push(btn);
  }

  // let requestId = requestAnimationFrame(callback)

  navBtns.forEach((el, ind) => {
    if (ind === activeSlideId) {
      el.classList.add("slider-nav__btn_active");
    } else {
      el.classList.remove("slider-nav__btn_active");
    }
  });
}

function setupSliderRow(parent) {
  const wrapper = createElement("div", ["slider-slides"], "", parent);
  const container = createElement("div", ["slider-row"], "", wrapper);

  const elements = [];

  sliderData.forEach((el) => {
    const sliderContainer = createElement(
      "div",
      ["slider-element"],
      "",
      container
    );
    const slide = createElement(
      "div",
      ["slider-coffee-container"],
      "",
      sliderContainer
    );

    const img = createElement(
      "img",
      ["slider-coffee__img", "img-drink"],
      "",
      slide
    );

    img.src = el.img;
    img.alt = el.title;
    img.draggable = false;

    const info = createElement(
      "div",
      ["slider-coffee__info", "coffee-info"],
      "",
      slide
    );

    const title = createElement(
      "h3",
      ["coffee-info__title", "drink-title", "heading-3", "heading"],
      el.title,
      info
    );

    const desc = createElement(
      "p",
      ["coffee-info__desc", "drink-desc", "text-medium"],
      el.desc,
      info
    );

    const price = createElement(
      "p",
      ["coffee-info__price", "drink-price", "heading-3"],
      el.price,
      info
    );

    elements.push(sliderContainer);
  });
}

function setupSlider() {
  const container = document.querySelector < HTMLElement > ".slider-coffee";

  if (container) {
    const wrapper = createElement(
      "div",
      ["slider-coffee-wrapper"],
      "",
      container
    );

    const arrowLeft = createElement(
      "button",
      ["slider-coffee__arrow", "btn-arrow", "btn-arrow_left"],
      "",
      wrapper
    );
    arrowLeft.innerHTML = arrow;

    arrowLeft.onclick = () => {
      changeSlide(-1);
    };

    setupSliderRow(wrapper);

    const arrowRight = createElement(
      "button",
      ["slider-coffee__arrow", "btn-arrow", "btn-arrow_right"],
      "",
      wrapper
    );
    arrowRight.innerHTML = arrow;

    arrowRight.onclick = () => {
      changeSlide(1);
    };

    setupNav(container);
  }
}

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

document.addEventListener("DOMContentLoaded", setupSlider);
document.addEventListener("DOMContentLoaded", setupBurgerMenu);
