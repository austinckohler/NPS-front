const userSignupForm = document.querySelector("#new-user")
const userLoginForm = document.querySelector("#login")
const isLoggedIn = document.querySelector(".is-logged-in")
const logout = document.querySelector("#logout")

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
        window.location.reload()
    })
})

function isLoggedIn() {
    isLoggedIn.textContent = localStorage.getItem("token")
    ? "You are logged in."
    : "No user is logged in."
}

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
            const { token } = response 
            localStorage.setItem("token", token)
            isLoggedIn()
        })
})
    
function isLoggedOut(){
    localStorage.removeItem("token")
    isLoggedIn()
}

logout.addEventListener("click", () => {
    isLoggedOut()
    isLoggedIn()
})