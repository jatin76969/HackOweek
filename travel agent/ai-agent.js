// ============================================
// AI TRAVEL AGENT - Rule-based Chatbot
// ============================================

// Knowledge Base
const travelKnowledgeBase = {
    // Destination characteristics
    destinationTypes: {
        beach: ['goa', 'kerala'],
        mountain: ['manali', 'shimla'],
        heritage: ['jaipur', 'agra'],
        adventure: ['manali', 'goa'],
        relaxation: ['kerala', 'shimla'],
        budget: ['agra', 'jaipur'],
        luxury: ['kerala', 'goa']
    },

    // Travel tips by category
    travelTips: {
        packing: [
            "Pack light and carry essentials only",
            "Always keep a first-aid kit handy",
            "Carry photocopies of important documents",
            "Pack weather-appropriate clothing",
            "Don't forget chargers and power banks"
        ],
        budget: [
            "Book accommodations in advance for better rates",
            "Travel during off-season for lower costs",
            "Use local transport instead of taxis",
            "Eat at local restaurants for authentic and cheaper food",
            "Look for combo deals and group discounts"
        ],
        safety: [
            "Keep emergency contacts saved",
            "Inform family about your itinerary",
            "Avoid isolated areas at night",
            "Keep valuables in hotel safe",
            "Stay hydrated and carry water"
        ],
        general: [
            "Research your destination beforehand",
            "Learn a few local phrases",
            "Respect local culture and customs",
            "Try local cuisine and experiences",
            "Keep some cash for emergencies"
        ]
    },

    // FAQs
    faqs: {
        "how to use": "Simply select your destination from the dropdown, enter the number of days, and click 'Calculate Trip Cost'. You'll get a detailed cost breakdown, itinerary, and tourist information!",
        "cost accuracy": "The costs are approximate estimates based on mid-range options. Actual expenses may vary based on season, personal preferences, and booking timing.",
        "best destination": "It depends on your preferences! Beach lover? Try Goa or Kerala. Mountain enthusiast? Go for Manali or Shimla. History buff? Jaipur or Agra are perfect!",
        "when to visit": "Each destination has its best season. Use the calculator to see the recommended time for your chosen destination!",
        "budget planning": "Start by using our calculator to get an estimate. Add 10-15% buffer for unexpected expenses. Book in advance to save money!"
    }
};

// Conversation context
let conversationContext = {
    lastIntent: null,
    userPreferences: {},
    conversationHistory: []
};

// Intent patterns for pattern matching
const intentPatterns = {
    greeting: /\b(hi|hello|hey|good morning|good evening|namaste)\b/i,
    goodbye: /\b(bye|goodbye|see you|thanks|thank you)\b/i,

    destinationRecommendation: /\b(recommend|suggest|best place|where should|which destination|where to go)\b/i,

    beachPreference: /\b(beach|sea|ocean|coastal|sand|surf)\b/i,
    mountainPreference: /\b(mountain|hill|trek|snow|cold|altitude)\b/i,
    heritagePreference: /\b(heritage|history|historical|monument|fort|palace)\b/i,

    budgetQuery: /\b(cheap|expensive|budget|cost|price|afford|money)\b/i,
    seasonQuery: /\b(when|season|weather|time to visit|best time|climate)\b/i,

    travelTips: /\b(tip|advice|suggestion|help|guide|recommend)\b/i,
    packingTips: /\b(pack|luggage|bag|carry|bring)\b/i,
    safetyTips: /\b(safe|safety|secure|danger|risk)\b/i,

    helpQuery: /\b(how to use|how does|help|guide|tutorial|explain)\b/i,

    calculator: /\b(calculate|cost|estimate|price|total)\b/i,

    positive: /\b(yes|yeah|sure|ok|okay|yep|correct|right)\b/i,
    negative: /\b(no|nope|nah|not really)\b/i
};

// Main AI processing function
function processUserMessage(userMessage) {
    // Preprocess message
    const message = userMessage.trim().toLowerCase();

    // Add to conversation history
    conversationContext.conversationHistory.push({
        role: 'user',
        message: userMessage,
        timestamp: new Date()
    });

    // Detect intent
    const intent = detectIntent(message);
    conversationContext.lastIntent = intent;

    // Generate response based on intent
    const response = generateResponse(intent, message);

    // Add AI response to history
    conversationContext.conversationHistory.push({
        role: 'ai',
        message: response,
        timestamp: new Date()
    });

    return response;
}

// Intent detection using pattern matching
function detectIntent(message) {
    // Check each pattern
    if (intentPatterns.greeting.test(message)) return 'greeting';
    if (intentPatterns.goodbye.test(message)) return 'goodbye';
    if (intentPatterns.helpQuery.test(message)) return 'help';
    if (intentPatterns.calculator.test(message)) return 'calculator';

    // Preference detection
    if (intentPatterns.beachPreference.test(message)) {
        conversationContext.userPreferences.type = 'beach';
        return 'destinationRecommendation';
    }
    if (intentPatterns.mountainPreference.test(message)) {
        conversationContext.userPreferences.type = 'mountain';
        return 'destinationRecommendation';
    }
    if (intentPatterns.heritagePreference.test(message)) {
        conversationContext.userPreferences.type = 'heritage';
        return 'destinationRecommendation';
    }

    // Query detection
    if (intentPatterns.destinationRecommendation.test(message)) return 'destinationRecommendation';
    if (intentPatterns.budgetQuery.test(message)) return 'budgetQuery';
    if (intentPatterns.seasonQuery.test(message)) return 'seasonQuery';

    // Tips detection
    if (intentPatterns.packingTips.test(message)) return 'packingTips';
    if (intentPatterns.safetyTips.test(message)) return 'safetyTips';
    if (intentPatterns.travelTips.test(message)) return 'travelTips';

    // Default
    return 'general';
}

// Response generation
function generateResponse(intent, message) {
    switch (intent) {
        case 'greeting':
            return "Hello! 👋 I'm your AI Travel Assistant. I can help you:\n\n" +
                "🗺️ Find the perfect destination\n" +
                "💰 Plan your budget\n" +
                "📅 Choose the best time to visit\n" +
                "💡 Get travel tips and advice\n\n" +
                "What would you like to know?";

        case 'goodbye':
            return "Thank you for chatting! Have a wonderful trip! ✈️ Feel free to ask if you need more help. Safe travels! 🌍";

        case 'help':
            return travelKnowledgeBase.faqs["how to use"] + "\n\n" +
                "You can also ask me about:\n" +
                "• Destination recommendations\n" +
                "• Budget planning\n" +
                "• Best time to visit\n" +
                "• Travel tips and advice";

        case 'calculator':
            return "To use the trip calculator:\n\n" +
                "1️⃣ Select your destination from the dropdown\n" +
                "2️⃣ Enter number of days (1-30)\n" +
                "3️⃣ Click 'Calculate Trip Cost'\n\n" +
                "You'll get detailed cost breakdown, itinerary, and tourist information! 📊";

        case 'destinationRecommendation':
            return getDestinationRecommendation(message);

        case 'budgetQuery':
            return getBudgetAdvice(message);

        case 'seasonQuery':
            return getSeasonAdvice(message);

        case 'packingTips':
            return "📦 **Packing Tips:**\n\n" +
                travelKnowledgeBase.travelTips.packing.map((tip, i) => `${i + 1}. ${tip}`).join('\n') +
                "\n\nNeed more specific advice for your destination?";

        case 'safetyTips':
            return "🛡️ **Safety Tips:**\n\n" +
                travelKnowledgeBase.travelTips.safety.map((tip, i) => `${i + 1}. ${tip}`).join('\n') +
                "\n\nStay safe and enjoy your trip!";

        case 'travelTips':
            return "💡 **General Travel Tips:**\n\n" +
                travelKnowledgeBase.travelTips.general.map((tip, i) => `${i + 1}. ${tip}`).join('\n') +
                "\n\nWant specific tips for packing, budget, or safety?";

        case 'general':
        default:
            return getContextualResponse(message);
    }
}

// Get destination recommendation based on preferences
function getDestinationRecommendation(message) {
    const prefs = conversationContext.userPreferences;

    if (prefs.type) {
        const destinations = travelKnowledgeBase.destinationTypes[prefs.type];
        const destNames = destinations.map(d => destinationsDB[d].name);

        let response = `Based on your preference for ${prefs.type} destinations, I recommend:\n\n`;

        destinations.forEach(destKey => {
            const dest = destinationsDB[destKey];
            const cost3Days = dest.travelCost + (dest.stayPerDay * 3) + (dest.foodPerDay * 3) + (dest.localTransportPerDay * 3);
            response += `🌟 **${dest.name}**\n`;
            response += `   • Best Season: ${dest.bestSeason}\n`;
            response += `   • 3-day estimate: ₹${cost3Days.toLocaleString()}\n\n`;
        });

        response += "Would you like to calculate exact costs for any of these?";
        return response;
    }

    return "I'd love to help you find the perfect destination! 🗺️\n\n" +
        "What kind of experience are you looking for?\n\n" +
        "🏖️ Beach and relaxation\n" +
        "⛰️ Mountains and adventure\n" +
        "🏛️ Heritage and culture\n\n" +
        "Or tell me your budget range and I'll suggest options!";
}

// Get budget advice
function getBudgetAdvice(message) {
    // Extract numbers from message
    const numbers = message.match(/\d+/g);

    if (numbers && numbers.length > 0) {
        const budget = parseInt(numbers[0]);
        const days = numbers.length > 1 ? parseInt(numbers[1]) : 3;

        let recommendations = "Based on your budget, here are my recommendations:\n\n";

        Object.keys(destinationsDB).forEach(key => {
            const dest = destinationsDB[key];
            const totalCost = dest.travelCost + (dest.stayPerDay * days) + (dest.foodPerDay * days) + (dest.localTransportPerDay * days);

            if (totalCost <= budget * 1.1) { // 10% buffer
                recommendations += `✅ **${dest.name}** - ₹${totalCost.toLocaleString()} (${days} days)\n`;
            }
        });

        recommendations += "\nUse the calculator above for detailed breakdown! 📊";
        return recommendations;
    }

    return "💰 **Budget Planning Tips:**\n\n" +
        travelKnowledgeBase.travelTips.budget.map((tip, i) => `${i + 1}. ${tip}`).join('\n') +
        "\n\n**Quick Budget Guide (3 days):**\n" +
        "• Budget: ₹6,000-10,000 → Agra, Jaipur\n" +
        "• Mid-range: ₹10,000-15,000 → Shimla, Goa\n" +
        "• Premium: ₹15,000+ → Kerala, Manali\n\n" +
        "Tell me your budget and I'll suggest destinations!";
}

// Get season advice
function getSeasonAdvice(message) {
    let response = "🌤️ **Best Time to Visit:**\n\n";

    Object.keys(destinationsDB).forEach(key => {
        const dest = destinationsDB[key];
        response += `📍 **${dest.name}**: ${dest.bestSeason}\n`;
    });

    response += "\nSelect a destination in the calculator to see detailed information!";
    return response;
}

// Contextual response for general queries
function getContextualResponse(message) {
    // Check if message contains destination name
    for (let key in destinationsDB) {
        const dest = destinationsDB[key];
        if (message.includes(dest.name.toLowerCase())) {
            return `Great choice! **${dest.name}** is wonderful! 🌟\n\n` +
                `• Best time: ${dest.bestSeason}\n` +
                `• Famous for: ${dest.touristPlaces.slice(0, 3).join(', ')}\n\n` +
                `Use the calculator to get detailed cost estimates and itinerary!`;
        }
    }

    // Default helpful response
    return "I'm here to help with your travel planning! 🌍\n\n" +
        "You can ask me about:\n" +
        "• Destination recommendations\n" +
        "• Budget planning\n" +
        "• Best time to visit\n" +
        "• Travel tips\n" +
        "• How to use the calculator\n\n" +
        "What would you like to know?";
}

// Clear conversation history
function clearConversation() {
    conversationContext = {
        lastIntent: null,
        userPreferences: {},
        conversationHistory: []
    };
}

// Get conversation history
function getConversationHistory() {
    return conversationContext.conversationHistory;
}
