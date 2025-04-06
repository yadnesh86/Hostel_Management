import json
import random
import spacy
from fuzzywuzzy import process
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load intents from JSON file
with open("intents.json", "r") as file:
    intents = json.load(file)

# Extract patterns for fuzzy matching
all_patterns = {intent["tag"]: intent["patterns"] for intent in intents["intents"]}

# Function to find the best-matching intent
def get_best_intent(user_input):
    tokens = [token.text for token in nlp(user_input.lower())]  # Tokenize input
    input_text = " ".join(tokens)

    best_match = None
    highest_score = 0

    for tag, patterns in all_patterns.items():
        match, score = process.extractOne(input_text, patterns)  # Find closest match
        if score > highest_score:
            best_match = tag
            highest_score = score

    return best_match if highest_score > 60 else None  # Adjust threshold if needed

# Function to get chatbot response
def get_response(user_input):
    matched_intent = get_best_intent(user_input)

    if matched_intent:
        for intent in intents["intents"]:
            if intent["tag"] == matched_intent:
                return random.choice(intent["responses"])

    return "I'm sorry, I don't understand. Can you rephrase?"

# Flask route for chatbot API
@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.json.get("message", "")
    response = get_response(user_input)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
