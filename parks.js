const parksURL = 'http://localhost:3000/parks/'
const parkContainer = document.createElement("div")
parkContainer.id = "park-container"

document.addEventListener("DOMContentLoaded", () => {
    const parkForm = document.querySelector("#add-park")
    parkForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const parkData = new FormData(event.target)
        const state = parkData.get('state')
        const url = parkData.get('url')
        const weather = parkData.get('weather')
        const name = parkData.get('fullName')
        const lat_long = parkData.get('lat_long')
        const description = parkData.get('description')
        const newPark = {state ,url, weather, name, lat_long, description} 

        showPark(newPark)
            
        fetch(parksURL, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(newPark)
        })
    })
  })

fetch(parksURL)
    .then(response => response.json())
    .then(parks => parks.map(showPark))

function showPark(park) {
    const parkCard = document.createElement("div")
    parkCard.id = "park-card"
    const name = document.createElement('h3')
    const button = document.createElement('button')

    name.innerHTML = `<a href=show.html?id=${park.id}>${park.name}</a>`
    button.textContent = "Delete Park"

    button.addEventListener('click', () => {
        parkCard.remove()
    
        fetch(parksURL + park.id, {
            method: "DELETE"
        })
    })
    parkContainer.append(parkCard)
    parkCard.append(name, button)
    document.body.append(parkContainer)   
}
