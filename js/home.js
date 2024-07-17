document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/buses")
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

    // Create available seats
    const availableSeats = busList.capacity - busList.seats_booked;
    const seats = document.createElement("p");
    seats.innerText = `Available Seats: ${availableSeats}`;

    // Create button
    const buyTicketButton = document.createElement("button");
    buyTicketButton.id = "buy-ticket";
    buyTicketButton.innerText = availableSeats === 0 ? "Sold out" : "Buy Ticket";

    buyTicketButton.addEventListener("click", () => {
        if (availableSeats > 0) {
            busList.seats_booked += 1;
            seats.innerText = `Available Seats: ${busList.capacity - busList.seats_booked}`;
            buyTicketButton.innerText = busList.capacity - busList.seats_booked === 0 ? "Sold Out" : "Buy Ticket";
        }
    });

    busDetailContainer.appendChild(poster);
    busDetailContainer.appendChild(reg);
    busDetailContainer.appendChild(departure);
    busDetailContainer.appendChild(seats);
    busDetailContainer.appendChild(buyTicketButton);
}
