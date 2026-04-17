# APIHUB

APIHUB is a full-stack API testing studio, similar to Postman, designed to help developers test and manage their API requests efficiently.

## 🚀 Features

- **Intuitive UI:** A modern, responsive interface for configuring API requests.
- **Method Support:** Full support for GET, POST, PUT, PATCH, and DELETE methods.
- **History Management:** Automatically saves requests to a sidebar for easy access and re-use.
- **Request Configuration:** Easy editing of URLs, headers (key-value pairs), and request bodies.
- **Persistence:** All saved requests are stored in a MongoDB database.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS 4
- **State Management:** React Hooks (useState, useEffect)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Communication:** CORS enabled for frontend integration

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account (Atlas or local instance)

### 1. Clone the repository
```bash
git clone https://github.com/Dev1822/APIStudio
cd APIStudio
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the server:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and add:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 API Endpoints

- `GET /` - Retrieve all saved API requests.
- `POST /` - Save a new API request configuration.
- `DELETE /:id` - Remove a saved request by its ID.

## Backend Documentation
https://api-studio.docs.buildwithfern.com

Made By : https://github.com/Dev1822
