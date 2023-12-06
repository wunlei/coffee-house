const DATA_URL = "../assets/data/products.json";
const categories = [];
let currCategory = "Coffee";
let data = null;
let products = [];
let isMobile = false;
let itemsCount = 8;
let badges = [];

async function fetchData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response;
    })
    .then((response) => response.json());
}

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

function addCategories(data) {
  const categories = [];

  data.forEach((element) => {
    if (!categories.includes(element.category)) {
      categories.push(element.category);
    }
  });

  addBadges(categories);
}

function createBadge(name, container) {
  const badge = createElement(
    "button",
    ["nav-category__badge", "button", "badge"],
    "",
    container
  );

  badge.dataset.type = name;

  const icon = createElement("span", ["badge__icon"], "", badge);
  const img = createElement("img", [], "", icon);
  img.src = `../assets/icons/${name.toLowerCase()}-badge.svg`;

  img.alt = name;

  const text = createElement("span", [], name, badge);

  return badge;
}

function addBadges(list) {
  const container = document.querySelector(".nav-category");

  list.forEach((el) => {
    const badge = {
      name: el,
      element: createBadge(el, container),
    };

    badges.push(badge);
  });
}

function addProducts(data) {
  const grid = document.querySelector(".menu__products");

  let products = data;

  if (grid) {
    grid.replaceChildren();
    products = products.slice(0, itemsCount);
  }
  products.forEach((el, index) => {
    const card = createElement("div", ["card-product"], "", grid);

    card.onclick = () => {
      createModal(el.name);
    };
    const imgWrapper = createElement(
      "div",
      ["card-product__img-wrapper"],
      "",
      card
    );

    const img = createElement("img", ["card-product__img"], "", imgWrapper);
    img.src = `../assets/pictures/menu/${el.name}.jpg`;
    img.alt = `${el.name}`;
    const content = createElement("div", ["card-product__content"], "", card);
    const contentWrapper = createElement("div", [], "", content);
    createElement(
      "h3",
      ["card-product__title", "heading", "heading-3"],
      el.name,
      contentWrapper
    );

    createElement(
      "p",
      ["card-product__des", "text-medium"],
      el.description,
      contentWrapper
    );
    createElement(
      "p",
      ["card-product__price", "heading-3"],
      "$" + el.price,
      content
    );
  });
}

function createOptionsElement(title, options, parent) {
  const container = createElement("div", ["options-container"], "", parent);
  const p = createElement("p", ["options__title", "medium"], title, container);
  const badgesContainer = createElement(
    "div",
    ["options-badges-container"],
    "",
    container
  );

  const badges = [];

  options.forEach((el) => {
    const badge = createOptionsBadge(el.text, el.icon, badgesContainer);
    badges.push({
      price: Number(el.price),
      element: badge,
    });

    if (title === "Size") {
      badges[0].element.classList.add("options-badge_active");

      badge.onclick = (e) => {
        const target = e.currentTarget;
        if (target) {
          badges.forEach((el) => {
            if (el.element === target) {
              target.classList.add("options-badge_active");
            } else {
              if (el.element.classList.contains("options-badge_active")) {
                el.element.classList.remove("options-badge_active");
              }
            }
          });
        }
      };
    } else if (title === "Additives") {
      badge.onclick = (e) => {
        const target = e.currentTarget;
        if (target) {
          badges.forEach((el) => {
            if (el.element === target) {
              if (el.element.classList.contains("options-badge_active")) {
                el.element.classList.remove("options-badge_active");
              } else {
                target.classList.add("options-badge_active");
              }
            }
          });
        }
      };
    }
  });

  function createOptionsBadge(text, icon, parent) {
    const badge = createElement(
      "button",
      ["options-badge", "button", "options-badge"],
      "",
      parent
    );

    const badgeIcon = createElement(
      "span",
      ["options-badge__icon"],
      icon,
      badge
    );
    const badgeText = createElement("span", [], text, badge);

    return badge;
  }
}

async function setupMenu() {
  data = await fetchData(DATA_URL);
  if (data) {
    addCategories(data);
    if (products) {
      addProducts(products, true);
    }
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

document.addEventListener("DOMContentLoaded", setupBurgerMenu);
