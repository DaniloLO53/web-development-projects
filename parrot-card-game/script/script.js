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
    front.classList.add('front');

    cardContainer.appendChild(back);
    cardContainer.appendChild(front);

    cardsContainer.appendChild(cardContainer);
  }
}

window.addEventListener('load', initialGameConfig);
window.addEventListener('load', cardCreator);