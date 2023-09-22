const BASE_URL = `https://disney_api.nomadcoders.workers.dev`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/characters`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/characters/${coinId}`).then((response) =>
    response.json()
  );
}
