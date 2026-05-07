# SmartStay AI Pro - College Project Report

## 1. Introduction
SmartStay AI Pro is a comprehensive, AI-driven Hotel Booking Assistant and Concierge application. It addresses the modern needs of travelers by combining traditional hotel booking systems with an advanced Natural Language Processing chatbot powered by Google Gemini API.

## 2. Objective
To build a complete production-ready full-stack web application (MERN stack + Vite + Tailwind CSS) that allows users to seamlessly search for hotels, book rooms, and interact with an AI concierge for personalized travel recommendations.

## 3. Technologies Used
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **AI Engine**: Google Gemini API (@google/generative-ai)
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Razorpay (Demo)

## 4. System Architecture
The application follows a standard client-server architecture:
1. **Client (React SPA)**: Handles UI/UX, routing, state management, and user inputs. Uses Glassmorphism design principles.
2. **Server (Express API)**: Processes business logic, authenticates users, communicates with MongoDB, and interfaces with the external Gemini API.
3. **Database (MongoDB)**: Stores User data, Hotel details, Room configurations, Bookings, and Chat Histories.

## 5. Key Modules
- **Authentication Module**: Secure login/registration.
- **AI Chatbot Module**: Context-aware travel assistant.
- **Hotel Management Module**: Search and filter properties.
- **Booking Module**: Managing room reservations.
