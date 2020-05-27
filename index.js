const parksURL = 'http://localhost:3000/parks/'
const ul = document.createElement("ul")
const userSignupForm = document.querySelector("#new-user")
const userLoginForm = document.querySelector("#login")
const isLoggedIn = document.querySelector(".is-logged-in")


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
    
    park.alerts.map(alert => {
        // console.log(alert)
        const alertTitle = document.createElement("li")
        const alertdescription = document.createElement("li")
        // const alertdescription = document.createElement("h4")

        alertTitle.innerText = "Alert Title:" + " " + alert.title 
        alertdescription.innerText = "Alert Description:" + " " + alert.description

    const name = document.createElement('h3')
    const state = document.createElement('li')

    name.innerHTML = park.name
    console.log(name)
    state.innerHTML = "State:" + " " + park.state

    parkCard.append(name, ul, state, alertTitle, alertdescription)
    document.body.append(parkCard)   

    


        console.log(alert.title)
    })
}