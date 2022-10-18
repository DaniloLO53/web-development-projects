let initialNumber = 0;
const cardsContainer = document.querySelector('.cardsContainer');

const initialGameConfig = () => {
  let cardNumber = prompt('Com quantas cartas quer começar? Escolha um número par de 4 a 14');

  while (cardNumber % 2 !== 0 || (cardNumber < 4 || cardNumber > 14)) {
    cardNumber = prompt('Com quantas cartas quer começar? Escolha um número par de 4 a 14');
  }
  initialNumber = cardNumber;
};

const cardCreator = () => {
  for (let index = 0; index < initialNumber; index += 1) {
    const cardContainer = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');

    cardContainer.classList.add('card');
    back.classList.add('back');
    back.classList.add('face');
    front.classList.add('front');
    front.classList.add('face');

    cardContainer.appendChild(back);
    cardContainer.appendChild(front);

    cardContainer.addEventListener('click', handleClick);

    cardsContainer.appendChild(cardContainer);
  }
}

const setBackground = () => {
  const cards = Array.from(document.querySelectorAll('.back'));

  const backgrounds = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];
  let nameIndex = 0;
  let cardIndex = nameIndex;

  for (nameIndex; nameIndex < cards.length / 2; nameIndex += 1) {
    cards[cardIndex].classList.add(backgrounds[nameIndex]);
    cards[cardIndex + 1].classList.add(backgrounds[nameIndex]);
    cardIndex += 2;
  }
}

const randomizeCards = () => {
  const cards = Array.from(document.querySelectorAll('.card'));
  const randomized = cards.sort(() => Math.random() - 0.5);
  cards.map((card) => card.remove());
  randomized.map((card) => cardsContainer.appendChild(card));
};

const handleClick = ({ target }) => {
  target.parentElement.classList.toggle('clicked');
}

window.addEventListener('load', initialGameConfig);
window.addEventListener('load', cardCreator);
window.addEventListener('load', setBackground);
window.addEventListener('load', randomizeCards);
