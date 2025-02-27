document.addEventListener("DOMContentLoaded", () => {
    fetch("https://my-json-server.typicode.com/IanNjeru17/db.json/buses")
        .then((response) => response.json())
        .then((buses) => {
            displayBusesMenu(buses);
        });

});

// Create busDetailContainer variable
const busDetailContainer = document.getElementById("buses-info");

function displayBusesMenu(buses) {
    const busesUl = document.getElementById("busesSideBar");
    busesUl.innerHTML = ""; // Clear any existing item
    buses.forEach((busList) => {
        const li = document.createElement("li");
        li.className = "bus-item"; // madrista
        li.innerText = busList.reg;
        li.addEventListener("click", () => displayBusesDetails(busList));
        busesUl.appendChild(li);
    });
}

function displayBusesDetails(busList) {
    busDetailContainer.innerHTML = ""; // Clear

    const poster = document.createElement("img");
    poster.src = busList.poster;

    // Create h2 for registration
    const reg = document.createElement("h2");
    reg.innerText = busList.reg;

    // Create departure paragraph
    const departure = document.createElement("p");
    departure.innerText = `Departure: ${busList.departure}`;

    // pick up point
    const description = document.createElement("p");
    description.innerText = `Pick Up: ${busList.description}`;

    // Create available seats
    const availableSeats = busList.capacity - busList.seats_booked;
    const seats = document.createElement("p");
    seats.innerText = `Available Seats: ${availableSeats}`;

    // Create button
    const buyTicketButton = document.createElement("button");
    buyTicketButton.id = "buy-ticket";
    buyTicketButton.innerText = availableSeats === 0 ? "Booked out" : "Book";

    buyTicketButton.addEventListener("click", () => {
        if (availableSeats > 0) {
            busList.seats_booked += 1;
            seats.innerText = `Available Seats: ${busList.capacity - busList.seats_booked}`;
            buyTicketButton.innerText = busList.capacity - busList.seats_booked === 0 ? "Booked Out" : "Book";
            buyTicketButton.disabled = busList.capacity - busList.seats_booked === 0;
        }
    });

    busDetailContainer.appendChild(poster);
    busDetailContainer.appendChild(reg);
    busDetailContainer.appendChild(departure);
    busDetailContainer.appendChild(description);
    busDetailContainer.appendChild(seats);
    busDetailContainer.appendChild(buyTicketButton);
}
