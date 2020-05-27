// import Brusher from 'brusher';
// const brusher = new Brusher({
//     image: 'https://images.unsplash.com/photo-1580130718810-358e5e8af61b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1372&q=80', // Path of the image to be used as a brush
//     keepCleared: true,     // Put the blur back after user has cleared it
//     stroke: 80,            // Stroke size for the brush
//     lineStyle: 'round',    // Brush style (round, square, butt)
//     autoBlur: false,       // Brusher will use the provided image for the blurry background
//     autoBlurValue: 15,     // Blur strength in pixels
//   });
  
//   brusher.init();
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
    }).then(() => alert("Your username has been updated"))
})

logout.addEventListener("click", () => {
    localStorage.removeItem("token")
})