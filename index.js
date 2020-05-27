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
