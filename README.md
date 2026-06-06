# VedaAI – AI-Powered Assignment Generator

## Overview

VedaAI is an AI-powered platform designed to help teachers create, manage, and organize assignments efficiently. The system generates question papers using AI, stores assignments in MongoDB, and provides an intuitive interface for managing educational content.

---

## Features

* AI-generated question papers
* Assignment creation and management
* Multiple question types support

  * MCQs
  * Short Questions
  * Numerical Problems
  * Diagram Questions
* Assignment search and filtering
* PDF export functionality
* Responsive UI
* Cloud deployment using Vercel and Render
* MongoDB Atlas integration

---

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Zustand
* Axios

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
* OpenRouter AI API

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Architecture Overview

Frontend (Next.js)
↓
REST API Calls
↓
Backend (Express.js)
↓
MongoDB Atlas

AI Question Generation Flow:

User Input
↓
Frontend Request
↓
Express Backend
↓
OpenRouter AI API
↓
Generated Question Paper
↓
MongoDB Storage
↓
Display & Download

---

## Approach

1. Designed a teacher-focused assignment management workflow.
2. Implemented a modular frontend using reusable React components.
3. Built REST APIs for assignment CRUD operations.
4. Integrated OpenRouter AI models for dynamic question paper generation.
5. Stored assignment metadata and generated papers in MongoDB Atlas.
6. Added PDF generation and download support.
7. Deployed the frontend and backend separately for scalability.

---

## Project Structure

vedaAI/
├── frontend/
│ ├── src/
│ ├── components/
│ ├── services/
│ └── app/
│
├── backend/
│ ├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── services/
│
└── README.md

---

## Setup Instructions

### Clone Repository

git clone https://github.com/KRITIKA233CODER/vedaAI.git

cd vedaAI

### Backend Setup

cd backend

npm install

Create .env file:

PORT=5000

MONGO_URI=YOUR_MONGODB_URI

OPENROUTER_API_KEY=YOUR_API_KEY

Run backend:

npm run dev

### Frontend Setup

cd frontend

npm install

Create .env.local file:

NEXT_PUBLIC_API_URL=http://localhost:5000

Run frontend:

npm run dev

---

## Future Improvements

* Voice-based assignment generation
* Improved PDF formatting
* Assignment analytics dashboard
* AI-generated answer keys
* Advanced filtering and sorting
* Real-time collaboration features

---

## Author

Kritika Niranjan Dangi

B.Tech, VIT Bhopal University
