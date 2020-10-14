const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

const cities = []

const fetchCities = async () => {
  try {
    const res = await fetch(endpoint)
    const data = await res.json()
    cities.push(...data)
  } catch (err) {
    console.error(err)
  }
}
fetchCities()

const findMatches = (userInput, cities) => {
  return cities.filter(city => {
    const regex = new RegExp(userInput, 'gi')
    return city.city.match(regex) || city.state.match(regex)
  })
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches () {
  const matchArray = findMatches(this.value, cities)
  const html = matchArray.map(place => {

    const regex = new RegExp(this.value, 'gi')
    const cityName = place.city.replace(regex, `<span class="h1">${this.value}</span>`)
    const stateName = place.state.replace(regex, `<span class="h1">${this.value}</span>`)
    
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `
  }).join('')

  suggestions.innerHTML = html
}


searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)