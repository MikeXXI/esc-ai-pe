from flask import Blueprint, request, jsonify
from src.services.botpress_service import send_message_to_botpress

api = Blueprint('api', __name__)

@api.route('/ask', methods=['POST'])
def ask_bot():
    data = request.json
    question = data.get('question')
    environment = data.get('environment')
    room = data.get('room')

    if not question or not environment or not room:
        return jsonify({'error': 'Missing required parameters'}), 400

    response = send_message_to_botpress(question, environment, room)

    return jsonify(response)