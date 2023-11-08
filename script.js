// Подопытные данные
const products = [
  {
    name: "Ball",
    category: "Sport",
    img: "./assets/ball.jpeg",
    price: 100,
    description: "Just the simple ball",
  },
  {
    name: "Gloves",
    category: "Sport",
    img: "./assets/gloves.jpg",
    price: 140,
    description: "Tactical gloves",
  },
  {
    name: "Sport shoes",
    category: "Sport",
    discount: true,
    img: "./assets/shoes.png",
    price: 320,
    description: "Sport shoes. The best choice for running",
  },
  {
    name: "Hammer",
    category: "Tools",
    img: "./assets/hammer.jpeg",
    price: 40,
    description: "The best way to convince somebody that you are right.",
  },
  {
    name: "Saw",
    category: "Tools",
    discount: true,
    img: "./assets/saw.jpeg",
    price: 75,
    description:
      "This will help you in case the hammer could not convince your companion",
  },
  {
    name: "Shark toy",
    category: "Other",
    img: "./assets/shark.jpeg",
    price: 45,
    description: "From IKEA with love",
  },
  {
    name: "Truck",
    category: "Other",
    img: "./assets/truck.jpeg",
    price: 80,
    description: "Truck. Nothing more.",
  },
];

//  Верстаем форму для добавления нового товара. Она должна иметь 4 поля ввода: для названия, цены, категории и описания товара,
// и кнопку "Добавить товар". Делаем это в разметке (HTML). Инпутам дать соответствующие placeholder-ы.
// Все инпуты должны быть `required` (обязательные к заполнению). Тип всех инпутов - текст.
// Обязательно всем инпутам прописать атрибут `name` (productName, productPrice, productCategory, productDescription).
// Форме рекомендуется дать id="newProductForm".

// 2. Пишем в JS функцию `fillProfuctForm` - она примет объект с данными товара, и должна заполнить данные формы.

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productDescription = document.getElementById("productDescription");
const addNewProduct = document.getElementById("addNewProduct");
const newProductForm = document.getElementById("newProductForm");


function cleanProductForm() {
  productName.value = ""; //product.name;
  productPrice.value = ""; //product.price;
  productCategory.value = "";  //product.category;
  productDescription.value = ""; //product.description;
}


// 3. Пристрелочная задача на добавление DOM-элементов средствами JS. Добавить в форму кнопку "Отмена".
const buttonCancel = document.createElement("button");
buttonCancel.innerText = "Cancel";
newProductForm.append(buttonCancel);
buttonCancel.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("buttonCancel was cklicked");
  cleanProductForm();
});

// 4. Работаем с карточками товаров. Массив `products` содержит данные о товарах. Нужно научиться рендерить карточки товаров.
// Первая задача - делаем функцию отрисовки карточки товара `renderProduct`. Она принимает в аргументе объект с данными товара.
//  - сама карточка - это `div` (контейнер), он должен иметь класс `productCard`
//  - карточка содержит название товара, картинку товара, цену, категорию и описание. Название - `h3` с классом `productTitle`,
//  цена - параграф с классом `productPrice`,
// категория - параграф с классом `productCategory`, картинка - изображение с классом `productImg`,
// и описание - параграф с классом `productDescription`. Изображению нужно проставить атрибут `src`, если у объекта с данными товара существует свойство `img`.
//  - функция должна создать и вернуть DOM-узел, но НЕ встраивать его в DOM.

const container = document.querySelector(".productsContainer");

function renderProduct(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("productCard");

  const productTitle = document.createElement("h3");
  productTitle.classList.add("productTitle");
  productTitle.textContent = product.name;

  const productPrice = document.createElement("p");
  productPrice.classList.add("productPrice");
  productPrice.textContent = product.price;

  const productCategory = document.createElement("p");
  productCategory.classList.add("productCategory");
  productCategory.textContent = product.category;

  const productImg = document.createElement("img");
  productImg.classList.add("productImg");

  productImg.src =
    product.img !== undefined ? product.img : "./assets/no_img.jpg";
  productImg.alt = product.name;

  const productDescription = document.createElement("p");
  productDescription.classList.add("productDescription");
  productDescription.textContent = product.description;

  const buttonDelete = document.createElement("button");
  buttonDelete.innerText = "Delete product";
  buttonDelete.addEventListener("click", (event) => {
    event.preventDefault();
    productCard.remove();
  });

  productCard.append(
    productTitle,
    productPrice,
    productCategory,
    productImg,
    productDescription,
    buttonDelete
  );

  return productCard;
}

// 5. Теперь напишем функцию отрисовки списка товаров `renderProductList`. Она должна принять массив товаров, и отрисовать эти товары в `div.productContainer`.
//  То есть, здесь нам придется вспомнить методы массивов. Нужно пройтись по массиву, и для каждого элемента создать DOM-элемент (карточку товара)
// и добавить в контейнер `div.productContainer`

function renderProductList(products) {
  products.forEach((product) => {
    // const productElement = renderProduct(product);
    // container.append(productElement);
    container.append(renderProduct(product));
  });
}
renderProductList(products);


// 6. Добавляем немного интерактива. Нужно чтобы при клике на карточку, к ней применялся класс `productCardHighlighted`.
// А при повторном клике - этот класс должен быть удален с карточки.
const productCards = document.querySelectorAll(".productCard");
function toggleCards(productCard) {
  productCard.addEventListener("click", () => {
    productCard.classList.toggle("productCardHighlighted");
  });
}
productCards.forEach((productCard) => toggleCards(productCard));

// 7. Теперь работаем с удалением элементов из DOM. Добавим в функцию `renderProduct` код, чтобы он добавил в нашу карточку
// (под описанием товара), кнопку "Удалить товар". И нужно, чтобы при клике на эту кнопку, карточка удалялась из DOM-дерева.

// Сделано на строке 129!!!!!

// 8. И теперь объединим все вместе. Добавим обработчик на кнопку в форме `#newProductForm`. Нужно, чтобы при клике на эту кнопку,
// мы создавали бы новый объект товара, добавляли бы этот объект в массив `products`, и вызывали бы функцию отрисовки массива товаров.
// Возможно, в саму функцию тоже понадобится внести какие-то изменения (например, что-то очистить...).

addNewProduct.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("addNewProduct clicked");
  const newProduct = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };

  products.push(newProduct);
  // Очистка контейнера перед вызовом renderProductList
  container.innerHTML = "";
  renderProductList(products);
  // Очистка формы
  cleanProductForm();
});

