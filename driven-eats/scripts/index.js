import { data } from '../data.js';

const cardCreator = () => {
  for (let index = 0; index < Object.keys(data).length; index += 1) {
    for (let item = 0; item < data[Object.keys(data)[index]].length; item += 1) {
      const thumb = data[Object.keys(data)[index]][item].thumb;
      const title = data[Object.keys(data)[index]][item].title;
      const description = data[Object.keys(data)[index]][item].description;
      const price = data[Object.keys(data)[index]][item].price;

      const cardElement = document.createElement('div');
      const check = document.createElement('ion-icon');
      const figureElement = document.createElement('figure');
      const imgElement = document.createElement('img');
      const titleElement = document.createElement('figcaption');
      const descriptionElement = document.createElement('p');
      const priceElement = document.createElement('p');
      const cardMask = document.createElement('div');

      cardElement.classList.add('card');
      check.classList.toggle('checkMark');
      figureElement.classList.add('card__figure');
      cardMask.classList.add('card__mask');

      imgElement.setAttribute('src', thumb);
      check.setAttribute('name', 'checkmark-circle');
      titleElement.innerHTML = title;
      descriptionElement.innerHTML = description;
      priceElement.innerHTML = `R$ ${price.toFixed(2)}`;

      document.querySelector('.' + Object.keys(data)[index]).appendChild(cardElement);
      cardElement.appendChild(check);
      cardElement.appendChild(figureElement);
      figureElement.appendChild(imgElement);
      figureElement.appendChild(titleElement);
      cardElement.appendChild(descriptionElement);
      cardElement.appendChild(priceElement);
      cardElement.appendChild(cardMask);
    }
  }
};
cardCreator();

const loadRequest = () => {
  const choosedCards = Array.from(document.querySelectorAll('.choosed')).map((card) => card.parentElement);

  const requestInfo = {
    food: {
      name: choosedCards[0].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML,
      price: choosedCards[0].lastElementChild.previousElementSibling.innerHTML,
    },
    drink: {
      name: choosedCards[1].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML,
      price: choosedCards[1].lastElementChild.previousElementSibling.innerHTML,
    },
    dessert: {
      name: choosedCards[2].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML,
      price: choosedCards[2].lastElementChild.previousElementSibling.innerHTML,
    },
  };

  const total = Object.values(requestInfo).reduce((sum, info) => sum + Number(info.price.slice(3)), 0);
  const totalTo2 = total.toFixed(2);
  const totalFormated = `R$ ${totalTo2}`;

  return { requestInfo, totalFormated };
};

const closeHandle = () => {
  const body = document.querySelector('.bodyWrapper');
  const request = loadRequest();
  console.log(body);

  const table = document.createElement('table');
  const foodRow = document.createElement('tr');
  const foodName = document.createElement('td');
  const foodPrice = document.createElement('td');
  const drinkRow = document.createElement('tr');
  const drinkName = document.createElement('td');
  const drinkPrice = document.createElement('td');
  const dessertRow = document.createElement('tr');
  const dessertName = document.createElement('td');
  const dessertPrice = document.createElement('td');
  const totalRow = document.createElement('tr');
  const totalName = document.createElement('td');
  const totalPrice = document.createElement('td');

  const dialog = document.createElement('dialog');
  const dialogHeader = document.createElement('div');
  const dialogTitle = document.createElement('h3');
  const dialogBody = document.createElement('div');
  const finish = document.createElement('button');
  const cancel = document.createElement('button');

  body.appendChild(dialog);
  dialog.appendChild(dialogHeader);
  dialogHeader.appendChild(dialogTitle);
  dialog.appendChild(dialogBody);
  dialogBody.appendChild(table);
  table.appendChild(foodRow);
  foodRow.appendChild(foodName);
  foodRow.appendChild(foodPrice);
  table.appendChild(drinkRow);
  drinkRow.appendChild(drinkName);
  drinkRow.appendChild(drinkPrice);
  table.appendChild(dessertRow);
  dessertRow.appendChild(dessertName);
  dessertRow.appendChild(dessertPrice);
  table.appendChild(totalRow);
  totalRow.appendChild(totalName);
  totalRow.appendChild(totalPrice);

  dialog.appendChild(finish);
  dialog.appendChild(cancel);

  dialogHeader.classList.add('dialog__header');
  dialogBody.classList.add('dialog__body');
  totalPrice.classList.add('totalPrice');
  finish.classList.add('finish');

  dialogTitle.innerHTML = 'Confirme seu pedido';
  finish.innerHTML = 'Tudo certo, pode pedir!';
  cancel.innerHTML = 'Cancelar';
  foodName.innerHTML = request.requestInfo.food.name;
  foodPrice.innerHTML = request.requestInfo.food.price;
  drinkName.innerHTML = request.requestInfo.drink.name;
  drinkPrice.innerHTML = request.requestInfo.drink.price;
  dessertName.innerHTML = request.requestInfo.dessert.name;
  dessertPrice.innerHTML = request.requestInfo.dessert.price;
  totalName.innerHTML = 'Total';
  totalPrice.innerHTML = request.totalFormated;

  loadRequest();
  document.querySelector('.finish').addEventListener('click', requestWhatsapp);

  dialog.showModal();

};

const activeClose = () => {
  const choosed = Array.from(document.querySelectorAll('.choosed'));
  const close = document.querySelector('.close');
  const maxChoosed = 3;
  if (choosed.length === maxChoosed) {
    close.firstElementChild.removeAttribute('disabled');
    close.firstElementChild.innerHTML = 'Fechar pedido';
    close.firstElementChild.classList.add('closeActive');
  } else {
    close.firstElementChild.setAttribute('disabled', '');
  }
};

const cardClickHandle = () => {
  // transforma um HTMLCollection em algo tipo um array
  // https://chuckdries.medium.com/traversing-the-dom-with-filter-map-and-arrow-functions-1417d326d2bc
  const cards = Array.from(document.querySelectorAll('.card__mask'));

  cards.map((card) => card.addEventListener('click', (event) => {
    // lógica para os filhos da div não herdarem o evento
    if (event.target !== event.currentTarget) {
      return;
    } else {
      if (Array.from(document.querySelectorAll('.choosed')).length > 0) {
        const categoryElement = event.target.parentElement.parentElement;
        const choosedInCategory = categoryElement.querySelectorAll('.choosed');
        const choosedCheckInCategory = categoryElement.querySelectorAll('.checkChoosed');
        Array.from(choosedInCategory).map((element) => element.classList.remove('choosed'));
        Array.from(choosedCheckInCategory).map((element) =>
          element.classList.remove('checkChoosed'));
      }
      event.target.classList.toggle('choosed');
      event.target.parentElement.firstChild.classList.toggle('checkChoosed');

      activeClose();
    }
  }));
};
cardClickHandle();
console.log(document.querySelector('.closeButton'));
document.querySelector('.closeButton').addEventListener('click', () => {
  console.log(888)
  closeHandle();
});

const requestWhatsapp = () => {
  const choosedCards = Array.from(document.querySelectorAll('.choosed')).map((card) => card.parentElement);

  const requestInfo = {
    food: {
      name: choosedCards[0].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML,
      price: choosedCards[0].lastElementChild.previousElementSibling.innerHTML,
    },
    drink: {
      name: choosedCards[1].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML,
      price: choosedCards[1].lastElementChild.previousElementSibling.innerHTML,
    },
    dessert: {
      name: choosedCards[2].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML,
      price: choosedCards[2].lastElementChild.previousElementSibling.innerHTML,
    },
  };
  const totalPrice = document.querySelector('.totalPrice');

  console.log(totalPrice);

  const link = encodeURIComponent(`*Olá, gostaria de fazer o pedido:*
    *- Prato:* ${requestInfo.food.name}
    *- Bebida:* ${requestInfo.drink.name}
    *- Sobremesa:* ${requestInfo.dessert.name}
    *Total:* R$ ${totalPrice.innerHTML}`);

  window.location.href = "https://wa.me/1111111111111?text=" + link;
}
