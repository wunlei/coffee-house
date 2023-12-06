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

  updateCategory(categories[0]);
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

    badge.element.onclick = (event) => {
      const badge = event.currentTarget;
      if (badge instanceof HTMLElement) {
        if (badge.dataset.type) updateCategory(badge.dataset.type);
      }
    };

    badges.push(badge);
  });
}

function updateCategory(category) {
  currCategory = category;

  if (isMobile) {
    itemsCount = 4;
  } else {
    itemsCount = 8;
  }

  if (data) products = data.filter((el) => el.category === currCategory);

  badges.forEach((el) => {
    if (el.name === currCategory) {
      el.element.classList.add("nav-category__badge_active");
    } else {
      el.element.classList.remove("nav-category__badge_active");
    }
  });

  updateRefreshBtn();

  addProducts(products, true);

  /* add active class to btn */
}

function addProducts(data, updateCategory) {
  const grid = document.querySelector(".menu__products");

  let products = data;

  if (grid && updateCategory) {
    grid.replaceChildren();
    products = products.slice(0, itemsCount);
  }
  products.forEach((el, index) => {
    const card = createElement("div", ["card-product"], "", grid);

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

function createOptionsElement(title, options, parent, updateTotalPrice) {
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
              updateTotalPrice(el.price);
            } else {
              if (el.element.classList.contains("options-badge_active")) {
                updateTotalPrice(-el.price);
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
                updateTotalPrice(-el.price);
              } else {
                target.classList.add("options-badge_active");
                updateTotalPrice(el.price);
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

function updateProductsCount() {
  const cards = document.querySelectorAll(".card-product");
  if (cards.length < itemsCount) {
    // pd.l = 4 < 8 => 0 - 3
    if (products) {
      const data = [...products].slice(cards.length, itemsCount + 1);
      addProducts(data, false);
    }
  } else {
    cards.forEach((el, i) => {
      if (i >= itemsCount) {
        el.remove();
      }
    });
  }

  updateRefreshBtn();
}

function setupRefreshBtn() {
  const refreshBtn = document.querySelector(".btn-products-refresh");

  if (refreshBtn) {
    refreshBtn.onclick = () => {
      if (itemsCount + 4 < products.length) {
        itemsCount += 4;
      } else {
        itemsCount = products.length;
        refreshBtn.classList.add("hidden");
      }

      updateProductsCount();
    };

    if (itemsCount === products.length) {
      refreshBtn.classList.add("hidden");
    }
  }
}

function updateRefreshBtn() {
  const refreshBtn = document.querySelector(".btn-products-refresh");
  if (refreshBtn) {
    if (itemsCount === products.length) {
      refreshBtn.classList.add("hidden");
    } else {
      refreshBtn.classList.remove("hidden");
    }
  }
}

function setupResizeObserver() {
  const body = document.querySelector(".body");
  const resizeObserver = new ResizeObserver((entries) => {
    let mql = window.matchMedia("(max-width: 768px)");
    if (mql.matches) {
      if (!isMobile) {
        isMobile = true;
        itemsCount = 4;
        updateProductsCount();
      }
    } else {
      if (isMobile) {
        isMobile = false;
        itemsCount = 8;
        updateProductsCount();
      }
    }
  });

  if (body) {
    resizeObserver.observe(body, { box: "border-box" });
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
  setupResizeObserver();
  setupRefreshBtn();
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

document.addEventListener("DOMContentLoaded", setupMenu);

document.addEventListener("DOMContentLoaded", setupBurgerMenu);
