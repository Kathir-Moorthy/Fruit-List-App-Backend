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
