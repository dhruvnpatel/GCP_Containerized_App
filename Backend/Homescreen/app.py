from flask import Flask
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore

from flask import request, jsonify

firebase_admin.initialize_app()

app = Flask(__name__)
CORS(app)


@app.errorhandler(422)
def error_validation(err):
    """Handles 422 errors"""
    messages = err.data.get("messages").get("json")
    return jsonify(messages)


@app.route("/", methods=["GET"])
@app.route("/homescreen", methods=["GET"])
def homescreen():
    user_name = request.args.get("user")

    try:
        connect_database = firestore.client()

        active_users = []
        loggedin_user_doc = connect_database.collection(
            "Reg").document(user_name).get()
        if loggedin_user_doc.exists:
            user_data = loggedin_user_doc.to_dict()
            logged_in_user = user_data.get("Name")

        state = connect_database.collection("state").document(user_name).get()
        if state.exists and state.to_dict().get("IsOnline"):
            users_query = connect_database.collection(
                "state").where("IsOnline", "==", True)
            users = users_query.stream()
            for user in users:
                user_email = user.to_dict().get("Email")
                if user_email and user_email != user_name:
                    user_doc = connect_database.collection(
                        "Reg").document(user_email).get()
                    if user_doc.exists:
                        user_data = user_doc.to_dict()
                        active_users.append(user_data.get("Name"))

            if active_users:
                response = {
                    "message": "Active users retrieved successfully",
                    "active_users": active_users,
                    "logged_in_user": logged_in_user
                }
            else:
                response = {
                    "message": "No active users found",
                    "logged_in_user": logged_in_user
                }
            return jsonify(response), 200
        else:
            return jsonify({"message": "User is not logged in"}), 400
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


@app.route("/logout", methods=["GET"])
def logout():
    userName = request.args.get("user")

    connect_database = firestore.client()

    state = connect_database.collection("state").document(userName).get()
    if state.exists and state.to_dict()["IsOnline"]:
        connect_database.collection("state").document(
            userName).update({"IsOnline": False})
        return jsonify({"Message": "User Logged out!"}), 200
    else:
        return jsonify({"Error": "User already Logged out"}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5002", debug=True, load_dotenv=True)
