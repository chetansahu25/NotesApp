# NotesApp API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication Endpoints

### Register User
Creates a new user account.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Request Body:**
```json
{
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "organisationId": "string" // optional
}
```
- **Success Response:**
  - **Code:** 201
  - **Content:**
```json
{
    "success": true,
    "message": "User registered successfully",
    "user": {
        "_id": "string",
        "name": "string",
        "email": "string",
        "role": "string"
    },
    "accessToken": "string"
}
```
- **Error Response:**
  - **Code:** 409
  - **Content:** `{ "error": "Email already exists" }`
  - **Code:** 500
  - **Content:** `{ "error": "Internal Server Error" }`

### Login User
Authenticates a user and returns tokens.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```
- **Success Response:**
  - **Code:** 200
  - **Content:**
```json
{
    "success": true,
    "message": "Login successful",
    "user": {
        "_id": "string",
        "name": "string",
        "email": "string",
        "role": "string"
    },
    "accessToken": "string"
}
```
- **Error Response:**
  - **Code:** 401
  - **Content:** `{ "error": "Invalid credentials" }`

### Logout User
Logs out the current user and invalidates tokens.

- **URL:** `/auth/logout`
- **Method:** `POST`
- **Authentication:** Required
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Logged out successfully" }`

## Notes Endpoints

### Create Note
Creates a new note.

- **URL:** `/notes/create`
- **Method:** `POST`
- **Authentication:** Required
- **Content-Type:** `application/json`
- **Request Body:**
```json
{
    "title": "string",
    "content": "string",
    "status": "active" // Enum: ['active', 'archived', 'deleted']
}
```
- **Success Response:**
  - **Code:** 201
  - **Content:**
```json
{
    "_id": "string",
    "title": "string",
    "content": "string",
    "status": "string",
    "userId": {
        "_id": "string",
        "name": "string"
    },
    "updatedBy": {
        "_id": "string",
        "name": "string"
    },
    "organisationId": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

### Get All Notes
Retrieves all active notes for the current user.

- **URL:** `/notes`
- **Method:** `GET`
- **Authentication:** Required
- **Success Response:**
  - **Code:** 200
  - **Content:**
```json
[
    {
        "_id": "string",
        "title": "string",
        "content": "string",
        "status": "string",
        "userId": {
            "_id": "string",
            "name": "string"
        },
        "updatedBy": {
            "_id": "string",
            "name": "string"
        },
        "organisationId": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
]
```

### Get Note by ID
Retrieves a specific note by its ID.

- **URL:** `/notes/:id`
- **Method:** `GET`
- **Authentication:** Required
- **URL Parameters:** `id=[string]`
- **Success Response:**
  - **Code:** 200
  - **Content:** Same as single note object from Get All Notes
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Note not found" }`

### Update Note
Updates an existing note.

- **URL:** `/notes/:id`
- **Method:** `PUT`
- **Authentication:** Required
- **URL Parameters:** `id=[string]`
- **Request Body:**
```json
{
    "title": "string",
    "content": "string",
    "status": "string" // Enum: ['active', 'archived', 'deleted']
}
```
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated note object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Note not found" }`

### Delete Note
Soft deletes a note by setting its status to 'deleted'.

- **URL:** `/notes/:id`
- **Method:** `DELETE`
- **Authentication:** Required
- **URL Parameters:** `id=[string]`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Note deleted successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Note not found" }`

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. 

- Stores tokens in the https cookies:
```
accessToken = "" //valid for 15 minutes
refreshToken = "" // valid for 30 minutes
```

- The API uses HTTP-only cookies for refresh tokens
- Access tokens expire after 15 minutes
- Refresh tokens expire after 30 days

## Error Responses
Common error responses across all endpoints:

- **401 Unauthorized:**
```json
{ "error": "Authentication required" }
```

- **403 Forbidden:**
```json
{ "error": "You don't have permission to perform this action" }
```

- **500 Internal Server Error:**
```json
{ "error": "Internal Server Error" }
```

## Data Models

### User Model
```javascript
{
    name: String,
    email: String,
    password: String (hashed),
    role: String,
    organisationId: ObjectId
}
```

### Note Model
```javascript
{
    title: String,
    content: String,
    status: Enum['active', 'archived', 'deleted'],
    userId: {
        name: 'String'
        type: ObjectId,
        ref: 'User'
    },
    updatedBy: {
        name: 'String'
        type: ObjectId,
        ref: 'User'
    },
    organisationId: ObjectId
}
```



## Notes
- All timestamps are in ISO 8601 format
- All IDs are MongoDB ObjectIds
- The API follows RESTful conventions
- All responses are in JSON format
