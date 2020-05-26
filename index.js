const userSignupForm = document.querySelector("#new-user")

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