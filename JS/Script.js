/* -------------------------------------------------
   Chatbot response rules and logic
------------------------------------------------- */

/* Pattern-based fallback responses for emotional keywords */
const responsePatterns = [
    {
        keywords: ['anxious', 'anxiety', 'worried', 'stress', 'stressed'],
        responses: [
            "I understand you're feeling anxious. That's common, especially during university life.",
            "It's completely normal to feel stressed. UQ offers counselling and support workshops.",
            "Stress can build up quickly. You're not alone in that. We can explore small coping steps together."
        ]
    },
    {
        keywords: ['sad', 'depressed', 'down', 'lonely', 'alone'],
        responses: [
            "Feeling low can make everything harder. You deserve support for that.",
            "Loneliness is real. Talking to someone neutral can often help. I can show you how to reach out.",
            "If things have been heavy for a while, UQ counselling services are confidential and free."
        ]
    },
    {
        keywords: ['sleep', 'insomnia', 'tired', 'exhausted'],
        responses: [
            "Sleep issues are very common. A short bedtime routine can sometimes help you wind down.",
            "Constant tiredness affects focus and motivation. UQ Health can help if it's ongoing.",
            "Good rest is part of mental health. It is not laziness. You deserve it."
        ]
    },
    {
        keywords: ['exam', 'test', 'assignment', 'deadline', 'study'],
        responses: [
            "Academic pressure can be intense. Working in short focus blocks with small breaks helps many students.",
            "Deadline stress is normal. We can talk about coping or I can point you to UQ study resources.",
            "Studying under stress is difficult. Let's look at ways to balance it better."
        ]
    },
    {
        keywords: ['help', 'support', 'resources', 'services'],
        responses: [
            "UQ has many helpful services:\n\n• Free counselling for students\n• Student Services\n• Peer support\n• 24/7 crisis lines",
            "Asking for support is a strong step. I can show you UQ resources or we can talk more here."
        ]
    },
    {
        keywords: ['crisis', 'emergency', 'harm', 'suicide'],
        responses: [
            "I'm really glad you're here and talking to me. Please reach out to live support now:\n\n• UQ Security (24/7): 07 3365 3333\n• Lifeline: 13 11 14\n• Beyond Blue: 1300 22 4636\n• Emergency: 000"
        ]
    },
    {
        keywords: ['thank', 'thanks', 'appreciate'],
        responses: [
            "You're welcome. I'm here with you.",
            "I'm glad I could help. You can reach out anytime."
        ]
    }
];

/* Default fallback responses for general / unclassified input */
const defaultResponses = [
    "I'm here and listening. Can you tell me more about what is happening for you right now?",
    "Thank you for sharing that. How has it been feeling for you recently?",
    "That sounds heavy. When did you start noticing it getting harder?"
];

/* Greeting tone for first-contact style questions */
const greetings = [
    "Hi, I’m here to help you find support if you need it. How are you feeling right now?",
    "Hello, you don’t have to be 'okay' here. Tell me what’s happening for you."
];

/* Keyword-triggered link replies.
   These replies include:
   - supportive text
   - a full-width call-to-action button linking to another page
   - a short hint line
   (No emojis here to maintain a calm professional tone.) */
const friendlyKeywordReplies = {
    selfhelp: {
        text: `It sounds like you're looking for something you can try on your own at your own pace.
I can show you a self-help section with breathing guidance, calm audio, and journaling.`,
        linkLabel: "Open Self-Help Tools",
        linkHref: "./Self-help.html"
    },
    "service explore": {
        text: `If you want to explore what is available around campus, I can show you counselling, workshops, pricing, and map locations.`,
        linkLabel: "Browse Services",
        linkHref: "./Services-Explore.html"
    }
};

/* -------------------------------------------------
   Chat state
------------------------------------------------- */

let messages = [];
let isTyping = false;
let showSuggestions = true;

/* DOM references */
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const suggestionsContainer = document.getElementById('suggestionsContainer');
const suggestionsChips = document.getElementById('suggestionsChips');

/* -------------------------------------------------
   Utility helpers
------------------------------------------------- */

/* Format the message timestamp */
function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

/* Check if the user message triggers a special keyword flow */
function getKeywordReply(lowerMessage) {
    if (lowerMessage.includes("selfhelp") || lowerMessage.includes("self help")) {
        return friendlyKeywordReplies.selfhelp;
    }
    if (
        lowerMessage.includes("service explore") ||
        lowerMessage.includes("services explore") ||
        lowerMessage.includes("services") ||
        lowerMessage.includes("service")
    ) {
        return friendlyKeywordReplies["service explore"];
    }
    return null;
}

/* Build the AI response object:
   - if keyword hit: returns { html, isHTML: true }
   - else: returns { text, isHTML: false }
*/
function getAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase().trim();

    // 1. Keyword-triggered link card reply
    const keywordData = getKeywordReply(lowerMessage);
    if (keywordData) {
        const html = `
            <div class="bot-rich-text">
                <div class="bot-friendly">${keywordData.text}</div>
                <a class="link-button" href="${keywordData.linkHref}">
                    ${keywordData.linkLabel}
                </a>
                <div class="bot-soft-hint">You can click the link above to explore more.</div>
            </div>
        `;
        return { html, isHTML: true };
    }

    // 2. Greeting patterns
    if (/^(hi|hello|hey|greetings)\b/i.test(userMessage.trim())) {
        const pick = greetings[Math.floor(Math.random() * greetings.length)];
        return { text: pick, isHTML: false };
    }

    // 3. Emotional / situation keywords
    for (const pattern of responsePatterns) {
        for (const keyword of pattern.keywords) {
            if (lowerMessage.includes(keyword)) {
                const pick = pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
                return { text: pick, isHTML: false };
            }
        }
    }

    // 4. Fallback neutral support
    const fallback = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    return { text: fallback, isHTML: false };
}

/* Scroll chat to the bottom after new messages render */
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/* Create avatar element for either bot or user */
function createAvatar(isBot) {
    const avatar = document.createElement('div');
    avatar.className = `avatar ${isBot ? 'bot' : 'user'}`;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    if (isBot) {
        // Bot avatar icon
        svg.innerHTML = `
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8" y2="16"></line>
            <line x1="16" y1="16" x2="16" y2="16"></line>
        `;
    } else {
        // User avatar icon
        svg.innerHTML = `
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        `;
    }

    avatar.appendChild(svg);
    return avatar;
}

/* Create a single message block in the DOM
   - If isHTML === true and isBot === true, insert as HTML (allows link button, etc.)
   - Otherwise insert as plain text for safety
*/
function createMessageElement(text, isBot, timestamp, isHTML = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;

    const avatar = createAvatar(isBot);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';

    if (isBot && isHTML) {
        bubbleDiv.innerHTML = text;
    } else {
        bubbleDiv.textContent = text;
    }

    const timestampSpan = document.createElement('span');
    timestampSpan.className = 'timestamp';
    timestampSpan.textContent = timestamp;

    contentDiv.appendChild(bubbleDiv);
    contentDiv.appendChild(timestampSpan);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);

    return messageDiv;
}

/* Create a temporary "typing..." indicator for the bot */
function createTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';

    const avatar = createAvatar(true);

    const dotsDiv = document.createElement('div');
    dotsDiv.className = 'typing-dots';

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dotsDiv.appendChild(dot);
    }

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(dotsDiv);

    return typingDiv;
}

/* Push a new message to state + DOM */
function addMessage(text, isBot, isHTML = false) {
    const timestamp = formatTime();
    const message = { text, isBot, timestamp, isHTML };
    messages.push(message);

    const messageElement = createMessageElement(text, isBot, timestamp, isHTML);
    messagesContainer.appendChild(messageElement);

    setTimeout(scrollToBottom, 100);
}

/* Show typing indicator while bot is "thinking" */
function showTypingIndicator() {
    isTyping = true;
    const indicator = createTypingIndicator();
    messagesContainer.appendChild(indicator);
    updateInputState();
    setTimeout(scrollToBottom, 100);
}

/* Remove typing indicator */
function hideTypingIndicator() {
    isTyping = false;
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
    updateInputState();
}

/* Simulate the bot "thinking" and then replying */
function simulateAIResponse(userMessage) {
    showTypingIndicator();

    // Simulate delay between 1s and 2s
    const thinkingTime = 1000 + Math.random() * 1000;

    setTimeout(() => {
        hideTypingIndicator();

        const ai = getAIResponse(userMessage);

        if (ai.isHTML) {
            addMessage(ai.html, true, true);
        } else {
            addMessage(ai.text, true, false);
        }
    }, thinkingTime);
}

/* Enable / disable input based on typing state and content */
function updateInputState() {
    messageInput.disabled = isTyping;
    sendButton.disabled = !messageInput.value.trim() || isTyping;
}

/* Send the user's message */
function handleSendMessage() {
    const text = messageInput.value.trim();
    if (!text || isTyping) return;

    // Add the user's message
    addMessage(text, false, false);

    // Clear input
    messageInput.value = '';
    updateInputState();

    // Hide suggestion chips after first real send
    if (showSuggestions) {
        showSuggestions = false;
        suggestionsContainer.classList.remove('visible');
    }

    // Ask bot for reply
    simulateAIResponse(text);
}

/* When a chip is clicked, pre-fill the input */
function handleSuggestionClick(suggestion) {
    messageInput.value = suggestion;
    messageInput.focus();
    updateInputState();
}

/* Render the quick suggestion chips under the chat area */
function initializeSuggestions() {
    const initialSuggestions = [
        "I'm feeling stressed",
        "selfhelp",
        "service explore",
        "Sleep problems"
    ];

    initialSuggestions.forEach(suggestion => {
        const chip = document.createElement('button');
        chip.className = 'suggestion-chip';
        chip.textContent = suggestion;
        chip.addEventListener('click', () => handleSuggestionClick(suggestion));
        suggestionsChips.appendChild(chip);
    });
}

/* Set up the chat UI and event listeners when the page loads */
function initialize() {
    // First bot message shown when the page loads
    addMessage(
        "Hi, I’m here to help you find support if you need it. How are you feeling right now?",
        true,
        false
    );

    // Build and show suggestion chips
    initializeSuggestions();
    suggestionsContainer.classList.add('visible');

    // Send button click
    sendButton.addEventListener('click', handleSendMessage);

    // Update button disabled state while typing
    messageInput.addEventListener('input', updateInputState);

    // Send on Enter (but not Shift+Enter)
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // iOS zoom handling: prevent viewport zoom jump on focus
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        messageInput.addEventListener('focus', () => {
            const viewport = document.querySelector('meta[name=viewport]');
            if (viewport) {
                viewport.setAttribute(
                    'content',
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                );
            }
        });
    }

    // Initial state of input/button
    updateInputState();
}

/* Initialize once DOM is ready */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
