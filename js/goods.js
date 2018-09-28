'use strict';

// Функции
var getRandomValue = function (maxValue) {
  return Math.floor(Math.random() * maxValue);
};

var createNewElement = function (tagName, className, textContent) {
  var newElement = document.createElement(tagName);
  newElement.classList.add(className);
  newElement.textContent = textContent;

  return newElement;
};

var createGoodsArray = function (goodsNumber, goodNames, imgPaths, rating, nutritionFacts) {
  var goods = [];

  for (var i = 0; i < goodsNumber; i++) {
    var good = {
      'name': goodNames[getRandomValue(goodNames.length)], // строка — название. Произвольная строка из нижеперечисленных
      'picture': imgPaths[getRandomValue(imgPaths.length)], // строка — адрес изображения для товара. Случайное значение из массива, содержащего
      'amount': 1, // число — количество, число от 0 до 20
      'price': 105, // число — стоимость, от 100 до 1500
      'weight': 30, // число — вес в граммах, от 30 до 300
      'rating': rating, // объект — рейтинг: объект со следующими полями
      'nutritionFacts': nutritionFacts // объект — состав: объект со следующими полями
    };

    goods[i] = good;
  }

  return goods;
};

var cloneCatalogGoodCardElement = function (goodCatalogCardTemplate, goodObj) {
  var goodCard = goodCatalogCardTemplate.cloneNode(true);

  // amount
  var amountClass = 'card--soon';
  if (goodObj['amount'] > 5) {
    amountClass = 'card--in-stock';
  } else if (goodObj['amount'] >= 1 & goodObj['amount'] <= 5) {
    amountClass = 'card--little';
  }
  goodCard.classList.remove('card--in-stock');
  goodCard.classList.add(amountClass);

  // name, picture
  goodCard.querySelector('.card__title').textContent = goodObj['name'];
  goodCard.querySelector('.card__img').src = goodObj['picture'];
  goodCard.querySelector('.card__img').alt = goodObj['name'];

  // price
  var cardPriceElement = goodCard.querySelector('.card__price');
  cardPriceElement.textContent = goodObj['price'] + ' ';

  var cardPriceFragment = document.createDocumentFragment();
  cardPriceFragment.appendChild(createNewElement('span', 'card__currency', '₽'));
  cardPriceFragment.appendChild(createNewElement('span', 'card__weight', '/' + goodObj['weight'] + 'Г'));

  cardPriceElement.appendChild(cardPriceFragment);

  //  rating
  var ratingValues = ['', 'stars__rating--one', 'stars__rating--two', 'stars__rating--three', 'stars__rating--four', 'stars__rating--five'];
  goodCard.querySelector('.stars__rating').classList.remove('stars__rating--five');
  goodCard.querySelector('.stars__rating').classList.add(ratingValues[goodObj['rating'].value]);
  goodCard.querySelector('.star__count').textContent = goodObj['rating'].number;

  // nutritionFacts
  var isShugar = 'Без сахара';
  if (goodObj['nutritionFacts'].sugar) {
    isShugar = 'Содержит сахар';
  }
  goodCard.querySelector('.card__characteristic').textContent = isShugar + '. ' + goodObj['nutritionFacts'].energy + ' ккал';
  goodCard.querySelector('.card__composition-list').textContent = goodObj['nutritionFacts'].contents();

  return goodCard;
};

var cloneOrderGoodCardElement = function (goodOrderCardTemplate, goodObj) {
  var goodCard = goodOrderCardTemplate.cloneNode(true);

  goodCard.querySelector('.card-order__title').textContent = goodObj['name'];
  goodCard.querySelector('.card-order__img').src = goodObj['picture'];
  goodCard.querySelector('.card-order__img').alt = goodObj['name'];
  goodCard.querySelector('.card-order__price').textContent = goodObj['price'] + ' ₽';
  goodCard.querySelector('.card-order__count').value = goodObj['amount'];

  return goodCard;
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
  'contents': function () { // строка — состав: сгенерированная случайным образом строка. Для генерации состава нужно выбрать произвольное количество значений, перечисленных ниже и соединить их через запятую
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

var goodsCardsFragment = document.createDocumentFragment();

// Заполняем каталог товаров
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

var goodCatalogCardTemplate = document.querySelector('#card').content.querySelector('article');

var goodsCatalog = createGoodsArray(26, goodNames, imgPaths, rating, nutritionFacts);

goodsCatalog.forEach(function (goodObj) {
  goodsCardsFragment.appendChild(cloneCatalogGoodCardElement(goodCatalogCardTemplate, goodObj));
});

catalogCards.appendChild(goodsCardsFragment);

// Заполняем карзину
var orderCards = document.querySelector('.goods__cards');
orderCards.classList.remove('goods__cards--empty');
orderCards.childNodes[1].style.display = 'none';

var goodOrderCardTemplate = document.querySelector('#card-order').content.querySelector('article');

var goodsInCart = createGoodsArray(3, goodNames, imgPaths, rating, nutritionFacts);

goodsInCart.forEach(function (goodObj) {
  goodsCardsFragment.appendChild(cloneOrderGoodCardElement(goodOrderCardTemplate, goodObj));
});

orderCards.appendChild(goodsCardsFragment);
