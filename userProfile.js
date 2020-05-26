const updateUsername = document.querySelector("#update-username")
const personalInfo = document.querySelector("#personal-info")
guardPage()

username.value = localStorage.getItem("username")

fetch("http://localhost:3000/userProfiles", {
    headers: {
        Authorization: `bearer ${localstorage.getItem("token")}`,
    }
}).then(response => response.json())
    .then(response => {
        personalInfo.textContent = response.personal-info
    })

function guardPage() {
    if (!localStorage.getItem("token")){
            window.location.href = "/"
    }
}
    
updateUsername.addEventListener("submit", (event) => {
    event.preventDefault()
    fetch("http://locahost:3000/userProfiles", {
        method: "PUT",
        headers: {
            Authorization: `bearer ${localstorage.getItem("token")}`,
        }
    }).then(() => window.location.href = "/")
})