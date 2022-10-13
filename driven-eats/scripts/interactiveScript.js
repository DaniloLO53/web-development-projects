// import { data } from '../data.js';

// function drinkFilterHandle({ target }) {
//   const { value } = target;
//   const tagsSelector = {
//     'Filtrar': '',
//     'Não Alcólico': '',
//     'Cerveja': 'cerveja',
//     'Vinhos': 'vinho',
//     'Vinho Tinto': 'tinto',
//     'Vinho Branco': 'branco',
//   };
//   const tag = tagsSelector[value];

//   const oldCards = document.querySelectorAll(`[data-row="${1}"]`);
//   if (oldCards.length > 0) Array.from(oldCards).map((card) => card.remove());

//   cardCreator(tag, 1);
// }

// function dessertFilterHandle({ target }) {
//   const { value } = target;
//   const tagsSelector = {
//     'Filtrar': '',
//     'Chocolate': 'chocolate',
//     'Mousses': 'mousse',
//     'Bolos': 'bolo',
//     'Pudins': 'pudim',
//     'Doces': 'doce',
//   };
//   const tag = tagsSelector[value];

//   const oldCards = document.querySelectorAll(`[data-row="${2}"]`);
//   if (oldCards.length > 0) Array.from(oldCards).map((card) => card.remove());
//   cardCreator(tag, 2);
// }

// document.querySelector('#drinkFilters').addEventListener('click', drinkFilterHandle);
// document.querySelector('#dessertFilters').addEventListener('click', dessertFilterHandle);


// function cardCreator(tag = '', categoryRowIndex) {
//   const filteredData = {
//     ...data,
//     [Object.keys(data)[categoryRowIndex || 0]]: data[Object.keys(data)[categoryRowIndex || 0]].filter((item) => item.tags.includes(tag)),
//   }

//   const dataRendered = categoryRowIndex === undefined ? data : filteredData;

//   for (let index = 0; index < 3; index += 1) {
//     if (index !== categoryRowIndex && categoryRowIndex !== undefined) continue;
//     console.log(dataRendered);
//     for (let item = 0; item < dataRendered[Object.keys(dataRendered)[index]].length; item += 1) {

//       const thumb = dataRendered[Object.keys(dataRendered)[index]][item].thumb;
//       const title = dataRendered[Object.keys(dataRendered)[index]][item].title;
//       const description = dataRendered[Object.keys(dataRendered)[index]][item].description;
//       const price = dataRendered[Object.keys(dataRendered)[index]][item].price;

//       const cardElement = document.createElement('div');
//       const check = document.createElement('ion-icon');
//       const figureElement = document.createElement('figure');
//       const imgElement = document.createElement('img');
//       const titleElement = document.createElement('figcaption');
//       const descriptionElement = document.createElement('p');
//       const priceElement = document.createElement('p');
//       const cardMask = document.createElement('div');

//       cardElement.classList.add('card');
//       check.classList.toggle('checkMark');
//       figureElement.classList.add('card__figure');
//       cardMask.classList.add('card__mask');

//       cardElement.setAttribute('data-row', index);
//       imgElement.setAttribute('src', thumb);
//       check.setAttribute('name', 'checkmark-circle');
//       titleElement.innerHTML = title;
//       descriptionElement.innerHTML = description;
//       priceElement.innerHTML = `R$ ${price.toFixed(2)}`;

//       document.querySelector('.' + Object.keys(dataRendered)[index]).appendChild(cardElement);
//       cardElement.appendChild(check);
//       cardElement.appendChild(figureElement);
//       figureElement.appendChild(imgElement);
//       figureElement.appendChild(titleElement);
//       cardElement.appendChild(descriptionElement);
//       cardElement.appendChild(priceElement);
//       cardElement.appendChild(cardMask);
//     }
//   }
// };
// cardCreator();