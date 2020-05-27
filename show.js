//query params
const params = window.location.search
const searchParams = new URLSearchParams(params)
const id = searchParams.get("id")


const parksURL = `http://localhost:3000/parks/${id}`
const ul = document.createElement("ul")

//Update form and id's
const updateParkForm = document.querySelector('#update-form')
const updateState = document.querySelector("#update-state")
const updateWeather = document.querySelector("#update-weather")
const updateName = document.querySelector("#update-name")
const updateDescription = document.querySelector("#update-description")
const updateId = document.querySelector("#update-id")

fetch(parksURL)
    .then(response => response.json())
    .then(park => displayPark(park))

updateParkForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const parkData = new FormData(event.target)
    const state = parkData.get('state')
    const weather = parkData.get('weather')
    const name = parkData.get('fullName')
    const description = parkData.get('description')
    const id = parkData.get('id')
    const updatedPark = {state, weather,name, description}

    displayPark(updatedPark)

    fetch(parksURL + id, {
        method: "PATCH",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(newPark)
    })
})

function displayPark(park) {
    const parkCard = document.createElement("div")
    parkCard.id = "park-card"
    
    const state = document.createElement('li')
    const url = document.createElement('li')
    const weather = document.createElement('p')
    const name = document.createElement('h3')
    const lat_long = document.createElement('li')
    const description = document.createElement('p')
    
    const updateButton = document.createElement('button')

    state.innerHTML = "State:" + " " + park.state
    url.innerHTML = `<a href=${park.url}>${park.url}</a>`
    weather.innerHTML = "Weather:" + " " + park.weather
    name.innerHTML = park.name
    lat_long.innerHTML = "Latitude and Longitude:" + " " + park.lat_long
    description.innerHTML = "Park Description:" + " " + park.description
    updateButton.textContent = "Update Park"

    updateButton.addEventListener('click', () => {
        updateState.value = park.state
        updateWeather.value = park.weather
        updateName.value = park.name
        updateDescription.value = park.description
        updateId.value = park.id
    })
    
    parkCard.append(name, description, weather, ul, state, url, lat_long)
    name.append(updateButton)
    document.body.append(parkCard)   
}
