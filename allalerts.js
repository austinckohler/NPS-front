const alertsURL = 'http://localhost:3000/alerts/'
const ul = document.createElement("ul")
const wrapper = document.querySelector(".wrapper")

fetch(alertsURL)
    .then(response => response.json())
    .then(showAlerts)

function showAlerts(alerts) {
    alerts.forEach(alert => {
        const alertsCard = document.createElement("div")
        alertsCard.id = "alerts-card"
        const parkName = document.createElement("h2")
        const title = document.createElement('h5')
        const description = document.createElement('p')
        const category = document.createElement('li')
        
        parkName.innerHTML = alert.park.name
        title.innerHTML = alert.title
        description.innerHTML = alert.description
        category.innerHTML = alert.category

        alertsCard.append(parkName, title, description, category)
        wrapper.append(alertsCard)  
    }
    )}

 