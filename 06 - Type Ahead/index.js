const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

const cities = []

const fetchCities = async () => {
  try {

    const res = await fetch(endpoint)
    const data = await res.json()
    
    cities.push(...data)
    console.log(cities)
  } catch (err) {
    console.error(err)
  }
}

const findMatches = (userInput, cities) => {
  return cities.filter(city => {

    const regex = new RegExp(userInput, 'gi')

    return city.city.match(regex) || city.state.match(regex)
  })
}

function displayMatches () {
  const matchArray = findMatches(this.value, cities)
  console.log(matchArray)
  const html = matchArray.map(place => {
    return `
      <li>
        <span class="name">${place.city}, ${place.state}</span>
        <span class="population">${place.population}</span>
      </li>
    `
  }).join('')

  suggestions.innerHTML = html
}

fetchCities()

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)