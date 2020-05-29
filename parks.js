const parksURL = 'http://localhost:3000/parks/'
const parkForm = document.querySelector("#add-park")
console.log(parkForm)


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

    parkCard.append(name, button)
    document.body.append(parkCard)   
}


newParkForm.addEventListener('submit', (event) => {
    event.preventDefault()
        
    const parkData = new FormData(event.target)
    const state = parkData.get('state')
    const url = parkData.get('url')
    const weather = parkData.get('weather')
    const name = parkData.get('fullName')
    const lat_long = parkData.get('lat_long')
    const description = parkData.get('description')
    const newPark = {
        state: state, 
        url: url, 
        weather: weather,
        name: name, 
        lat_long: lat_long, 
        description: description
    }
        
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