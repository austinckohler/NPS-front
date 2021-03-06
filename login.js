
const brusher = new Brusher({
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80', // Path of the image to be used as a brush
    keepCleared: true,     // Put the blur back after user has cleared it
    stroke: 80,            // Stroke size for the brush
    lineStyle: 'round',    // Brush style (round, square, butt)
    autoBlur: true,       // Brusher will use the provided image for the blurry background
    autoBlurValue: 3,     // Blur strength in pixels
  });
  
  brusher.init();

const userSignupForm = document.querySelector("#new-user")
const userLoginForm = document.querySelector("#login")
const isLoggedIn = document.querySelector(".is-logged-in")
const logoutButton = document.querySelector("#logout-button")

const navSlide = () => {
    const burger = document.querySelector(".burger")
    const nav = document.querySelector(".nav-links")
    const navLinks = document.querySelectorAll(".nav-links li") //toggles nav
    burger.addEventListener("click", () => {
        nav.classList.toggle('nav-active')
        navLinks.forEach((link, index) => {   //animates links
        if(link.style.animation){
            link.style.animation = ''
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.6}s`
        }
    })
    // burger animation
    burger.classList.toggle("toggle")
    }) 
}
navSlide()
userSignupForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const username = formData.get("username")
    const password = formData.get("password")
    const user = {
        username: username,
        password: password,
    }
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(user), 
    }).then(response => response.json())
    .then(result => {
        if (result.username) {
            const sucessCreating = document.createElement("p")
            sucessCreating.textContent = result.username
            userSignupForm.append(sucessCreating)
        }event.target.reset()
    })
})

function setLogIn() {
    isLoggedIn.textContent = localStorage.getItem("token")
    ? `${localStorage.getItem("username")}, you are logged in.`
    : "No user is logged in."
}
setLogIn()

userLoginForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const username = formData.get("username")
    const password = formData.get("password")
    const user = {
        username: username,
        password: password
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(user), 
    }).then(response => response.json())
    .then(result => {         
        if (result.token) {
            const { token, username, user_id } = result
            const sucessMessage = document.createElement("p")
            localStorage.setItem("token", token)
            localStorage.setItem("username", username)
            localStorage.setItem("user_id", user_id)
            sucessMessage.innerHTML = `${localStorage.getItem("username")}, ${result.message}`
            userLoginForm.append(sucessMessage)
           setLogIn()
        } else {
            const errorMessage = document.createElement("p")
            errorMessage.innerHTML = result.message
            userLoginForm.append(errorMessage)
        } event.target.reset() 
    })
})

logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token")
    logoutButton.innerHTML = "Logout"
    userLoginForm.append(logoutButton)
    setLogIn()
})

function isLoggedOut(){
    localStorage.removeItem("token")
    setLogIn()
}
