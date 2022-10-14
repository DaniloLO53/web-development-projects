const initialGameConfig = () => {
  let cardNumber = prompt('Com quantas cartas quer começar? Escolha um número par de 4 a 14');

  while (cardNumber % 2 !== 0 || (cardNumber < 4 || cardNumber > 14)) {
    cardNumber = prompt('Com quantas cartas quer começar? Escolha um número par de 4 a 14');
  }
  console.log(cardNumber);
};

const cardCreator = () => {

}

window.addEventListener('load', initialGameConfig);