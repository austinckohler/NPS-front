const params = window.location.search
const searchParams = new URLSearchParams(params)
const id = searchParams.get("id")
const parksURL = `http://localhost:3000/parks/${id}`

fetch(parksURL)
    .then(response => response.json())
    .then(showAlerts)

function showAlerts(parks) {
    const alertCard = document.createElement("div")
    alertCard.id = "alert-card"
    parks.alerts.forEach(alert => {
        const alertCard = document.createElement('div')
        const alertTitle = document.createElement('h4')
        const alertDescription = document.createElement('h4')
        const alertCategory = document.createElement('h5')

    alertTitle.textContent = alert.title
    alertDescription.textContent = "Description:" + " " + alert.description
    alertCategory.textContent = "Alert Category:" + " " + alert.category

    alertCard.append(alertTitle, alertDescription, alertCategory)
    document.body.append(alertCard)

    });
}