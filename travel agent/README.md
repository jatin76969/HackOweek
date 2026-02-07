# Travel Planner - Quick Start Guide

## 🚀 How to Run the Project

### Method 1: Direct File Opening
1. Navigate to the project folder: `c:\Users\akask\OneDrive\Desktop\travel planner`
2. Double-click `index.html`
3. The application will open in your default web browser
4. Start planning your trip!

### Method 2: Using a Code Editor
1. Open the project folder in VS Code or any code editor
2. Right-click on `index.html`
3. Select "Open with Live Server" (if you have the extension)
4. Or simply open the file in your browser

---

## 📁 Project Structure

```
travel planner/
│
├── index.html                  # Main HTML file (structure)
├── style.css                   # Styling and design
├── script.js                   # JavaScript logic
│
├── PROJECT_DOCUMENTATION.md    # Complete project details
├── ALGORITHM.md                # Algorithm explanation
├── FLOWCHART.md                # Flowcharts and diagrams
├── SAMPLE_INPUT_OUTPUT.md      # Test cases and examples
├── VIVA_GUIDE.md               # Viva preparation Q&A
└── README.md                   # This file
```

---

## 🎯 How to Use the Application

### Step 1: Select Destination
- Click on the "Select Destination" dropdown
- Choose from 6 available destinations:
  - Goa
  - Manali
  - Jaipur
  - Kerala
  - Agra
  - Shimla

### Step 2: Enter Number of Days
- Click on the "Number of Days" input field
- Enter a number between 1 and 30
- Press Enter or click the Calculate button

### Step 3: View Results
- The page will automatically scroll to show results
- You'll see:
  - **Cost Breakdown**: Detailed expense breakdown
  - **Day-wise Itinerary**: Suggested activities for each day
  - **Famous Tourist Places**: Must-visit attractions
  - **Best Season**: Recommended time to visit

---

## 💡 Features

✅ **Offline Working** - No internet required  
✅ **6 Popular Destinations** - Pre-loaded with data  
✅ **Cost Estimation** - Travel, Stay, Food, Transport  
✅ **Day-wise Itinerary** - Planned activities  
✅ **Tourist Information** - Famous places to visit  
✅ **Season Recommendations** - Best time to travel  
✅ **Input Validation** - Error handling  
✅ **Responsive Design** - Works on all devices  
✅ **Modern UI** - Beautiful dark theme with animations  

---

## 🎓 Academic Documentation

For viva preparation and project understanding, refer to:

1. **PROJECT_DOCUMENTATION.md**
   - Project description
   - Problem statement
   - Objectives
   - Technology stack
   - Features and advantages

2. **ALGORITHM.md**
   - Detailed algorithm explanation
   - Pseudocode
   - Complexity analysis
   - Mathematical formulas

3. **FLOWCHART.md**
   - Main program flowchart
   - Sub-process flowcharts
   - Data flow diagrams

4. **SAMPLE_INPUT_OUTPUT.md**
   - Test cases with expected outputs
   - Error case handling
   - Cost comparison tables

5. **VIVA_GUIDE.md**
   - 36 common viva questions with answers
   - Technical explanations
   - Demonstration tips

---

## 🛠️ Technical Details

### Technologies Used:
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with animations
- **JavaScript (ES6)** - Logic and interactivity

### Browser Compatibility:
- ✅ Google Chrome (Recommended)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ✅ Opera

### System Requirements:
- Any modern web browser
- No internet connection needed
- No installation required

---

## 📊 Sample Usage

### Example 1: Planning a Goa Trip
```
Input:
  Destination: Goa
  Days: 3

Output:
  Total Cost: ₹12,900
  - Travel: ₹3,000
  - Stay: ₹6,000
  - Food: ₹2,400
  - Transport: ₹1,500
```

### Example 2: Planning a Manali Trip
```
Input:
  Destination: Manali
  Days: 5

Output:
  Total Cost: ₹19,500
  - Travel: ₹4,000
  - Stay: ₹9,000
  - Food: ₹3,000
  - Transport: ₹3,500
```

---

## 🔧 Customization

### Adding a New Destination:

1. Open `script.js`
2. Add a new entry to `destinationsDB`:

```javascript
newdestination: {
    name: "Destination Name",
    travelCost: 0000,
    stayPerDay: 0000,
    foodPerDay: 000,
    localTransportPerDay: 000,
    touristPlaces: [
        "Place 1",
        "Place 2",
        // ... more places
    ],
    bestSeason: "Month to Month",
    itinerary: {
        1: "Day 1 activities",
        2: "Day 2 activities",
        // ... more days
    }
}
```

3. Add the option to `index.html`:

```html
<option value="newdestination">Destination Name</option>
```

### Modifying Costs:

Simply update the cost values in the `destinationsDB` object in `script.js`.

---

## ❓ Troubleshooting

### Issue: Page doesn't load properly
**Solution:** Ensure all three files (index.html, style.css, script.js) are in the same folder.

### Issue: Styles not showing
**Solution:** Check that `style.css` is in the same directory as `index.html`.

### Issue: Calculations not working
**Solution:** Check browser console for errors (F12 → Console tab).

### Issue: Validation alerts in different language
**Solution:** This depends on browser language settings. The alerts use the browser's default language.

---

## 📝 Project Checklist

Before presenting your project, ensure:

- [ ] All files are in the correct folder
- [ ] Application opens and runs without errors
- [ ] All 6 destinations work correctly
- [ ] Input validation works (test with invalid inputs)
- [ ] Cost calculations are accurate
- [ ] Itinerary displays for all day ranges
- [ ] Tourist places show correctly
- [ ] Season information appears
- [ ] Responsive design works (resize browser)
- [ ] All documentation files are present

---

## 🎯 Viva Preparation Checklist

- [ ] Read PROJECT_DOCUMENTATION.md
- [ ] Understand the algorithm (ALGORITHM.md)
- [ ] Review flowcharts (FLOWCHART.md)
- [ ] Practice with sample inputs (SAMPLE_INPUT_OUTPUT.md)
- [ ] Go through viva questions (VIVA_GUIDE.md)
- [ ] Test the application thoroughly
- [ ] Prepare to explain your code
- [ ] Be ready to demonstrate features
- [ ] Know the limitations and future enhancements

---

## 📞 Support

For any questions or issues:
1. Review the documentation files
2. Check the code comments in `script.js`
3. Test with sample inputs from SAMPLE_INPUT_OUTPUT.md
4. Refer to VIVA_GUIDE.md for explanations

---

## 📄 License

This is an academic project created for educational purposes.

---

## 👨‍💻 Project Information

**Project Name:** Travel Planner  
**Type:** Academic Project  
**Suitable For:** 2nd Semester Engineering Students  
**Complexity:** Beginner-Friendly  
**Technologies:** HTML, CSS, JavaScript  
**Database:** None (Hardcoded data)  
**APIs:** None  
**Internet Required:** No (Offline working)  

---

## 🌟 Key Highlights

1. **Simple & Clean Code** - Easy to understand
2. **Well Documented** - Comprehensive documentation
3. **Viva Ready** - Complete Q&A guide included
4. **Professional UI** - Modern, attractive design
5. **Fully Functional** - All features working
6. **No Dependencies** - Pure vanilla JavaScript
7. **Beginner Friendly** - Perfect for 2nd semester

---

**Ready to present! Good luck with your viva! 🎓**
