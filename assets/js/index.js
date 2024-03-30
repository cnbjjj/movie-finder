'use strict';
import movies from './movies.js';
import { query, event } from './utils.js';

const searchInput = query('input[type="text"]');
const searchResults = query('.suggestions');
const movieElement = query('.movie');
const movieTemplate = movieElement.innerHTML;

function searchMovie(keyword) {
    let results = [];
    if (keyword.length > 2)
        results = movies.filter(movie => movie.title.toLocaleLowerCase().includes(keyword)).splice(0, 5);
    addSuggestions(results, keyword.length > 2);
}
function showMovie(title) {
    addSuggestions();
    searchInput.value = title;
    const movie = { ...movies.filter(movie => movie.title === title)[0] };
    movie['genre'] = movie['genre'].map(genre => `<span>${genre}</span>`).join(' ');
    movieElement.innerHTML = Object.keys(movie).reduce((html, attr) => html.replace(`${attr}`, movie[attr]), movieTemplate);
}
function addSuggestions(suggests = [], showNoResult = false) {
    searchResults.innerHTML = '';
    if (suggests.length === 0 && showNoResult)
        return searchResults.innerHTML = `<li class='not-found'>No results found</li>`;
    searchResults.innerHTML = suggests.map(movie => `<li class="result"><img src='${movie.poster}' /><span>${movie.title}</span></li>`).join(' ');
    movieElement.innerHTML = '';
}

searchInput.setAttribute('placeholder', movies[Math.floor(Math.random() * movies.length)].title);
event(searchInput, 'input', () => searchMovie(searchInput.value.toLocaleLowerCase()));
event(searchResults, 'click', (e) => showMovie(e.target.innerText));
addSuggestions();
