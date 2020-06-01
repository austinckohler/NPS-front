const params = window.location.search
const searchParams = new URLSearchParams(params)
const id = searchParams.get("id")
const parksURL = `http://localhost:3000/parks/${id}`
const alertContainer = document.createElement("div")
alertContainer.id = "alert-container"
const wrapper = document.querySelector(".wrapper")

fetch(parksURL)
    .then(response => response.json())
    .then(showAlerts)


    
function showAlerts(parks) {
    const alertCard = document.createElement("div")
    alertCard.id = "alert-card"
    parks.alerts.forEach(alert => {
       
        const alertTitle = document.createElement('h4')
        const alertDescription = document.createElement('p')
        const alertCategory = document.createElement('p')

    alertTitle.textContent = alert.title
    alertDescription.textContent = "Description:" + " " + alert.description
    alertCategory.textContent = "Alert Category:" + " " + alert.category
    
    alertContainer.append(alertCard)
    alertCard.append(alertTitle, alertDescription, alertCategory)
    // document.body.append(alertContainer)
    wrapper.append(alertContainer)
    });
}