# Wellbeing MVP (updated)

A local front-end prototype updated around three priorities: more transparent service browsing, working self-help interactions, and clearer navigation/readability.

## Run it

From this folder, run python -m http.server 8000, then open localhost:8000/HTML/Home.html.

## Updates

- Service filters and example cards run without Google Maps. Cards disclose that listings and prices are examples, describe access/eligibility status, and show whether a provider link has been configured. A real booking action requires verified provider data and an official URL. Invalid price ranges and no-match results receive feedback.
- The Google Maps API key was removed from the HTML source. Maps are optional; add your own restricted key to JS/config.js if needed.
- Guided breathing now runs a selected 1, 3, or 5-minute timer and reports each step. Audio controls give playback/error feedback. Journaling can save and delete entries in this browser, clear a draft, and report save errors. Avoid entering sensitive health information; browser-local storage is not a secure clinical record.
- Navigation labels match across pages, the current page is announced to assistive technology, and focus, text sizing, and small-screen layout are clearer.
- The login screen is only a visual demo and does not authenticate users.

## Limits

The service records are illustrative placeholders, not real listings or emergency contacts. Replace them with provider-verified service name, location, price, eligibility, access instructions, contact details, and booking URL before presenting them as real. The prototype does not have an appointment backend. The chatbot remains keyword-based and is not a substitute for professional support.
