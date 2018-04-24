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
