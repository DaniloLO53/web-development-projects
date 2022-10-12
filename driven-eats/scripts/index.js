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
      imgElement.classList.add('card__image');
      priceElement.classList.add('card__price');
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

const closeHandle = () => {
  const body = document.querySelector('.bodyWrapper');
  console.log(body);

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
  dialog.appendChild(finish);
  dialog.appendChild(cancel);

  dialogTitle.innerHTML = 'Confirme seu pedido';
  finish.innerHTML = 'Tudo certo, pode pedir!';
  cancel.innerHTML = 'Cancelar';

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
