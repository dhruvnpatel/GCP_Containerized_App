API Documentation:

---

### API Endpoints

#### Login

- **URL:** `/login`
- **Method:** POST
- **Request Body:** JSON object with the following fields:
  - `email` (string, required): The user's email.
  - `password` (string, required): The user's password (minimum length: 8 characters).
- **Response:**
  - Success (200 OK): Returns a JSON object with a success message if the login is successful.
    - Example:
      ```json
      {
        "Message": "Success!!"
      }
      ```
  - Error (400 Bad Request): Returns a JSON object with an error message if the login data is invalid or the user is not present.
    - Example:
      ```json
      {
        "Error": "User not Present"
      }
      ```
      ```json
      {
        "Error": "Password is incorrect"
      }
      ```

---

Please note that this code also uses the Marshmallow library for request validation. The `LoginUserSchema` class defines the structure and validation rules for the login data. The `errors` variable is used to capture any validation errors, if present.