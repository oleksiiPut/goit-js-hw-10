export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
  ).then(response => {
    return response.json();
  });
  //   const url = `${BASE_URL}/${name}`;
  //   return fetch(url).then(response => response.json());
}

// const BASE_URL = 'https://restcountries.com/v3.1/name';
