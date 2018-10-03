'use strict';

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
      'amount': 1, // число — количество, число от 0 до 20
      'price': 105, // число — стоимость, от 100 до 1500
      'weight': 30, // число — вес в граммах, от 30 до 300
      'rating': dataSet.rating, // объект — рейтинг: объект со следующими полями
      'nutritionFacts': dataSet.nutritionFacts // объект — состав: объект со следующими полями
    };
  }

  return goods;
};

// Функция клонирования карточки товара для каталога
var cloneCatalogGoodCardElement = function (goodCatalogCardTemplate, goodObj) {
  var goodCard = goodCatalogCardTemplate.cloneNode(true);
  var amountClass = 'card--soon';
  var cardImgElem = goodCard.querySelector('.card__img');
  var cardPriceElement = goodCard.querySelector('.card__price');
  var cardPriceFragment = document.createDocumentFragment();
  var ratingValues = ['', 'stars__rating--one', 'stars__rating--two', 'stars__rating--three', 'stars__rating--four', 'stars__rating--five'];
  var starsRatingElem = goodCard.querySelector('.stars__rating');
  var withShugar = 'Содержит сахар';
  var withoutShugar = 'Без сахара';
  var shugarType = goodObj['nutritionFacts'].sugar ? withShugar : withoutShugar;

  // amount
  if (goodObj['amount'] > 5) {
    amountClass = 'card--in-stock';
  } else if (goodObj['amount'] >= 1 & goodObj['amount'] <= 5) {
    amountClass = 'card--little';
  }
  goodCard.classList.remove('card--in-stock');
  goodCard.classList.add(amountClass);

  // name
  goodCard.querySelector('.card__title').textContent = goodObj['name'];

  // picture
  cardImgElem.src = goodObj['picture'];
  cardImgElem.alt = goodObj['name'];

  // price
  cardPriceElement.textContent = goodObj['price'] + ' ';

  cardPriceFragment.appendChild(createNewElement('span', 'card__currency', '₽'));
  cardPriceFragment.appendChild(createNewElement('span', 'card__weight', '/' + goodObj['weight'] + 'Г'));

  cardPriceElement.appendChild(cardPriceFragment);

  // rating
  starsRatingElem.classList.remove('stars__rating--five');
  starsRatingElem.classList.add(ratingValues[goodObj['rating'].value]);
  goodCard.querySelector('.star__count').textContent = goodObj['rating'].number;

  // nutritionFacts
  goodCard.querySelector('.card__characteristic').textContent = shugarType + '. ' + goodObj['nutritionFacts'].energy + ' ккал';
  goodCard.querySelector('.card__composition-list').textContent = goodObj['nutritionFacts'].generateContents();

  return goodCard;
};

// Функция клонирования карточки товара для карзины
var cloneOrderGoodCardElement = function (goodOrderCardTemplate, goodObj) {
  var goodCard = goodOrderCardTemplate.cloneNode(true);
  var cardOrderImg = goodCard.querySelector('.card-order__img');

  goodCard.querySelector('.card-order__title').textContent = goodObj['name'];
  cardOrderImg.src = goodObj['picture'];
  cardOrderImg.alt = goodObj['name'];
  goodCard.querySelector('.card-order__price').textContent = goodObj['price'] + ' ₽';
  goodCard.querySelector('.card-order__count').value = goodObj['amount'];

  return goodCard;
};

// Функция заполнения каталога товаров
var fillGoodsCatalog = function (goodsCatalog) {
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = document.querySelector('.catalog__load');
  var goodCatalogCardTemplate = document.querySelector('#card').content.querySelector('article');
  var goodsCardsFragment = document.createDocumentFragment();

  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');

  goodsCatalog.forEach(function (goodObj) {
    goodsCardsFragment.appendChild(cloneCatalogGoodCardElement(goodCatalogCardTemplate, goodObj));
  });

  catalogCards.appendChild(goodsCardsFragment);
};

// Функция заполнения карзины
var fillGoodsCart = function (goodsInCart) {
  var orderCards = document.querySelector('.goods__cards');
  var goodOrderCardTemplate = document.querySelector('#card-order').content.querySelector('article');
  var goodsCardsFragment = document.createDocumentFragment();

  orderCards.classList.remove('goods__cards--empty');
  orderCards.childNodes[1].style.display = 'none';

  goodsInCart.forEach(function (goodObj) {
    goodsCardsFragment.appendChild(cloneOrderGoodCardElement(goodOrderCardTemplate, goodObj));
  });

  orderCards.appendChild(goodsCardsFragment);
};

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

var goodsCatalog = createGoodsArray({
  goodsNumber: 26,
  goodNames: goodNames,
  imgPaths: imgPaths,
  rating: rating,
  nutritionFacts: nutritionFacts
});

var goodsInCart = createGoodsArray({
  goodsNumber: 3,
  goodNames: goodNames,
  imgPaths: imgPaths,
  rating: rating,
  nutritionFacts: nutritionFacts
});

fillGoodsCatalog(goodsCatalog);
fillGoodsCart(goodsInCart);
