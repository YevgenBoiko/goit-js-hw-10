import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  return fetch(
    `${BASE_URL}${name}?fields=name,capital,languages,population,flags,flag`
  ).then(response => {
    if (!response.ok) {
      Notify.failure('Oops, there is no country with that name');
    }

    return response.json();
  });
}
