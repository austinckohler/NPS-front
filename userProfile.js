const updateUsername = document.querySelector("#update-username")
const personalInfo = document.querySelector("#personal-info")
const username = document.querySelector(".username")
const logout = document.querySelector("#logout")
guardPage()

username.value = localStorage.getItem("username")

fetch("http://localhost:3000/user-profiles", {
    headers: {
        "Authorization": `bearer ${localStorage.getItem("token")}`,
    }
}).then(response => response.json())
    .then(response => {
        personalInfo.textContent = response.message
    })

function guardPage() {
    if (!localStorage.getItem("token")){
            window.location.href = "/"
    }
}
    
updateUsername.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const username = formData.get("username")

    fetch("http://localhost:3000/user-profiles", {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ username})
    }).then(() => alert(`${localStorage.getItem("username")}, your infomation has been updated`))
})

logout.addEventListener("click", () => {
    localStorage.removeItem("token")
})