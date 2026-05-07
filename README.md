# SmartStay AI Pro 🏨🤖

A complete, production-ready AI Hotel Booking Assistant Chatbot built with the MERN stack and Google Gemini API. This project serves as a comprehensive final-year college project demonstrating the integration of generative AI into a traditional e-commerce/booking flow.

## 🌟 Features
- **AI Concierge**: A ChatGPT-like interface powered by Gemini API that understands natural language queries for hotel bookings and travel planning.
- **Modern UI/UX**: Premium luxury hotel theme using Tailwind CSS and Glassmorphism design principles.
- **Full Booking Flow**: Search, compare, and book hotels. (Razorpay integration mock-up).
- **Secure Backend**: Node/Express server with JWT authentication and secure API endpoints.
- **MongoDB Database**: Scalable NoSQL database to store users, hotels, rooms, and chat histories.

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account (or local MongoDB)
- Google Gemini API Key

### 2. Backend Setup
1. Open terminal and navigate to backend: `cd backend`
2. Install dependencies: `npm install`
3. Edit the `.env` file in the `backend` directory and add your credentials:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Start the development server: `npm run dev`

### 3. Frontend Setup
1. Open a new terminal and navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`

### 4. Running the App
Alternatively, you can just run the `start.bat` file in the root directory on Windows to launch both servers simultaneously!

## 📚 College Project Documentation
All project reports and Viva Q&A files are located in the `docs/` folder.
