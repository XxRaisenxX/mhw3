const apiURL = 'https://www.cheapshark.com/api/1.0';

// funzione per recuperare i prezzi dei giochi per PC
async function getPCGamePrices(title) {
  try {
    const response = await fetch(`${apiURL}/deals?title=${title}&pageSize=5`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// funzione per recuperare le informazioni dell'immagine del gioco
async function getGameInfo(gameID) {
  try {
    const response = await fetch(`${apiURL}/games?id=${gameID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// funzione per visualizzare i prezzi dei giochi sul sito web
async function displayGamePrices(prices) {
  const container = document.getElementById('game-prices');
  container.innerHTML = '';

  for (const price of prices) {
    const gameInfo = await getGameInfo(price.gameID);

    const div = document.createElement('div');
    div.classList.add('price');
    div.innerHTML = `
      <h3>${price.title}</h3>
      <img src="${gameInfo.info.thumb}">
      <p>Prezzo: ${price.salePrice}$</p>
      <p>Sconto: ${price.savings}%</p>
      <a href="${price.link}" target="_blank">Vai al negozio</a>
    `;
    container.appendChild(div);
  }
}

// evento click sul pulsante di ricerca
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', async () => {
  const titleInput = document.getElementById('title-input');
  const title = titleInput.value;

  const prices = await getPCGamePrices(title);
  displayGamePrices(prices);
});



