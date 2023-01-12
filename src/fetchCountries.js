export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  return fetch(
    `${BASE_URL}${name}?fields=name,capital,languages,population,flags,flag`
  ).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}
