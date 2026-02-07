// Hardcoded destination database with all travel information
const destinationsDB = {
    goa: {
        name: "Goa",
        travelCost: 3000,
        stayPerDay: 2000,
        foodPerDay: 800,
        localTransportPerDay: 500,
        touristPlaces: [
            "Baga Beach",
            "Calangute Beach",
            "Fort Aguada",
            "Basilica of Bom Jesus",
            "Dudhsagar Falls",
            "Anjuna Flea Market"
        ],
        bestSeason: "November to February",
        itinerary: {
            1: "Arrival, check-in hotel, visit Baga Beach, evening at Calangute Beach",
            2: "Fort Aguada in morning, Basilica of Bom Jesus, shopping at local markets",
            3: "Full day trip to Dudhsagar Falls",
            4: "Water sports at Baga Beach, visit Anjuna Flea Market",
            5: "Explore South Goa beaches, relax and departure"
        }
    },
    manali: {
        name: "Manali",
        travelCost: 4000,
        stayPerDay: 1800,
        foodPerDay: 600,
        localTransportPerDay: 700,
        touristPlaces: [
            "Rohtang Pass",
            "Solang Valley",
            "Hadimba Temple",
            "Manu Temple",
            "Old Manali",
            "Vashisht Hot Springs"
        ],
        bestSeason: "October to June",
        itinerary: {
            1: "Arrival, check-in, visit Mall Road and local markets",
            2: "Full day excursion to Rohtang Pass (snow activities)",
            3: "Solang Valley for adventure sports (paragliding, zorbing)",
            4: "Visit Hadimba Temple, Manu Temple, explore Old Manali",
            5: "Vashisht Hot Springs, shopping, and departure"
        }
    },
    jaipur: {
        name: "Jaipur",
        travelCost: 2500,
        stayPerDay: 1500,
        foodPerDay: 500,
        localTransportPerDay: 400,
        touristPlaces: [
            "Amber Fort",
            "City Palace",
            "Hawa Mahal",
            "Jantar Mantar",
            "Jal Mahal",
            "Nahargarh Fort"
        ],
        bestSeason: "November to March",
        itinerary: {
            1: "Arrival, visit Hawa Mahal, City Palace, local bazaars",
            2: "Full day at Amber Fort, elephant ride, Jal Mahal view",
            3: "Jantar Mantar, Nahargarh Fort sunset view",
            4: "Shopping at Johari Bazaar, Bapu Bazaar, departure"
        }
    },
    kerala: {
        name: "Kerala",
        travelCost: 3500,
        stayPerDay: 2200,
        foodPerDay: 700,
        localTransportPerDay: 600,
        touristPlaces: [
            "Alleppey Backwaters",
            "Munnar Tea Gardens",
            "Kovalam Beach",
            "Periyar Wildlife Sanctuary",
            "Fort Kochi",
            "Athirapally Falls"
        ],
        bestSeason: "September to March",
        itinerary: {
            1: "Arrival in Kochi, visit Fort Kochi, Chinese fishing nets",
            2: "Drive to Munnar, tea garden visit, evening at leisure",
            3: "Munnar sightseeing, visit tea museum and viewpoints",
            4: "Travel to Alleppey, houseboat stay in backwaters",
            5: "Kovalam Beach, relax and departure"
        }
    },
    agra: {
        name: "Agra",
        travelCost: 2000,
        stayPerDay: 1200,
        foodPerDay: 450,
        localTransportPerDay: 350,
        touristPlaces: [
            "Taj Mahal",
            "Agra Fort",
            "Fatehpur Sikri",
            "Mehtab Bagh",
            "Itmad-ud-Daulah",
            "Akbar's Tomb"
        ],
        bestSeason: "October to March",
        itinerary: {
            1: "Arrival, visit Agra Fort, Mehtab Bagh sunset view of Taj",
            2: "Early morning Taj Mahal visit, Itmad-ud-Daulah",
            3: "Day trip to Fatehpur Sikri, Akbar's Tomb, shopping and departure"
        }
    },
    shimla: {
        name: "Shimla",
        travelCost: 3800,
        stayPerDay: 1600,
        foodPerDay: 550,
        localTransportPerDay: 450,
        touristPlaces: [
            "Mall Road",
            "The Ridge",
            "Jakhu Temple",
            "Kufri",
            "Christ Church",
            "Scandal Point"
        ],
        bestSeason: "March to June, December to February",
        itinerary: {
            1: "Arrival, check-in, evening walk on Mall Road and The Ridge",
            2: "Visit Jakhu Temple, Christ Church, Scandal Point",
            3: "Full day excursion to Kufri (adventure activities)",
            4: "Shopping at Lakkar Bazaar, local sightseeing, departure"
        }
    }
};

// Get DOM elements
const destinationSelect = document.getElementById('destination');
const daysInput = document.getElementById('days');
const calculateBtn = document.getElementById('calculateBtn');
const resultsSection = document.getElementById('results');
const costBreakdownDiv = document.getElementById('costBreakdown');
const itineraryDiv = document.getElementById('itinerary');
const touristPlacesDiv = document.getElementById('touristPlaces');
const bestSeasonDiv = document.getElementById('bestSeason');

// Event listener for calculate button
calculateBtn.addEventListener('click', calculateTrip);

// Allow Enter key to trigger calculation
daysInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateTrip();
    }
});

// Main calculation function
function calculateTrip() {
    // Get user inputs
    const selectedDestination = destinationSelect.value;
    const numberOfDays = parseInt(daysInput.value);

    // Input validation
    if (!selectedDestination) {
        alert('Please select a destination!');
        return;
    }

    if (!numberOfDays || numberOfDays < 1 || numberOfDays > 30) {
        alert('Please enter a valid number of days (1-30)!');
        return;
    }

    // Get destination data
    const destination = destinationsDB[selectedDestination];

    // Calculate costs
    const travelCost = destination.travelCost;
    const stayCost = destination.stayPerDay * numberOfDays;
    const foodCost = destination.foodPerDay * numberOfDays;
    const localTransportCost = destination.localTransportPerDay * numberOfDays;
    const totalCost = travelCost + stayCost + foodCost + localTransportCost;

    // Display results
    displayCostBreakdown(travelCost, stayCost, foodCost, localTransportCost, totalCost, numberOfDays);
    displayItinerary(destination, numberOfDays);
    displayTouristPlaces(destination.touristPlaces);
    displayBestSeason(destination.bestSeason);

    // Show results section with smooth scroll
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Display cost breakdown
function displayCostBreakdown(travel, stay, food, transport, total, days) {
    costBreakdownDiv.innerHTML = `
        <div class="cost-item">
            <span class="cost-label">Travel Cost (Round Trip):</span>
            <span class="cost-value">₹${travel.toLocaleString()}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Stay Cost (${days} ${days === 1 ? 'day' : 'days'}):</span>
            <span class="cost-value">₹${stay.toLocaleString()}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Food Cost (${days} ${days === 1 ? 'day' : 'days'}):</span>
            <span class="cost-value">₹${food.toLocaleString()}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Local Transport (${days} ${days === 1 ? 'day' : 'days'}):</span>
            <span class="cost-value">₹${transport.toLocaleString()}</span>
        </div>
        <div class="total-cost">
            Total Estimated Cost: ₹${total.toLocaleString()}
        </div>
    `;
}

// Display day-wise itinerary
function displayItinerary(destination, days) {
    let itineraryHTML = '';
    
    for (let day = 1; day <= days; day++) {
        // Use predefined itinerary or create generic one
        const activities = destination.itinerary[day] || 
            `Explore ${destination.name}, visit local attractions and enjoy the culture`;
        
        itineraryHTML += `
            <div class="itinerary-day">
                <div class="day-title">Day ${day}</div>
                <div class="day-activities">${activities}</div>
            </div>
        `;
    }
    
    itineraryDiv.innerHTML = itineraryHTML;
}

// Display tourist places
function displayTouristPlaces(places) {
    const placesHTML = places.map(place => 
        `<div class="place-item">${place}</div>`
    ).join('');
    
    touristPlacesDiv.innerHTML = `<div class="places-grid">${placesHTML}</div>`;
}

// Display best season
function displayBestSeason(season) {
    bestSeasonDiv.innerHTML = `
        <div class="season-info">
            The best time to visit is during 
            <span class="season-highlight">${season}</span>
            for pleasant weather and optimal travel experience.
        </div>
    `;
}

// Add smooth animations on page load
window.addEventListener('load', function() {
    document.querySelector('.container').style.opacity = '1';
});
