import { data } from '../data.js';

function filterHandle({ target }) {
  const { value, name } = target;

  const drinksTagsSelector = {
    'Filtrar': '',
    'Sem Filtro': '',
    'Não Alcólico': '',
    'Cerveja': 'cerveja',
    'Vinhos': 'vinho',
    'Vinho Tinto': 'tinto',
    'Vinho Branco': 'branco',
  };

  const dessertsTagsSelector = {
    'Filtrar': '',
    'Sem Filtro': '',
    'Chocolate': 'chocolate',
    'Mousses': 'mousse',
    'Bolos': 'bolo',
    'Pudins': 'pudim',
    'Doces': 'doce',
  };

  const tag = name === 'drink' ? drinksTagsSelector[value] : dessertsTagsSelector[value];
  const row = name === 'drink' ? 1 : 2;

  const oldCards = document.querySelectorAll(`[data-row="${row}"]`);
  if (oldCards.length > 0) Array.from(oldCards).map((card) => card.remove()); // remove os cards não filtrados

  cardCreator(tag, row);
}
Array.from(document.querySelectorAll('.filter')).map((filter) => filter.addEventListener('click', filterHandle));

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
    if (event.target === event.currentTarget) {
      if (Array.from(document.querySelectorAll('.choosed')).length > 0) {
        const categoryElement = event.target.parentElement.parentElement;
        const choosedInCategory = categoryElement.querySelectorAll('.choosed');
        const choosedCheckInCategory = categoryElement.querySelectorAll('.checkChoosed');
        Array.from(choosedInCategory)
          .map((element) => element.classList.remove('choosed'));
        Array.from(choosedCheckInCategory)
          .map((element) => element.classList.remove('checkChoosed'));
      }
      event.target.classList.toggle('choosed');
      event.target.parentElement.firstChild.classList.toggle('checkChoosed');

      activeClose();
    }
  }));
};
cardClickHandle();


function cardCreator(tag, categoryRowIndex) {
  const categoryFilterName = Object.keys(data)[categoryRowIndex];
  const filteredData = {
    ...data,
    [categoryFilterName]: data[categoryFilterName]?.filter((item) => item.tags.includes(tag)),
  };

  const dataRendered = !categoryRowIndex ? data : filteredData;

  for (let index = 0; index < 3; index += 1) {
    if (index !== categoryRowIndex && categoryRowIndex) continue;

    const elements = dataRendered[Object.keys(dataRendered)[index]];
    for (let item = 0; item < elements.length; item += 1) {
      const element = elements[item];

      const thumb = element.thumb;
      const title = element.title;
      const description = element.description;
      const price = element.price;

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

      cardElement.setAttribute('data-row', index);
      imgElement.setAttribute('src', thumb);
      check.setAttribute('name', 'checkmark-circle');
      titleElement.innerHTML = title;
      descriptionElement.innerHTML = description;
      priceElement.innerHTML = `R$ ${price.toFixed(2)}`;

      document.querySelector('.' + Object.keys(dataRendered)[index]).appendChild(cardElement);
      cardElement.appendChild(check);
      cardElement.appendChild(figureElement);
      figureElement.appendChild(imgElement);
      figureElement.appendChild(titleElement);
      cardElement.appendChild(descriptionElement);
      cardElement.appendChild(priceElement);
      cardElement.appendChild(cardMask);
    }
  }
  cardClickHandle();
};
cardCreator();

const requestInfoBuilder = () => {
  const choosedCards = Array.from(document.querySelectorAll('.choosed'))
    .map((card) => card.parentElement);
  const categories = ['food', 'drink', 'dessert'];

  const requestInfo = categories.map((category, index) => ({
    [category]: {
      name: choosedCards[index]
        .firstElementChild // check-icon
        .nextElementSibling // figure tag
        .firstElementChild // thumb
        .nextElementSibling // name
        .innerHTML,
      price: choosedCards[index]
        .lastElementChild // mask
        .previousElementSibling // price
        .innerHTML,
    }
  }));

  return requestInfo;
};

const requestMealInfos = () => {
  const requestInfo = requestInfoBuilder();
  const total = {
    name: 'Total:',
    price: 'R$ ' + (requestInfo
      .reduce((sum, info) => sum + Number(Object.values(info)[0].price.slice(3)), 0))
      .toFixed(2),
  }

  return { ...requestInfo, total };
};

const tableBuilder = () => {
  const table = document.createElement('table');
  const request = requestMealInfos();

  Object.values(request).map((category) => {
    console.log(category)
    const categoryRow = document.createElement('tr');

    const name = document.createElement('td');
    const price = document.createElement('td');

    name.innerHTML = !category.name
      ? Object.values(category)[0].name
      : category.name;
    price.innerHTML = !category.price
      ? Object.values(category)[0].price
      : category.price;

    categoryRow.appendChild(name);
    categoryRow.appendChild(price);

    table.appendChild(categoryRow);
  });

  return table;
};

const closeHandle = () => {
  const body = document.querySelector('.bodyWrapper');
  const table = tableBuilder();

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

  dialog.appendChild(finish);
  dialog.appendChild(cancel);

  dialogHeader.classList.add('dialog__header');
  dialogBody.classList.add('dialog__body');
  finish.classList.add('finish');
  cancel.classList.add('cancel');

  dialogTitle.innerHTML = 'Confirme seu pedido';
  finish.innerHTML = 'Tudo certo, pode pedir!';
  cancel.innerHTML = 'Cancelar';

  document.querySelector('.finish').addEventListener('click', requestWhatsapp);
  document.querySelector('.cancel').addEventListener('click', () => dialog.remove());

  dialog.showModal();
};

document.querySelector('.closeButton').addEventListener('click', () => closeHandle());

const requestWhatsapp = () => {
  const requestInfo = requestMealInfos();

  const name = prompt('Por favor, insira seu nome: ');
  const adress = prompt('Por favor, insira seu endereço: ');

  const link = encodeURIComponent(`*Olá, gostaria de fazer o pedido:*
    *- Prato:* ${requestInfo[0].food.name}
    *- Bebida:* ${requestInfo[1].drink.name}
    *- Sobremesa:* ${requestInfo[2].dessert.name}
    *Total:* R$ ${requestInfo.total.price}
    
    Nome: ${name}
    Endereço: ${adress}`
  );

  window.location.href = "https://wa.me/+5521995784778?text=" + link;
}

const removeInitialAnimation = () => {
  const animationWrapper = document.querySelector('.animationWrapper');
  const body = document.querySelector('body');

  body.classList.add('noScroll');
  setTimeout(() => {
    animationWrapper.remove();
    body.classList.remove('noScroll');
  }, 3500);
};
removeInitialAnimation();
