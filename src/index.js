import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import listOfCountry from './teamplates/country-list.hbs';
import countryCard from './teamplates/country-info.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.search.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  let name = e.target.value.trim();
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

    fetchCountries(name).then(data => {
        if (data.length === 1) {
          return refs.countryInfo.insertAdjacentHTML(
            'beforeend',
            countryCard(data)
          );
        } else if (data.length > 1 && data.length <= 10) {
          return refs.countryList.insertAdjacentHTML(
            'beforeend',
            listOfCountry(data)
          );
        } else if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(() => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
