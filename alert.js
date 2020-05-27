const parksURL = 'http://localhost:3000/parks/'

fetch(parksURL)
    .then(response => response.json())
    .then(parks => parks.map(showPark))
park.alerts.map(alert => {
    // console.log(alert)
    const alertTitle = document.createElement("h2")
    const alertdescription = document.createElement("h3")
    // const alertdescription = document.createElement("h4")

    alertTitle.innerText = "Alert Title:" + " " + alert.title 
    alertdescription.innerText = "Alert Description:" + " " + alert.description

    document.body.append(alertTitle, alertdescription)
})