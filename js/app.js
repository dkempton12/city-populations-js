// Cities JSON data to pull from
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// Should have array to put cities in
const cities = [];

// Should fetch promise
fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data)); // spreading into the push method
// Should filter array down to a subset for searching the cities
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // Should figure out if city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');  // g = global, match all instances in a string, not just one, i= case-sensitive
        return place.city.match(regex) || place.state.match(regex);  // returns either the city or the state
    });
}

// Include commas in population numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Should display below search bar
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        // List cities
        return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
    }).join('');
    suggestions.innerHTML = html;
}

// Elements and listeners
const searchInput = document.querySelector('.search'); // the search bar
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
