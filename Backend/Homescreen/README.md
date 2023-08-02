The code you provided is a Flask application that provides two API endpoints: `/home` and `/logout`. Here's the API documentation for the code:

---

### API Endpoints

#### Home

- **URL:** `/home`
- **Method:** GET
- **Parameters:** 
  - `user` (string): The username of the logged-in user.
- **Response:**
  - Success (200 OK): Returns a JSON object with a list of active users (excluding the logged-in user).
    - Example:
      ```json
      {
        "Active Users": ["User1", "User2", "User3"]
      }
      ```
  - Error (400 Bad Request): Returns a JSON object with an error message if the user is not logged in.
    - Example:
      ```json
      {
        "Error": "User is not Logged in"
      }
      ```

#### Logout

- **URL:** `/logout`
- **Method:** GET
- **Parameters:** 
  - `user` (string): The username of the logged-in user.
- **Response:**
  - Success (200 OK): Returns a JSON object with a success message if the user is successfully logged out.
    - Example:
      ```json
      {
        "Message": "User Logged out!"
      }
      ```
  - Error (400 Bad Request): Returns a JSON object with an error message if the user is already logged out.
    - Example:
      ```json
      {
        "Error": "User already Logged out"
      }
      ```

---

Please note that this code relies on Firebase Firestore for the database operations. You may need to set up the Firebase project and configure the necessary credentials for the code to work correctly.