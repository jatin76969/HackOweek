# Travel Planner - Algorithm Documentation

## 📐 Algorithm Overview

The Travel Planner uses a **simple linear cost calculation algorithm** combined with **data retrieval algorithms** to provide trip planning information.

---

## 🔢 Main Algorithm: Trip Cost Calculation

### Algorithm Name: `calculateTrip()`

### Purpose:
Calculate the total estimated cost of a trip based on destination and duration.

### Input:
- `selectedDestination` (String): Key of the chosen destination
- `numberOfDays` (Integer): Duration of the trip in days

### Output:
- Total trip cost breakdown
- Day-wise itinerary
- Tourist places list
- Best season information

### Algorithm Steps:

```
ALGORITHM: Calculate Trip Cost

INPUT: destination, days
OUTPUT: cost breakdown, itinerary, tourist info, season

BEGIN
    1. START
    
    2. VALIDATE INPUTS
       IF destination is empty THEN
           DISPLAY "Please select a destination"
           RETURN
       END IF
       
       IF days < 1 OR days > 30 THEN
           DISPLAY "Please enter valid number of days (1-30)"
           RETURN
       END IF
    
    3. RETRIEVE DESTINATION DATA
       destinationData ← GET data from database using destination key
    
    4. CALCULATE COSTS
       travelCost ← destinationData.travelCost
       stayCost ← destinationData.stayPerDay × days
       foodCost ← destinationData.foodPerDay × days
       transportCost ← destinationData.localTransportPerDay × days
       totalCost ← travelCost + stayCost + foodCost + transportCost
    
    5. DISPLAY COST BREAKDOWN
       CALL displayCostBreakdown(travelCost, stayCost, foodCost, transportCost, totalCost, days)
    
    6. GENERATE ITINERARY
       CALL displayItinerary(destinationData, days)
    
    7. DISPLAY TOURIST PLACES
       CALL displayTouristPlaces(destinationData.touristPlaces)
    
    8. DISPLAY SEASON INFORMATION
       CALL displayBestSeason(destinationData.bestSeason)
    
    9. SHOW RESULTS SECTION
       Make results section visible
       Scroll to results section
    
    10. END

END ALGORITHM
```

---

## 📊 Sub-Algorithm 1: Cost Breakdown Display

### Algorithm Name: `displayCostBreakdown()`

```
ALGORITHM: Display Cost Breakdown

INPUT: travel, stay, food, transport, total, days
OUTPUT: Formatted cost display

BEGIN
    1. CREATE HTML structure for cost items
    
    2. FOR each cost component DO
           CREATE cost item element
           SET label (e.g., "Travel Cost")
           SET value (formatted with ₹ symbol)
           ADD to display
       END FOR
    
    3. CREATE total cost element
       FORMAT total with currency symbol
       HIGHLIGHT with special styling
    
    4. INSERT all elements into DOM
    
    5. RETURN

END ALGORITHM
```

---

## 🗓️ Sub-Algorithm 2: Itinerary Generation

### Algorithm Name: `displayItinerary()`

```
ALGORITHM: Display Day-wise Itinerary

INPUT: destination, numberOfDays
OUTPUT: Day-wise activity list

BEGIN
    1. INITIALIZE empty itinerary HTML
    
    2. FOR day = 1 TO numberOfDays DO
           IF predefined itinerary exists for day THEN
               activities ← destination.itinerary[day]
           ELSE
               activities ← "Explore [destination], visit local attractions"
           END IF
           
           CREATE day element with:
               - Day number
               - Activities description
           
           ADD to itinerary HTML
       END FOR
    
    3. INSERT itinerary HTML into DOM
    
    4. RETURN

END ALGORITHM
```

---

## 🏛️ Sub-Algorithm 3: Tourist Places Display

### Algorithm Name: `displayTouristPlaces()`

```
ALGORITHM: Display Tourist Places

INPUT: places (Array of Strings)
OUTPUT: Grid of tourist places

BEGIN
    1. INITIALIZE empty places HTML
    
    2. FOR each place IN places DO
           CREATE place element
           ADD location icon
           ADD place name
           ADD to places HTML
       END FOR
    
    3. CREATE grid layout
    
    4. INSERT into DOM
    
    5. RETURN

END ALGORITHM
```

---

## 🌤️ Sub-Algorithm 4: Season Display

### Algorithm Name: `displayBestSeason()`

```
ALGORITHM: Display Best Season

INPUT: season (String)
OUTPUT: Formatted season information

BEGIN
    1. CREATE season info element
    
    2. FORMAT season text with highlighting
    
    3. ADD descriptive text
    
    4. INSERT into DOM
    
    5. RETURN

END ALGORITHM
```

---

## 🔍 Input Validation Algorithm

```
ALGORITHM: Validate User Input

INPUT: destination, days
OUTPUT: Boolean (valid/invalid)

BEGIN
    1. CHECK destination
       IF destination is empty OR null THEN
           RETURN false
       END IF
    
    2. CHECK days
       IF days is not a number THEN
           RETURN false
       END IF
       
       IF days < 1 OR days > 30 THEN
           RETURN false
       END IF
    
    3. RETURN true

END ALGORITHM
```

---

## 📈 Complexity Analysis

### Time Complexity:

| Operation | Complexity | Explanation |
|-----------|-----------|-------------|
| **Input Validation** | O(1) | Constant time checks |
| **Data Retrieval** | O(1) | Direct object access by key |
| **Cost Calculation** | O(1) | Four arithmetic operations |
| **Itinerary Generation** | O(n) | Loop through n days |
| **Tourist Places Display** | O(m) | Loop through m places |
| **Overall** | **O(n + m)** | Linear in days and places |

Where:
- n = number of days
- m = number of tourist places

### Space Complexity:

| Component | Complexity | Explanation |
|-----------|-----------|-------------|
| **Destination Database** | O(d × p) | d destinations, p places each |
| **Temporary Variables** | O(1) | Fixed number of variables |
| **DOM Elements** | O(n + m) | Elements for days and places |
| **Overall** | **O(d × p + n + m)** | Dominated by database size |

---

## 🎯 Algorithm Characteristics

### Advantages:
1. **Simple**: Easy to understand and implement
2. **Fast**: O(n) time complexity for n days
3. **Predictable**: Deterministic output
4. **Scalable**: Easy to add more destinations
5. **Maintainable**: Clear separation of concerns

### Limitations:
1. **Static Data**: No dynamic price updates
2. **Linear Scaling**: Assumes constant daily costs
3. **No Optimization**: Doesn't find cheapest options
4. **Fixed Itinerary**: Predefined activities only

---

## 🔄 Data Flow Diagram

```
User Input (Destination + Days)
         ↓
   Input Validation
         ↓
   Retrieve Destination Data
         ↓
   Calculate Costs
    ↓    ↓    ↓    ↓
Travel Stay Food Transport
    ↓    ↓    ↓    ↓
      Total Cost
         ↓
   Display Results
    ↓    ↓    ↓    ↓
Cost  Itinerary Places Season
```

---

## 💻 Pseudocode (Complete)

```pseudocode
PROGRAM TravelPlanner

// Global Variables
DECLARE destinationsDB as Object
DECLARE selectedDestination as String
DECLARE numberOfDays as Integer

// Main Function
FUNCTION main()
    INITIALIZE user interface
    ATTACH event listeners
    WAIT for user interaction
END FUNCTION

// Event Handler
FUNCTION onCalculateButtonClick()
    selectedDestination ← GET value from dropdown
    numberOfDays ← GET value from input field
    
    IF validateInput(selectedDestination, numberOfDays) THEN
        calculateTrip(selectedDestination, numberOfDays)
    ELSE
        SHOW error message
    END IF
END FUNCTION

// Validation Function
FUNCTION validateInput(dest, days)
    IF dest is empty THEN
        RETURN false
    END IF
    
    IF days < 1 OR days > 30 THEN
        RETURN false
    END IF
    
    RETURN true
END FUNCTION

// Main Calculation Function
FUNCTION calculateTrip(dest, days)
    data ← destinationsDB[dest]
    
    // Calculate costs
    travel ← data.travelCost
    stay ← data.stayPerDay × days
    food ← data.foodPerDay × days
    transport ← data.localTransportPerDay × days
    total ← travel + stay + food + transport
    
    // Display results
    displayCostBreakdown(travel, stay, food, transport, total, days)
    displayItinerary(data, days)
    displayTouristPlaces(data.touristPlaces)
    displayBestSeason(data.bestSeason)
    
    SHOW results section
END FUNCTION

// Display Functions
FUNCTION displayCostBreakdown(travel, stay, food, transport, total, days)
    CREATE HTML elements
    FORMAT currency values
    INSERT into DOM
END FUNCTION

FUNCTION displayItinerary(data, days)
    FOR i = 1 TO days DO
        IF data.itinerary[i] exists THEN
            activity ← data.itinerary[i]
        ELSE
            activity ← default message
        END IF
        CREATE day element
        ADD to display
    END FOR
END FUNCTION

FUNCTION displayTouristPlaces(places)
    FOR each place IN places DO
        CREATE place element
        ADD to grid
    END FOR
    INSERT grid into DOM
END FUNCTION

FUNCTION displayBestSeason(season)
    CREATE season element
    FORMAT with highlighting
    INSERT into DOM
END FUNCTION

END PROGRAM
```

---

## 📝 Mathematical Formula

### Total Trip Cost Formula:

```
Total Cost = TC + (SC × D) + (FC × D) + (LT × D)

Where:
TC = Travel Cost (round trip)
SC = Stay Cost per day
FC = Food Cost per day
LT = Local Transport cost per day
D  = Number of Days
```

### Example Calculation:

For Goa, 3 days:
```
TC = ₹3,000
SC = ₹2,000
FC = ₹800
LT = ₹500
D  = 3

Total = 3000 + (2000 × 3) + (800 × 3) + (500 × 3)
      = 3000 + 6000 + 2400 + 1500
      = ₹12,900
```

---

## 🎓 Key Algorithmic Concepts Used

1. **Sequential Processing**: Step-by-step execution
2. **Conditional Logic**: Input validation
3. **Iteration**: Looping through days and places
4. **Data Structures**: Objects and Arrays
5. **Function Decomposition**: Modular design
6. **String Manipulation**: Formatting output
7. **DOM Manipulation**: Dynamic UI updates

---

**Algorithm Complexity**: Beginner Level  
**Suitable For**: 2nd Semester Engineering Students  
**Concepts Covered**: Basic algorithms, data structures, web programming
