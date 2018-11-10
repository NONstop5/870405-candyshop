'use strict';

// Константы
var IMG_PATH = 'img/cards/';
var IMG_EXTENSION = '.jpg';

// Функция генерации целого случайного числа из заданного диапазона
var getRandomValueRange = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

// Функция перемешивает и возвращает, изначально, переданный массив
var shuffleArray = function (array) {
  for (var i = 0; i < array.length; i++) {
    var rndArrIndex = getRandomValueRange(0, array.length - 1);
    var tmpValue = array[i];
    array[i] = array[rndArrIndex];
    array[rndArrIndex] = tmpValue;
  }

  return array;
};

// Функция создания массива из случайных элементов передаваемого массива
var getRandomArray = function (array) {
  return shuffleArray(array).slice(getRandomValueRange(1, array.length - 1));
};

// Функция проверки корректности номера кредитной карты
var checkCreditCardNumber = function (cardNumValue) {
  var charNumArr = cardNumValue.split('');
  var cardNumSum = 0;
  var charNumInt;
  var i = 0;

  if (cardNumValue.length !== 16) {
    return false;
  }

  while (i < charNumArr.length) {
    charNumInt = parseInt(charNumArr[i], 10);
    if (i % 2 === 0) {
      charNumInt = charNumInt * 2;
      charNumInt = charNumInt >= 10 ? (charNumInt - 9) : charNumInt;
    }
    cardNumSum += charNumInt;
    i++;
  }

  return !(cardNumSum % 10);
};

// Функция проверки корректности exp кредитной карты
var checkCreditCardExp = function (cardExpValue) {
  var regexp = /^([01]{1}[0-9]{1}\/[1-3]{1}[0-9]{1})$/;
  var result = cardExpValue.length !== 5 ? false : regexp.test(cardExpValue);

  return result;
};

// Функция проверки корректности cvc кредитной карты
var checkCreditCardCvc = function (cardCvcValue) {
  return (cardCvcValue.length === 3 && cardCvcValue >= 100 && cardCvcValue <= 999);
};

// Функция проверки корректности имени владельца кредитной карты
var checkCreditCardHolder = function (cardHolderValue) {
  return cardHolderValue.length >= 3;
};

// Функция создания нового элемента
var createNewElement = function (tagName, className, textContent) {
  var newElement = document.createElement(tagName);
  newElement.classList.add(className);
  newElement.textContent = textContent;

  return newElement;
};

// Функция создания массива товаров каталога
var createGoodsArray = function () {
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
    'Острый язычок'
  ];
  goodNames = shuffleArray(goodNames);
  var imgNames = [
    'gum-cedar',
    'gum-chile',
    'gum-eggplant',
    'gum-mustard',
    'gum-portwine',
    'gum-wasabi',
    'ice-cucumber',
    'ice-eggplant',
    'ice-garlic',
    'ice-italian',
    'ice-mushroom',
    'ice-pig',
    'marmalade-beer',
    'marmalade-caviar',
    'marmalade-corn',
    'marmalade-new-year',
    'marmalade-sour',
    'marshmallow-bacon',
    'marshmallow-beer',
    'marshmallow-shrimp',
    'marshmallow-spicy',
    'marshmallow-wine',
    'soda-bacon',
    'soda-celery',
    'soda-cob',
    'soda-garlic',
    'soda-peanut-grapes',
    'soda-russian'
  ];
  imgNames = shuffleArray(imgNames);
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
  var goodsNumber = 26;

  var goods = [];

  for (var i = 0; i < goodsNumber; i++) {
    goods[i] = {
      name: goodNames[i], // строка — название. Произвольная строка из нижеперечисленных
      picture: IMG_PATH + imgNames[i] + IMG_EXTENSION, // строка — адрес изображения для товара. Случайное значение из массива, содержащего
      amount: getRandomValueRange(0, 20), // число — количество, число от 0 до 20
      price: getRandomValueRange(100, 1500), // число — стоимость, от 100 до 1500
      weight: getRandomValueRange(30, 300), // число — вес в граммах, от 30 до 300
      rating: { // объект — рейтинг: объект со следующими полями
        value: getRandomValueRange(1, 5), // число — оценка: целое число от 1 до 5
        number: getRandomValueRange(10, 900) // число — количество оценок: целое число от 10 до 900
      },
      nutritionFacts: { // объект — состав: объект со следующими полями
        sugar: !!getRandomValueRange(0, 1), // булево значение — содержание сахара. Значение генерируется случайным образом
        energy: getRandomValueRange(70, 500), // число — энергетическая ценность: целое число от 70 до 500
        generateContents: getRandomArray(contents).join(', ') // строка — состав: сгенерированная случайным образом строка. Для генерации состава нужно выбрать произвольное количество значений, перечисленных ниже и соединить их через запятую
      }
    };
  }

  return goods;
};

// Функция скрывает текст о загрузке каталога товаров
var hideLoadText = function (catalogCards, catalogLoad) {
  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');
};

// Функция показывает текст в заголовке о пустой корзине товаров
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

// Функция устанавливает класс для карточки товара в каталоге
var setAmountGoodClases = function (catalogGoodCard, goodId) {
  catalogGoodCard.classList.remove('card--soon');
  catalogGoodCard.classList.remove('card--little');
  catalogGoodCard.classList.remove('card--in-stock');
  catalogGoodCard.classList.add(getAmmountClass(goodsCatalog[goodId]));
};

// Функция создания карточки товара для каталога
var createCatalogGoodCardElement = function (elementData) {
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
  goodCard.querySelector('.card__composition-list').textContent = elementData.goodObj['nutritionFacts'].generateContents;

  return goodCard;
};

// Функция клонирования карточки товара для корзины
var createBasketGoodCardElement = function (elementData) {

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

var setAvailableFormFields = function (flag, inputGroupClass) {
  var buySection = document.querySelector('.buy');
  var formFields = buySection.querySelector('form');
  var inputFields = formFields.querySelectorAll('input');

  if (inputGroupClass !== undefined) {
    var inputGroup = formFields.querySelector(inputGroupClass);
    inputFields = inputGroup.querySelectorAll('input');
  }

  for (var i = 0; i < inputFields.length; i++) {
    if (flag) {
      inputFields[i].removeAttribute('disabled');
    } else {
      inputFields[i].setAttribute('disabled', '');
    }
  }

  if (inputGroupClass === undefined || inputGroupClass === '') {
    var fieldSetTags = formFields.querySelectorAll('fieldset');

    for (i = 0; i < fieldSetTags.length; i++) {
      if (flag) {
        fieldSetTags[i].removeAttribute('disabled');
      } else {
        fieldSetTags[i].setAttribute('disabled', '');
      }
    }
  }
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
    setAvailableFormFields(false);
  }
};

// Функция изменяет количества товара в каталоге
var changeGoodCatalogAmount = function (goodId, changeValue) {
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogGoodCard = catalogCards.children[goodId + 1];

  goodsCatalog[goodId]['amount'] += changeValue;
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
      changeGoodCatalogAmount(goodId, -1);
      calculateBasketAmount(basketGoodsCards);
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
      changeGoodCatalogAmount(goodId, 1);
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

  setAvailableFormFields(true);

  showBasketGoodsTotal(basketGoodsTotal);

  createBasketGoodCardElement({
    goodBasketCardTemplate: goodBasketCardTemplate,
    basketElem: basketGoodsCards,
    goodObj: newGoodObjForBasket
  });

  increaseBasketGoodCount(basketGoodsCards, goodId);
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

// Функция заполнения каталога товаров
var fillGoodsCatalog = function (catalogCards) {
  var catalogLoad = document.querySelector('.catalog__load');
  var goodCatalogCardTemplate = document.querySelector('#card').content.querySelector('article');
  var goodsCardsFragment = document.createDocumentFragment();

  hideLoadText(catalogCards, catalogLoad);

  goodsCatalog.forEach(function (goodObj, i) {
    goodObj['id'] = i;
    var elementData = createCatalogGoodCardElement({
      goodCatalogCardTemplate: goodCatalogCardTemplate,
      goodObj: goodObj,
    });
    goodsCardsFragment.appendChild(elementData);
  });

  catalogCards.appendChild(goodsCardsFragment);
};

// Навешиваем события на каталог товаров
var addGoodCatalogEvents = function (catalogCards) {
  catalogCards.addEventListener('click', function (evt) {
    evt.preventDefault();
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
var addBasketEvents = function (basketGoodsCardsElem) {
  basketGoodsCardsElem.addEventListener('click', function (evt) {
    evt.preventDefault();
    var basketGoodsCard = evt.target.parentElement.parentElement.parentElement;
    var goodId = parseInt(basketGoodsCard.id, 10);

    // Уменьшаем количества товара в корзине
    if (evt.target.className === 'card-order__btn card-order__btn--decrease') {
      decreaseBasketGoodCount(basketGoodsCardsElem, goodId);
    }

    // Увеличиваем количества товара в корзине
    if (evt.target.className === 'card-order__btn card-order__btn--increase') {
      increaseBasketGoodCount(basketGoodsCardsElem, goodId);
    }

    // Удаляем товар из корзины и увеличиваем остаток в каталоге
    if (evt.target.className === 'card-order__close') {
      basketGoodsCard = evt.target.parentElement;
      goodId = parseInt(basketGoodsCard.id, 10);

      restoreGoodCatalogAmount(goodId);
      removeGoodFromBasket(goodId);
      calculateBasketAmount(basketGoodsCardsElem);
    }
  });
};

// Навешиваем события на блок оплаты
var addPaymentEvents = function (paymentForm) {
  var paymentCardPage = paymentForm.querySelector('.payment__card-wrap');
  var paymentCashPage = paymentForm.querySelector('.payment__cash-wrap');
  var cardNumber = document.getElementById('payment__card-number');
  var cardExp = document.getElementById('payment__card-date');
  var cardCvc = document.getElementById('payment__card-cvc');
  var cardHolder = document.getElementById('payment__cardholder');

  paymentForm.addEventListener('click', function (evt) {
    if (evt.target.control === undefined || goodsBasket.length === 0) {
      return;
    }
    var tabId = evt.target.control.id;

    if (tabId === 'payment__card') {
      paymentCardPage.classList.remove('visually-hidden');
      paymentCashPage.classList.add('visually-hidden');
    }
    if (tabId === 'payment__cash') {
      paymentCardPage.classList.add('visually-hidden');
      paymentCashPage.classList.remove('visually-hidden');
      setAvailableFormFields(false, '.payment__inputs');
    }
  });

  paymentForm.addEventListener('keyup', function () {
    var paymentCardStatus = paymentForm.querySelector('.payment__card-status');
    var checkResult = true;

    checkResult = checkResult && checkCreditCardNumber(cardNumber.value);
    checkResult = checkResult && checkCreditCardExp(cardExp.value);
    checkResult = checkResult && checkCreditCardCvc(cardCvc.value);
    checkResult = checkResult && checkCreditCardHolder(cardHolder.value);

    if (checkResult) {
      paymentCardStatus.textContent = 'одобрен';
    } else {
      paymentCardStatus.textContent = 'не определен';
    }
  });
};

// Навешиваем события на блок доставки
var addDeliverEvents = function (deliverForm) {
  deliverForm.addEventListener('click', function (evt) {
    if (evt.target.control === undefined || goodsBasket.length === 0) {
      return;
    }
    var tabId = evt.target.control.id;
    var deliverStorePage = deliverForm.querySelector('.deliver__store');
    var deliverCourierPage = deliverForm.querySelector('.deliver__courier');

    if (tabId === 'deliver__store') {
      deliverStorePage.classList.remove('visually-hidden');
      deliverCourierPage.classList.add('visually-hidden');
    }
    if (tabId === 'deliver__courier') {
      deliverStorePage.classList.add('visually-hidden');
      deliverCourierPage.classList.remove('visually-hidden');
    }
  });
};

// Навешиваем события на ползунок фильтра
var addPriceFilterEvents = function (rangePriceFilter) {
  rangePriceFilter.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    var rangeBtnClassName = evt.target.className;
    var rangePriceText = rangePriceFilter.nextElementSibling;
    var rangePriceMinText = rangePriceText.children[0];
    var rangePriceMaxText = rangePriceText.children[1];

    if (rangeBtnClassName === 'range__btn range__btn--left') {
      rangePriceMinText.textContent = '0';
    }
    if (rangeBtnClassName === 'range__btn range__btn--right') {
      rangePriceMaxText.textContent = '100';
    }
  });
};

// Функция основных действий
var main = function () {
  var catalogCardsElem = document.querySelector('.catalog__cards');
  var basketGoodsCardsElem = document.querySelector('.goods__cards');
  var paymentForm = document.querySelector('.payment');
  var deliverForm = document.querySelector('.deliver');
  var rangePriceFilter = document.querySelector('.range__filter');

  fillGoodsCatalog(catalogCardsElem);

  addGoodCatalogEvents(catalogCardsElem);

  addBasketEvents(basketGoodsCardsElem);

  addPaymentEvents(paymentForm);

  addDeliverEvents(deliverForm);

  addPriceFilterEvents(rangePriceFilter);
};

var goodsCatalog = createGoodsArray();

var goodsBasket = [];

main();
