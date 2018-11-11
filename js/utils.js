'use strict';

(function () {
  // Функция генерации целого случайного числа из заданного диапазона
  window.getRandomValueRange = function (minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  };

  // Функция перемешивает и возвращает, изначально, переданный массив
  window.shuffleArray = function (array) {
    for (var i = 0; i < array.length; i++) {
      var rndArrIndex = window.getRandomValueRange(0, array.length - 1);
      var tmpValue = array[i];
      array[i] = array[rndArrIndex];
      array[rndArrIndex] = tmpValue;
    }

    return array;
  };

  // Функция создания массива из случайных элементов передаваемого массива
  window.getRandomArray = function (array) {
    return window.shuffleArray(array).slice(window.getRandomValueRange(1, array.length - 1));
  };

  // Функция проверки корректности номера кредитной карты
  window.checkCreditCardNumber = function (cardNumValue) {
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
  window.checkCreditCardExp = function (cardExpValue) {
    var regexp = /^([01]{1}[0-9]{1}\/[1-3]{1}[0-9]{1})$/;
    var result = cardExpValue.length !== 5 ? false : regexp.test(cardExpValue);

    return result;
  };

  // Функция проверки корректности cvc кредитной карты
  window.checkCreditCardCvc = function (cardCvcValue) {
    return (cardCvcValue.length === 3 && cardCvcValue >= 100 && cardCvcValue <= 999);
  };

  // Функция проверки корректности имени владельца кредитной карты
  window.checkCreditCardHolder = function (cardHolderValue) {
    return cardHolderValue.length >= 3;
  };

})();
