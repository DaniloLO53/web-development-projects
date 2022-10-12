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
document.querySelector('.closeButton').addEventListener('click', () => closeHandle());

const requestWhatsapp = () => {
  const requestInfo = requestMealInfos();
  const totalPrice = document.querySelector('.totalPrice');

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

  window.location.href = "https://wa.me/1111111111111?text=" + link;
}
