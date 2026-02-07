// ============================================
// CHAT UI CONTROLLER
// ============================================

// DOM Elements
const chatWidget = document.getElementById('chatWidget');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');

// Chat state
let isChatOpen = false;
let isTyping = false;

// Initialize chat UI
function initializeChatUI() {
    // Toggle chat widget
    chatToggleBtn.addEventListener('click', toggleChat);
    closeChatBtn.addEventListener('click', toggleChat);

    // Send message on button click
    sendMessageBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    // Auto-focus input when chat opens
    chatInput.addEventListener('focus', function () {
        this.placeholder = "Type your message...";
    });

    chatInput.addEventListener('blur', function () {
        this.placeholder = "Ask me anything about travel...";
    });
}

// Toggle chat widget visibility
function toggleChat() {
    isChatOpen = !isChatOpen;

    if (isChatOpen) {
        chatWidget.classList.add('chat-open');
        chatToggleBtn.classList.add('chat-active');
        chatInput.focus();

        // Scroll to bottom
        setTimeout(() => {
            scrollToBottom();
        }, 300);
    } else {
        chatWidget.classList.remove('chat-open');
        chatToggleBtn.classList.remove('chat-active');
    }
}

// Send message
function sendMessage() {
    const message = chatInput.value.trim();

    if (!message) return;

    // Display user message
    displayUserMessage(message);

    // Clear input
    chatInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Process message with AI (simulate delay for realism)
    setTimeout(() => {
        const aiResponse = processUserMessage(message);
        hideTypingIndicator();
        displayAIMessage(aiResponse);
    }, 500 + Math.random() * 1000); // Random delay 0.5-1.5s
}

// Display user message
function displayUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${escapeHtml(message)}</p>
        </div>
        <div class="message-avatar">👤</div>
    `;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Display AI message
function displayAIMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message';

    // Convert markdown-style formatting to HTML
    const formattedMessage = formatMessage(message);

    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            ${formattedMessage}
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    if (isTyping) return;

    isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    isTyping = false;
}

// Scroll chat to bottom
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Format message (convert simple markdown to HTML)
function formatMessage(message) {
    let formatted = escapeHtml(message);

    // Bold text: **text** -> <strong>text</strong>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Bullet points: • text -> proper list item
    formatted = formatted.replace(/^([•✓✅📍🌟])\s/gm, '<span class="bullet">$1</span> ');

    // Line breaks
    formatted = formatted.replace(/\n/g, '<br>');

    // Numbered lists: 1. text
    formatted = formatted.replace(/^(\d+)\.\s/gm, '<span class="number">$1.</span> ');

    return formatted;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Quick action buttons (optional enhancement)
function addQuickActions() {
    const quickActions = [
        { text: "Recommend a destination", icon: "🗺️" },
        { text: "Budget tips", icon: "💰" },
        { text: "Best time to visit", icon: "🌤️" },
        { text: "Travel tips", icon: "💡" }
    ];

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'quick-actions';

    quickActions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = 'quick-action-btn';
        btn.innerHTML = `${action.icon} ${action.text}`;
        btn.onclick = () => {
            chatInput.value = action.text;
            sendMessage();
        };
        actionsDiv.appendChild(btn);
    });

    // Add after initial message (optional)
    // chatMessages.appendChild(actionsDiv);
}

// Clear chat history
function clearChat() {
    chatMessages.innerHTML = `
        <div class="ai-message">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>Hello! 👋 I'm your AI Travel Assistant. How can I help you today?</p>
            </div>
        </div>
    `;
    clearConversation();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    initializeChatUI();

    // Add welcome animation
    setTimeout(() => {
        chatToggleBtn.classList.add('pulse-animation');
        setTimeout(() => {
            chatToggleBtn.classList.remove('pulse-animation');
        }, 2000);
    }, 1000);
});

// Export functions for external use
window.chatUI = {
    toggleChat,
    clearChat,
    displayAIMessage,
    displayUserMessage
};
