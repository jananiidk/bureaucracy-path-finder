from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import uuid
import json

app = Flask(__name__)
s3 = boto3.client('s3')
BUCKET_NAME = "bureaucracy-audio-demo"
CORS(app)   # 👈 allows browser to talk to backend

# load rules
with open("rules.json") as f:
    rules = json.load(f)

# home route (browser test)
@app.route("/")
def home():
    return "Backend is running"

# main AI route
@app.route("/check", methods=["POST"])
def check():
    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({"message": "No input received", "steps": []})

    text = data["text"].lower()

    if "pension" in text:
        goal = "pension"
    else:
        return jsonify({"message": "Service not found", "steps": []})

    required = rules[goal]["requires"]
    missing = required[0]

    if missing in rules:
        steps = rules[missing]["requires"]
        return jsonify({
          "message": f"MISSION SWITCHED\nYou must obtain {missing.replace('_',' ')} first before applying.",
            "steps": steps
        })
    else:
        return jsonify({
            "message": "You can proceed",
            "steps": required
        })
@app.route("/upload-audio", methods=["POST"])
def upload_audio():
    file = request.files["file"]

    filename = str(uuid.uuid4()) + ".wav"
    file.save(filename)

    s3.upload_file(filename, BUCKET_NAME, filename)

    return jsonify({"message": "File uploaded to S3", "filename": filename})
# run server
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")