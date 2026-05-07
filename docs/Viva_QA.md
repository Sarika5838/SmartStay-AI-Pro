# SmartStay AI Pro - Viva Preparation Guide

## Q1: What is the main objective of your project?
**Ans**: The main objective of SmartStay AI Pro is to revolutionize hotel booking by integrating a Conversational AI agent (Gemini API). It acts as a virtual concierge, allowing users to search, compare, and book hotels using natural language instead of traditional form-based filtering.

## Q2: Explain the Tech Stack used in this project.
**Ans**: I used the MERN Stack (MongoDB, Express.js, React.js, Node.js). For the frontend build tool, I used Vite for faster performance. Tailwind CSS was used for styling with a Glassmorphism theme. Google Gemini API powers the AI Chatbot.

## Q3: How does the AI Chatbot work in your application?
**Ans**: The React frontend captures the user's natural language input and sends it to the Express backend. The backend acts as a secure proxy and communicates with the Google Gemini API using the `@google/generative-ai` SDK. I injected a 'System Prompt' into the API context to make it act specifically like a hotel concierge, limiting its responses to travel and booking contexts.

## Q4: Why did you choose MongoDB instead of a SQL database like MySQL?
**Ans**: MongoDB, being a NoSQL document database, provides high flexibility. Hotel data can be complex (e.g., varying room types, amenities arrays, nested availability dates), which maps perfectly to JSON-like BSON documents without requiring rigid schemas and complex table joins.

## Q5: How is user authentication handled?
**Ans**: Authentication is handled using JSON Web Tokens (JWT) and bcryptjs. Passwords are mathematically hashed using bcrypt before saving to MongoDB. Upon successful login, the server generates a JWT, which the frontend stores and sends in the Authorization header (`Bearer <token>`) for subsequent protected API requests.

## Q6: Explain the concept of Glassmorphism used in your UI.
**Ans**: Glassmorphism is a modern UI design trend that mimics the look of frosted glass. In Tailwind CSS, I achieved this using utility classes like `bg-white/70`, `backdrop-blur-md`, and subtle semi-transparent borders. It gives the application a premium, luxurious feel suitable for a high-end hotel booking platform.
