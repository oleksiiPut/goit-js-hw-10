import './css/styles.css';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import { fetchCountries } from './helpers/fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function renderCountryCard(elements) {
  const markup = elements
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<div class = "wrapper-card">
       <img src="${flags.svg}" alt = "flag" width = 100px height = 50px>    
       <h1 class = "title"> ${name.official}<h1>
       
       <p>Capital: ${capital}</p>
       <p>Population: ${population}</p>
       <p>Languages: ${Object.values(languages)}</p>
       </div>         
      `
    )
    .join('');
  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

const clearCountryCard = () => {
  refs.countryInfo.innerHTML = '';
};

function renderCountriesList(elements) {
  const markupList = elements
    .map(
      ({ name, flags }) =>
        `<li>
       <div class = "wrapper">
       <img src="${flags.svg}" alt = "flag" width=70px height=35px>    
       <h1 class = "title">${name.official}<h1>
       </div>
       </li>          
      `
    )
    .join('');
  refs.countryList.insertAdjacentHTML('afterbegin', markupList);
}

const clearCountriesList = () => {
  refs.countryList.innerHTML = '';
};

function searchCountry(e) {
  const responseCountry = e.target.value.trim();
  fetchCountries(responseCountry)
    .then(response => {
      if (Number(response.status) === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (responseCountry === '') {
        clearCountryCard();
        clearCountriesList();
      }
      clearCountryCard();
      clearCountriesList();
      if (response.length === 1) {
        renderCountryCard(response);
        clearCountriesList();
      } else if (response.length > 1 && response.length <= 10) {
        renderCountriesList(response);
        clearCountryCard();
      }
    })
    .catch(error => {
      console.log(error);
    });
}
