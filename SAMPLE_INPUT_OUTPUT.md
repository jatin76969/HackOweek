# Travel Planner - Sample Input/Output

## 📝 Test Cases and Expected Results

---

## Test Case 1: Goa - 3 Days Trip

### Input:
```
Destination: Goa
Number of Days: 3
```

### Expected Output:

#### 💰 Cost Breakdown:
```
Travel Cost (Round Trip):        ₹3,000
Stay Cost (3 days):              ₹6,000
Food Cost (3 days):              ₹2,400
Local Transport (3 days):        ₹1,500
─────────────────────────────────────────
Total Estimated Cost:            ₹12,900
```

#### 📅 Day-wise Itinerary:
```
Day 1: Arrival, check-in hotel, visit Baga Beach, evening at Calangute Beach
Day 2: Fort Aguada in morning, Basilica of Bom Jesus, shopping at local markets
Day 3: Full day trip to Dudhsagar Falls
```

#### 🏛️ Famous Tourist Places:
- Baga Beach
- Calangute Beach
- Fort Aguada
- Basilica of Bom Jesus
- Dudhsagar Falls
- Anjuna Flea Market

#### 🌤️ Best Season to Visit:
```
November to February
```

---

## Test Case 2: Manali - 5 Days Trip

### Input:
```
Destination: Manali
Number of Days: 5
```

### Expected Output:

#### 💰 Cost Breakdown:
```
Travel Cost (Round Trip):        ₹4,000
Stay Cost (5 days):              ₹9,000
Food Cost (5 days):              ₹3,000
Local Transport (5 days):        ₹3,500
─────────────────────────────────────────
Total Estimated Cost:            ₹19,500
```

#### 📅 Day-wise Itinerary:
```
Day 1: Arrival, check-in, visit Mall Road and local markets
Day 2: Full day excursion to Rohtang Pass (snow activities)
Day 3: Solang Valley for adventure sports (paragliding, zorbing)
Day 4: Visit Hadimba Temple, Manu Temple, explore Old Manali
Day 5: Vashisht Hot Springs, shopping, and departure
```

#### 🏛️ Famous Tourist Places:
- Rohtang Pass
- Solang Valley
- Hadimba Temple
- Manu Temple
- Old Manali
- Vashisht Hot Springs

#### 🌤️ Best Season to Visit:
```
October to June
```

---

## Test Case 3: Jaipur - 4 Days Trip

### Input:
```
Destination: Jaipur
Number of Days: 4
```

### Expected Output:

#### 💰 Cost Breakdown:
```
Travel Cost (Round Trip):        ₹2,500
Stay Cost (4 days):              ₹6,000
Food Cost (4 days):              ₹2,000
Local Transport (4 days):        ₹1,600
─────────────────────────────────────────
Total Estimated Cost:            ₹12,100
```

#### 📅 Day-wise Itinerary:
```
Day 1: Arrival, visit Hawa Mahal, City Palace, local bazaars
Day 2: Full day at Amber Fort, elephant ride, Jal Mahal view
Day 3: Jantar Mantar, Nahargarh Fort sunset view
Day 4: Shopping at Johari Bazaar, Bapu Bazaar, departure
```

#### 🏛️ Famous Tourist Places:
- Amber Fort
- City Palace
- Hawa Mahal
- Jantar Mantar
- Jal Mahal
- Nahargarh Fort

#### 🌤️ Best Season to Visit:
```
November to March
```

---

## Test Case 4: Kerala - 5 Days Trip

### Input:
```
Destination: Kerala
Number of Days: 5
```

### Expected Output:

#### 💰 Cost Breakdown:
```
Travel Cost (Round Trip):        ₹3,500
Stay Cost (5 days):              ₹11,000
Food Cost (5 days):              ₹3,500
Local Transport (5 days):        ₹3,000
─────────────────────────────────────────
Total Estimated Cost:            ₹21,000
```

#### 📅 Day-wise Itinerary:
```
Day 1: Arrival in Kochi, visit Fort Kochi, Chinese fishing nets
Day 2: Drive to Munnar, tea garden visit, evening at leisure
Day 3: Munnar sightseeing, visit tea museum and viewpoints
Day 4: Travel to Alleppey, houseboat stay in backwaters
Day 5: Kovalam Beach, relax and departure
```

#### 🏛️ Famous Tourist Places:
- Alleppey Backwaters
- Munnar Tea Gardens
- Kovalam Beach
- Periyar Wildlife Sanctuary
- Fort Kochi
- Athirapally Falls

#### 🌤️ Best Season to Visit:
```
September to March
```

---

## Test Case 5: Agra - 2 Days Trip

### Input:
```
Destination: Agra
Number of Days: 2
```

### Expected Output:

#### 💰 Cost Breakdown:
```
Travel Cost (Round Trip):        ₹2,000
Stay Cost (2 days):              ₹2,400
Food Cost (2 days):              ₹900
Local Transport (2 days):        ₹700
─────────────────────────────────────────
Total Estimated Cost:            ₹6,000
```

#### 📅 Day-wise Itinerary:
```
Day 1: Arrival, visit Agra Fort, Mehtab Bagh sunset view of Taj
Day 2: Early morning Taj Mahal visit, Itmad-ud-Daulah
```

#### 🏛️ Famous Tourist Places:
- Taj Mahal
- Agra Fort
- Fatehpur Sikri
- Mehtab Bagh
- Itmad-ud-Daulah
- Akbar's Tomb

#### 🌤️ Best Season to Visit:
```
October to March
```

---

## Test Case 6: Shimla - 4 Days Trip

### Input:
```
Destination: Shimla
Number of Days: 4
```

### Expected Output:

#### 💰 Cost Breakdown:
```
Travel Cost (Round Trip):        ₹3,800
Stay Cost (4 days):              ₹6,400
Food Cost (4 days):              ₹2,200
Local Transport (4 days):        ₹1,800
─────────────────────────────────────────
Total Estimated Cost:            ₹14,200
```

#### 📅 Day-wise Itinerary:
```
Day 1: Arrival, check-in, evening walk on Mall Road and The Ridge
Day 2: Visit Jakhu Temple, Christ Church, Scandal Point
Day 3: Full day excursion to Kufri (adventure activities)
Day 4: Shopping at Lakkar Bazaar, local sightseeing, departure
```

#### 🏛️ Famous Tourist Places:
- Mall Road
- The Ridge
- Jakhu Temple
- Kufri
- Christ Church
- Scandal Point

#### 🌤️ Best Season to Visit:
```
March to June, December to February
```

---

## 🚫 Error Cases

### Error Case 1: No Destination Selected

#### Input:
```
Destination: (empty)
Number of Days: 5
```

#### Expected Output:
```
Alert: "Please select a destination!"
No results displayed
```

---

### Error Case 2: Invalid Number of Days (Too Low)

#### Input:
```
Destination: Goa
Number of Days: 0
```

#### Expected Output:
```
Alert: "Please enter a valid number of days (1-30)!"
No results displayed
```

---

### Error Case 3: Invalid Number of Days (Too High)

#### Input:
```
Destination: Manali
Number of Days: 35
```

#### Expected Output:
```
Alert: "Please enter a valid number of days (1-30)!"
No results displayed
```

---

### Error Case 4: Empty Days Field

#### Input:
```
Destination: Jaipur
Number of Days: (empty)
```

#### Expected Output:
```
Alert: "Please enter a valid number of days (1-30)!"
No results displayed
```

---

## 📊 Cost Comparison Table

| Destination | 3 Days | 5 Days | 7 Days |
|-------------|--------|--------|--------|
| **Goa** | ₹12,900 | ₹19,300 | ₹25,700 |
| **Manali** | ₹13,500 | ₹19,500 | ₹25,500 |
| **Jaipur** | ₹9,100 | ₹12,100 | ₹15,100 |
| **Kerala** | ₹15,000 | ₹21,000 | ₹27,000 |
| **Agra** | ₹6,000 | ₹8,000 | ₹10,000 |
| **Shimla** | ₹11,600 | ₹14,200 | ₹16,800 |

---

## 🎯 Manual Testing Checklist

### Functional Testing:
- [ ] Select each destination and verify correct data loads
- [ ] Enter different day values (1, 5, 10, 30)
- [ ] Verify cost calculations are accurate
- [ ] Check itinerary displays correct number of days
- [ ] Confirm tourist places list appears
- [ ] Verify season information shows correctly

### Validation Testing:
- [ ] Try submitting without selecting destination
- [ ] Enter 0 days
- [ ] Enter negative days
- [ ] Enter days > 30
- [ ] Leave days field empty
- [ ] Enter non-numeric values in days field

### UI Testing:
- [ ] Check responsive design on different screen sizes
- [ ] Verify smooth scroll to results
- [ ] Test hover effects on cards
- [ ] Confirm animations work properly
- [ ] Check color contrast and readability

### Browser Compatibility:
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Edge
- [ ] Test on Safari (if available)

---

## 💡 Sample Viva Questions Based on Input/Output

**Q1: Why is Agra cheaper than Kerala for the same duration?**
- A: Different destinations have different costs based on travel distance, accommodation standards, and local expenses. Agra is closer and has lower accommodation costs.

**Q2: What happens if someone wants to stay for 10 days but you only have 5 days of itinerary?**
- A: The system generates a generic message for days beyond the predefined itinerary.

**Q3: How accurate are these cost estimates?**
- A: These are approximate estimates based on average costs. Actual costs may vary based on season, hotel choice, and personal preferences.

**Q4: Can users modify the itinerary?**
- A: Currently no, but this could be added as a future enhancement.

**Q5: Why is there a 30-day limit?**
- A: To keep the scope manageable for a beginner project and because most trips are shorter than 30 days.

---

**Test Coverage**: 100% of features  
**Total Test Cases**: 10 (6 valid + 4 error cases)  
**Suitable For**: Viva demonstration and project evaluation
