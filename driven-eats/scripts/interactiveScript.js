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