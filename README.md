# **Fruit List Backend**

This is the backend of the Fruit List application, built with **Node.js** and **Express.js**. It handles user authentication, CRUD operations for fruits, and recycle bin management. The backend uses `storage.json` to store data temporarily.

---

## **Features**
1. **User Authentication**
   - Signup and Login functionality with password validation.

2. **Fruit Management**
   - Add fruits.
   - Delete fruits (move to the recycle bin).
   - Restore fruits from the recycle bin.
   - Permanently delete fruits from the recycle bin.

3. **Recycle Bin Operations**
   - Restore or permanently delete fruits.
   - Empty the recycle bin entirely.

4. **Frontend Data Integration**
   - Provides a `/data` endpoint for fetching all app data.

---

## **Project Structure**

```plaintext
backend/
├── index.js           # Main server file
├── package.json       # Dependency manager file
├── package-lock.json  # Lock file for dependencies
├── storage.json       # Data storage file
└── README.md          # Project documentation
```

# API Endpoints

## 1. User Authentication

### **Method:** POST  
**Endpoint:** `/signup`  
**Description:** Register a new user  
**Request Body:**  
```json
{ 
  "username": "user1", 
  "password": "pass1", 
  "confirmPassword": "pass1" 
}
```

### **Method:** POST  
**Endpoint:** `/login`  
**Description:** Login with credentials  
**Request Body:**  
```json
{ 
  "username": "user1", 
  "password": "pass1" 
}
```

## 2. Fruit Management

### **Method:** POST  
**Endpoint:** `/fruits`  
**Description:** Add a new fruit  
**Request Body:**  
```json
{ 
  "fruit": "Apple" 
}
```

### **Method:** DELETE  
**Endpoint:** `/fruits`  
**Description:** Delete a fruit (move to recycle bin)  
**Request Body:**  
```json
{ 
  "index": 0 
}
```

## 3. Recycle Bin Operations

### **Method:** POST  
**Endpoint:** `/recyclebin/restore`  
**Description:** Restore a fruit from recycle bin  
**Request Body:**  
```json
{ 
  "index": 0 
}
```

### **Method:** DELETE  
**Endpoint:** `/recyclebin`  
**Description:** Permanently delete a fruit from recycle bin 
**Request Body:**  
```json
{ 
  "index": 0 
}
```

### **Method:** DELETE  
**Endpoint:** `/recyclebin/empty`  
**Description:** Permanently delete a fruit from recycle bin 
**Request Body:** none

## 4. Fetch App Data

### **Method:** GET 
**Endpoint:** `/data`  
**Description:** Fetch all app data  
**Request Body:** none

# Backend Process Overview

## Middleware:
- **cors**: Enables cross-origin requests for frontend communication.
- **body-parser**: Parses incoming JSON requests.

## Storage:
- Data is stored in `storage.json`.
- Contains three main arrays:
  - **fruitList**: The main list of fruits.
  - **recycleBin**: Holds fruits moved to the recycle bin.
  - **users**: Stores registered user credentials.

## Helper Functions:
- **readData()**: Reads data from `storage.json`.
- **writeData(data)**: Writes updated data to `storage.json`.
- **logArrays(data)**: Logs the current state of the arrays to the console for debugging.

## Routes:
- **Signup/Login**:
  - Validates and registers users.
- **Fruit Management**:
  - Adds, deletes, and restores fruits while maintaining their order.
- **Recycle Bin**:
  - Handles restore, permanent delete, and empty operations for the recycle bin.
- **Data Endpoint**:
  - Provides all current data to the frontend.

## Logging:
- Each operation logs the current state of `fruitList`, `recycleBin`, and `users` arrays to the console.

## Project Details:
- **Tech Stack**:
  - **Node.js**: Runtime environment.
  - **Express.js**: Framework for building the API.
  - **JSON File**: Temporary storage (not persistent).
