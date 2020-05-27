
const brusher = new Brusher({
    image: 'https://images.unsplash.com/photo-1580130718810-358e5e8af61b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1372&q=80', // Path of the image to be used as a brush
    keepCleared: true,     // Put the blur back after user has cleared it
    stroke: 8,            // Stroke size for the brush
    lineStyle: 'round',    // Brush style (round, square, butt)
    autoBlur: true,       // Brusher will use the provided image for the blurry background
    autoBlurValue: 3,     // Blur strength in pixels
  });
  
  brusher.init();

const parksURL = 'http://localhost:3000/parks/'
const ul = document.createElement("ul")
const userSignupForm = document.querySelector("#new-user")
const userLoginForm = document.querySelector("#login")
const isLoggedIn = document.querySelector(".is-logged-in")
const newParkForm = document.querySelector('#new-park-form')


userSignupForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const username = formData.get("username")
    const password = formData.get("password")

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({ username, password }), 
    }).then(() => {
        alert("Log in was sucessfully created!")
        window.location.reload()
    })
})

function setLogIn() {
    isLoggedIn.textContent = localStorage.getItem("token")
    ? "You are logged in."
    : "No user is logged in."
}
setLogIn()

userLoginForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const username = formData.get("username")
    const password = formData.get("password")

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({ username, password }), 
    }).then(response => response.json())
    .then(response => {
        const { token, username } = response 
        localStorage.setItem("token", token)
        localStorage.setItem("username", username)
        setLogIn()
    })
})
    
function isLoggedOut(){
    localStorage.removeItem("token")
    setLogIn()
}

fetch(parksURL)
    .then(response => response.json())
    .then(parks => parks.map(showPark))


function showPark(park) {
    const parkCard = document.createElement("div")
    parkCard.id = "park-card"
    
    // park.alerts.map(alert => {
    //     // console.log(alert)
    //     const alertTitle = document.createElement("li")
    //     const alertdescription = document.createElement("li")
    //     // const alertdescription = document.createElement("h4")

    //     alertTitle.innerText = "Alert Title:" + " " + alert.title 
    //     alertdescription.innerText = "Alert Description:" + " " + alert.description

    const name = document.createElement('h3')
    const button = document.createElement('button')
    // const state = document.createElement('li')

    name.innerHTML = `<a href=show.html?id=${park.id}>${park.name}</a>`
    button.textContent = "Delete Park"

    button.addEventListener('click', () => {
           parkCard.remove()
    
            fetch(parksURL + park.id, {
                method: "DELETE"
            })
        })
    // state.innerHTML = "State:" + " " + park.state

    parkCard.append(name, button)
        // alertTitle, alertdescription)
    document.body.append(parkCard)   

    


        // console.log(alert.title)
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
            const newPark = {state, url, weather,name, lat_long, description}
        
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