API Documentation:

---

### API Endpoints

#### Register

- **URL:** `/registration`
- **Method:** POST
- **Request Body:** JSON object with the following fields:
  - `name` (string, required): The user's name.
  - `password` (string, required): The user's password (minimum length: 8 characters).
  - `email` (string, required): The user's email.
  - `location` (string, required): The user's location.
- **Response:**
  - Success (200 OK): Returns a JSON object with a success message if the registration is successful.
    - Example:
      ```json
      {
        "Message": "User Registration Successful!"
      }
      ```
  - Error (400 Bad Request): Returns a JSON object with an error message if the registration data is invalid or the user is already registered.
    - Example:
      ```json
      {
        "Error": "User is already registered. Login directly!!"
      }
      ```

---

Please note that this code also uses the Marshmallow library for request validation. The `UserSchema` class defines the structure and validation rules for the registration data. The `errors` variable is used to capture any validation errors, if present.