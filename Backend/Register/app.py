from flask import Flask
from marshmallow import Schema, fields, validate
import firebase_admin
from firebase_admin import firestore
from flask_cors import CORS

from flask import request, jsonify

firebase_admin.initialize_app()


class UserRegistrationSchema(Schema):
    name = fields.String(required=True, data_key="Name")
    password = fields.String(
        required=True, validate=validate.Length(min=8), data_key="Password"
    )
    email = fields.String(
        required=True, validate=validate.Email(), data_key="Email")
    location = fields.String(required=True, data_key="Location")


app = Flask(__name__)
CORS(app)


@app.errorhandler(422)
def error_validation(err):
    """Handles 422 errors"""
    messages = err.data.get("messages").get("json")
    return jsonify(messages)


@app.route("/registration", methods=["POST"])
def registration():
    registration_data = request.json
    errors = UserRegistrationSchema().validate(registration_data)
    if errors:
        return jsonify(errors), 400
    else:
        database_connection = firestore.client()

        data = database_connection.collection(
            "Reg").document(registration_data["Email"]).get()
        if not data.exists:
            database_connection.collection("Reg").document(
                registration_data["Email"]).set(registration_data)
            return jsonify({"Message": "User Registration Successful!"}), 200
        else:
            return jsonify({"Error": "User is already registered. Login directly!!"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True, load_dotenv=True)
