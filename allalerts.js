const alertsURL = 'http://localhost:3000/alerts/'
const ul = document.createElement("ul")


fetch(alertsURL)
    .then(response => response.json())
    .then(showAlerts)

function showAlerts(alerts) {
    alerts.forEach(alert => {
        const alertsCard = document.createElement("div")
        alertsCard.id = "alert-card"
        const parkName = document.createElement("h2")
        const title = document.createElement('h5')
        const description = document.createElement('p')
        const category = document.createElement('li')
        
        parkName.innerHTML = alert.park.name
        title.innerHTML = alert.title
        description.innerHTML = alert.description
        category.innerHTML = alert.category

        alertsCard.append(parkName)
        parkName.append(title, description, category)
        document.body.append(alertsCard)  
    }
    )}

 