import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onFetchCountries, DEBOUNCE_DELAY));

function onFetchCountries(e) {
  const { value } = e.target;

  fetchCountries(value.trim())
    .then(addMarkup)
    .catch(() => {
      deleteMarkup();
      return Notify.failure('Oops, there is no country with that name');
    });
}

function addMarkup(data) {
  if (data.length > 1 && data.length < 10) {
    deleteMarkup();
    countryList.innerHTML = createListMarkup(data);
  } else if (data.length === 1) {
    deleteMarkup();
    countryInfo.innerHTML = createCountryInfoMarkup(data);
  } else if (data.length > 10) {
    deleteMarkup();
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function createListMarkup(arr) {
  {
    return arr
      .map(
        ({ name: { common }, flags: { png } }) =>
          `<li>
          <h3><img src="${png}" alt="flag"> ${common}</h3>
          </li>`
      )
      .join('');
  }
}

function createCountryInfoMarkup(arr) {
  return arr
    .map(
      ({
        name: { common },
        flags: { png },
        capital,
        population,
        languages,
      }) => {
        return `<div>
        
        <h1><img src="${png}" alt="flag"> ${common}</h1>
        <h2>Capital: <span>${capital}</span></h2>
        <h2>Population: <span>${population}</span></h2>
        <h2>Languages: <span>${Object.values(languages).join(', ')}</span></h2>
    </div>`;
      }
    )
    .join('');
}

function deleteMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
