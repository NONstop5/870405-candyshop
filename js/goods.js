'use strict';

// Данные
var goodNames = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'];

var imgPaths = [
  'img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-eggplant.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg'
];

var rating = {
  'value': 1, // число — оценка: целое число от 1 до 5
  'number': 15 // число — количество оценок: целое число от 10 до 900
};

var contents = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var nutritionFacts = {
  'sugar': true, // булево значение — содержание сахара. Значение генерируется случайным образом
  'energy': 70, // число — энергетическая ценность: целое число от 70 до 500
  'generateContents': function () { // строка — состав: сгенерированная случайным образом строка. Для генерации состава нужно выбрать произвольное количество значений, перечисленных ниже и соединить их через запятую
    var contentsString = '';
    var contentsNumber = getRandomValue(5);
    if (contentsNumber === 0) {
      contentsNumber = 1;
    }
    for (var i = 0; i < contentsNumber; i++) {
      contentsString += contents[getRandomValue(contents.length)];
      if ((contentsNumber - i) > 1) {
        contentsString += ', ';
      }
    }
    return contentsString;
  }
};

// Функция генерации случайного числа
var getRandomValue = function (maxValue) {
  return Math.floor(Math.random() * maxValue);
};

// Функция создания нового элемента
var createNewElement = function (tagName, className, textContent) {
  var newElement = document.createElement(tagName);
  newElement.classList.add(className);
  newElement.textContent = textContent;

  return newElement;
};

// Функция создания массива товаров каталога
var createGoodsArray = function (dataSet) {
  var goods = [];

  for (var i = 0; i < dataSet.goodsNumber; i++) {
    goods[i] = {
      'name': dataSet.goodNames[getRandomValue(goodNames.length)], // строка — название. Произвольная строка из нижеперечисленных
      'picture': dataSet.imgPaths[getRandomValue(imgPaths.length)], // строка — адрес изображения для товара. Случайное значение из массива, содержащего
      'amount': 2, // число — количество, число от 0 до 20
      'price': 105, // число — стоимость, от 100 до 1500
      'weight': 30, // число — вес в граммах, от 30 до 300
      'rating': dataSet.rating, // объект — рейтинг: объект со следующими полями
      'nutritionFacts': dataSet.nutritionFacts // объект — состав: объект со следующими полями
    };
  }

  return goods;
};

// Функция скрывает текст о загрузке каталога товаров
var hideLoadText = function (catalogCards, catalogLoad) {
  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');
};

// Функция показывает текст в заголовкео пустой корзине товаров
var showBasketHeaderEmptyText = function (basketHeaderText) {
  basketHeaderText.textContent = 'В корзине ничего нет';
};

// Функция показывает текст о пустой корзине товаров
var showBasketEmptyText = function (basketGoodsCards) {
  basketGoodsCards.classList.add('goods__cards--empty');
  basketGoodsCards.firstElementChild.removeAttribute('style');
};

// Функция скрывает текст о пустой корзине товаров
var hideBasketEmptyText = function (basketGoodsCards) {
  basketGoodsCards.classList.remove('goods__cards--empty');
  basketGoodsCards.firstElementChild.style.display = 'none';
};

// Функция показывает итоговый блок в карзине товаров
var showBasketGoodsTotal = function (basketGoodsTotal) {
  basketGoodsTotal.classList.remove('visually-hidden');
};

// Функция скрывает итоговый блок в карзине товаров
var hideBasketGoodsTotal = function (basketGoodsTotal) {
  basketGoodsTotal.classList.add('visually-hidden');
};

// Функция возвращает класс для кнопки, в зависимости от количества товара
var getAmmountClass = function (goodObj) {
  var amountClass = 'card--soon';
  if (goodObj['amount'] > 5) {
    amountClass = 'card--in-stock';
  } else if (goodObj['amount'] >= 1 & goodObj['amount'] <= 5) {
    amountClass = 'card--little';
  }
  return amountClass;
};

// Функция устанавливает класс для rfhnjxrb товара в каталоге
var setAmountGoodClases = function (catalogGoodCard, goodId) {
  catalogGoodCard.classList.remove('card--soon');
  catalogGoodCard.classList.remove('card--little');
  catalogGoodCard.classList.remove('card--in-stock');
  catalogGoodCard.classList.add(getAmmountClass(goodsCatalog[goodId]));
};

// Функция клонирования карточки товара для каталога
var cloneCatalogGoodCardElement = function (elementData) {
  var goodCard = elementData.goodCatalogCardTemplate.cloneNode(true);
  var cardImgElem = goodCard.querySelector('.card__img');
  var cardPriceElement = goodCard.querySelector('.card__price');
  var cardPriceFragment = document.createDocumentFragment();
  var ratingValues = ['', 'stars__rating--one', 'stars__rating--two', 'stars__rating--three', 'stars__rating--four', 'stars__rating--five'];
  var starsRatingElem = goodCard.querySelector('.stars__rating');
  var withShugar = 'Содержит сахар';
  var withoutShugar = 'Без сахара';
  var shugarType = elementData.goodObj['nutritionFacts'].sugar ? withShugar : withoutShugar;

  // id
  goodCard.id = elementData.goodObj['id'];

  // amount
  goodCard.classList.remove('card--in-stock');
  goodCard.classList.add(getAmmountClass(elementData.goodObj));

  // name
  goodCard.querySelector('.card__title').textContent = elementData.goodObj['name'];

  // picture
  cardImgElem.src = elementData.goodObj['picture'];
  cardImgElem.alt = elementData.goodObj['name'];

  // price
  cardPriceElement.textContent = elementData.goodObj['price'] + ' ';

  cardPriceFragment.appendChild(createNewElement('span', 'card__currency', '₽'));
  cardPriceFragment.appendChild(createNewElement('span', 'card__weight', '/' + elementData.goodObj['weight'] + 'Г'));

  cardPriceElement.appendChild(cardPriceFragment);

  // rating
  starsRatingElem.classList.remove('stars__rating--five');
  starsRatingElem.classList.add(ratingValues[elementData.goodObj['rating'].value]);
  goodCard.querySelector('.star__count').textContent = elementData.goodObj['rating'].number;

  // nutritionFacts
  goodCard.querySelector('.card__characteristic').textContent = shugarType + '. ' + elementData.goodObj['nutritionFacts'].energy + ' ккал';
  goodCard.querySelector('.card__composition-list').textContent = elementData.goodObj['nutritionFacts'].generateContents();

  return goodCard;
};

// Функция клонирования карточки товара для корзины
var cloneBasketGoodCardElement = function (elementData) {

  var goodsCardsFragment = document.createDocumentFragment();
  var goodCard = elementData.goodBasketCardTemplate.cloneNode(true);
  var cardOrderImg = goodCard.querySelector('.card-order__img');

  // id
  goodCard.id = elementData.goodObj['id'];

  // name
  goodCard.querySelector('.card-order__title').textContent = elementData.goodObj['name'];

  // picture
  cardOrderImg.src = elementData.goodObj['picture'];
  cardOrderImg.alt = elementData.goodObj['name'];

  // price
  goodCard.querySelector('.card-order__price').textContent = elementData.goodObj['price'] + ' ₽';

  // amount
  goodCard.querySelector('.card-order__count').value = elementData.goodObj['orderedAmount'];

  goodsCardsFragment.appendChild(goodCard);
  elementData.basketElem.appendChild(goodsCardsFragment);
};

// Функция считает итоговые сумму и количество товаров в корзине
var calculateBasketAmount = function (basketGoodsCards) {
  var basketGoodsNumberText;
  var basketGoodsNumber = 0;
  var basketMoneyAmount = 0;
  var basketGoodsTotal = document.querySelector('.goods__total');
  var basketGoodsTotalText = basketGoodsTotal.querySelector('.goods__total-count');
  var basketHeaderText = document.querySelector('.main-header__basket');

  goodsBasket.forEach(function (goodObj) {
    basketGoodsNumber += goodObj.orderedAmount;
    basketMoneyAmount += goodObj.orderedAmount * goodObj.price;
  });

  if (basketGoodsNumber > 0) {
    basketGoodsNumberText = 'Итого за ' + basketGoodsNumber + ' товаров: ';
    basketGoodsTotalText.textContent = basketGoodsNumberText;
    basketGoodsTotalText.appendChild(createNewElement('span', 'goods__price', basketMoneyAmount + ' ₽'));

    basketHeaderText.textContent = basketGoodsNumberText;
    basketHeaderText.appendChild(createNewElement('span', 'goods__price', basketMoneyAmount + ' ₽'));
  } else {
    showBasketEmptyText(basketGoodsCards);
    showBasketHeaderEmptyText(basketHeaderText);
    hideBasketGoodsTotal(basketGoodsTotal);
  }
};

// Функция уменьшает количества товара в каталоге
var decreaseGoodCatalogAmount = function (goodId) {
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogGoodCard = catalogCards.children[goodId + 1];

  goodsCatalog[goodId]['amount']--;
  setAmountGoodClases(catalogGoodCard, goodId);
};

// Функция увеличивает количества товара в каталоге
var increaseGoodCatalogAmount = function (goodId) {
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogGoodCard = catalogCards.children[goodId + 1];

  goodsCatalog[goodId]['amount']++;
  setAmountGoodClases(catalogGoodCard, goodId);
};

// Функция восстанавливает количество товара в каталоге
var restoreGoodCatalogAmount = function (goodId) {
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogGoodCard = catalogCards.children[goodId + 1];

  for (var i = 0; i < goodsBasket.length; i++) {
    if (goodsBasket[i]['id'] === goodId) {
      goodsCatalog[goodId]['amount'] += goodsBasket[i]['orderedAmount'];
      setAmountGoodClases(catalogGoodCard, goodId);
      return;
    }
  }
};
// Функция уменьшает количества товара в корзине
var decreaseBasketGoodCount = function (basketGoodsCards, goodId) {
  // Проверяем количество товара в корзине
  for (var i = 0; i < goodsBasket.length; i++) {
    if (goodsBasket[i]['id'] === goodId) {
      goodsBasket[i]['orderedAmount']--;
      increaseGoodCatalogAmount(goodId);
      if (goodsBasket[i]['orderedAmount'] > 0) {
        var goodOrderCount = basketGoodsCards.children[i + 1].querySelector('.card-order__count');
        goodOrderCount.value = goodsBasket[i]['orderedAmount'];
        calculateBasketAmount(basketGoodsCards);
        return;
      } else {
        removeGoodFromBasket(goodId);
        calculateBasketAmount(basketGoodsCards);
        return;
      }
    }
  }
};

// Функция увеличивает количества товара в корзине
var increaseBasketGoodCount = function (basketGoodsCards, goodId) {
  var goodOrderCount;
  // Проверяем наличие товара
  if (goodsCatalog[goodId]['amount'] === 0) {
    return;
  }
  for (var i = 0; i < goodsBasket.length; i++) {
    if (goodsBasket[i]['id'] === goodId) {
      goodsBasket[i]['orderedAmount']++;
      goodOrderCount = basketGoodsCards.children[i + 1].querySelector('.card-order__count');
      goodOrderCount.value = goodsBasket[i]['orderedAmount'];
      decreaseGoodCatalogAmount(goodId);
      calculateBasketAmount(basketGoodsCards);
      return;
    }
  }
};

// Функция удаления товара из карзины
var removeGoodFromBasket = function (goodId) {
  var basket = document.querySelector('.goods__cards');

  for (var i = 0; i < goodsBasket.length; i++) {
    if (goodsBasket[i]['id'] === goodId) {
      basket.removeChild(basket.children[i + 1]);
      goodsBasket.splice(i, 1);
      return;
    }
  }
};

// Функция добавления товара в карзину
var addGoodToBasket = function (goodId) {
  var basketGoodsCards = document.querySelector('.goods__cards');
  var basketGoodsTotal = document.querySelector('.goods__total');
  var goodBasketCardTemplate = document.querySelector('#card-order').content.querySelector('article');
  var newGoodObjForBasket = Object.assign({}, goodsCatalog[goodId], {orderedAmount: 0});

  // Проверяем есть ли уже в корзине такой товар
  if (goodsBasket.length > 0) {
    for (var i = 0; i < goodsBasket.length; i++) {
      if (goodsBasket[i]['id'] === goodId) {
        increaseBasketGoodCount(basketGoodsCards, goodId);
        return;
      }
    }
  }

  delete newGoodObjForBasket.amount;
  goodsBasket.push(newGoodObjForBasket);

  hideBasketEmptyText(basketGoodsCards);

  showBasketGoodsTotal(basketGoodsTotal);

  cloneBasketGoodCardElement({
    goodBasketCardTemplate: goodBasketCardTemplate,
    basketElem: basketGoodsCards,
    goodObj: newGoodObjForBasket
  });

  increaseBasketGoodCount(basketGoodsCards, goodId);
};

// Навешиваем события на каталог товаров
var addGoodCatalogEvents = function (catalogCards) {
  catalogCards.addEventListener('click', function (evt) {
    var catalogGoodCard = evt.target.parentElement.parentElement.parentElement;
    var goodId = parseInt(catalogGoodCard.id, 10);

    // Добавление товара в избранное
    if (evt.target.className === 'card__btn-favorite' || evt.target.className === 'card__btn-favorite card__btn-favorite--selected') {
      evt.target.classList.toggle('card__btn-favorite--selected');
    }

    // Добавление товара в корзину
    if (evt.target.className === 'card__btn') {

      // Проверяем наличие товара
      if (goodsCatalog[goodId]['amount'] === 0) {
        return;
      }

      addGoodToBasket(goodId);
    }
  });
};

// Навешиваем события на карзину товаров
var addBasketEvents = function (basketGoodsCards) {
  basketGoodsCards.addEventListener('click', function (evt) {
    var basketGoodsCard = evt.target.parentElement.parentElement.parentElement;
    var goodId = parseInt(basketGoodsCard.id, 10);

    // Уменьшаем количества товара в корзине
    if (evt.target.className === 'card-order__btn card-order__btn--decrease') {
      decreaseBasketGoodCount(basketGoodsCards, goodId);
    }

    // Увеличиваем количества товара в корзине
    if (evt.target.className === 'card-order__btn card-order__btn--increase') {
      increaseBasketGoodCount(basketGoodsCards, goodId);
    }

    // Удаляем товар из корзины и увеличиваем остаток в каталоге
    if (evt.target.className === 'card-order__close') {
      basketGoodsCard = evt.target.parentElement;
      goodId = parseInt(basketGoodsCard.id, 10);

      restoreGoodCatalogAmount(goodId);
      removeGoodFromBasket(goodId);
      calculateBasketAmount(basketGoodsCards);
    }
  });
};

// Функция заполнения каталога товаров
var fillGoodsCatalog = function (catalogCards) {
  var catalogLoad = document.querySelector('.catalog__load');
  var goodCatalogCardTemplate = document.querySelector('#card').content.querySelector('article');
  var goodsCardsFragment = document.createDocumentFragment();

  hideLoadText(catalogCards, catalogLoad);

  goodsCatalog.forEach(function (goodObj, i) {
    goodObj['id'] = i;
    var elementData = cloneCatalogGoodCardElement({
      goodCatalogCardTemplate: goodCatalogCardTemplate,
      goodObj: goodObj,
    });
    goodsCardsFragment.appendChild(elementData);
  });

  catalogCards.appendChild(goodsCardsFragment);
};

// Функция основных действий
var main = function () {
  var catalogCards = document.querySelector('.catalog__cards');
  var basketGoodsCards = document.querySelector('.goods__cards');

  fillGoodsCatalog(catalogCards);

  addGoodCatalogEvents(catalogCards);

  addBasketEvents(basketGoodsCards);
};

var goodsCatalog = createGoodsArray({
  goodsNumber: 3,
  goodNames: goodNames,
  imgPaths: imgPaths,
  rating: rating,
  nutritionFacts: nutritionFacts
});

var goodsBasket = [];

main();

