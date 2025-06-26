from flask import jsonify
import requests

class BotpressService:
    def __init__(self, botpress_url):
        self.botpress_url = botpress_url

    def send_message(self, message, session_id):
        payload = {
            "message": message,
            "sessionId": session_id
        }
        response = requests.post(f"{self.botpress_url}/webhooks/rest/webhook", json=payload)
        
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Failed to communicate with Botpress"}

    def get_response(self, question, environment, room, session_id):
        context = {
            "environment": environment,
            "room": room
        }
        message = f"{question} (Context: {context})"
        return self.send_message(message, session_id)