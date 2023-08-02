from flask import Flask, request, jsonify
from flask_cors import CORS
from marshmallow import Schema, fields, validate
import firebase_admin
import datetime
from firebase_admin import firestore

firebase_admin.initialize_app()


class UserLoginSchema(Schema):
    email = fields.String(
        required=True, validate=validate.Email(), data_key="Email")
    password = fields.String(
        required=True, validate=validate.Length(min=8), data_key="Password")


app = Flask(__name__)
CORS(app)


@app.errorhandler(422)
def error_validation(err):
    """Handles 422 errors"""
    messages = err.data.get("messages").get("json")
    return jsonify(messages)


@app.route("/login", methods=["POST"])
def login():
    login_data = request.json
    errors = UserLoginSchema().validate(login_data)
    if errors:
        return jsonify(errors), 400
    else:
        connect_database = firestore.client()
        credentials = connect_database.collection("Reg").document(login_data["Email"]).get()

        if credentials.exists:
            valid_credentials = credentials.to_dict()
            if valid_credentials["Password"] == login_data["Password"]:
                state = connect_database.collection("state").document(
                    login_data["Email"]).get()
                if state.exists:
                    state_data = {
                        "IsOnline": True,
                        "LastLogin": datetime.datetime.now().timestamp(),
                    }
                    connect_database.collection("state").document(login_data["Email"]).update(
                        state_data
                    )
                else:
                    state_data = {
                        "Email": login_data["Email"],
                        "IsOnline": True,
                        "LastLogin": datetime.datetime.now().timestamp(),
                    }
                    connect_database.collection("state").document(
                        login_data["Email"]).set(state_data)
                return jsonify({"Message": "Success!!"}), 200
            else:
                return jsonify({"Error": "Password is incorrect"}), 403
        else:
            return jsonify({"Error": "User not Present"}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5001", debug=True, load_dotenv=True)
