BookIt – Experience Booking Platform

A full-stack booking application built using React (TypeScript) and Node.js with MongoDB, as part of a technical internship assessment.

Overview:

BookIt allows users to browse adventure experiences, view detailed information, select their preferred date and time, and complete a checkout process with promo code validation and booking confirmation.

Features Implemented

✅ Frontend (React + TypeScript)

Home page displaying all experiences using dynamic cards.

View Details page (/details/:id) fetching data via MongoDB.

Date & time slot selection with active highlights.

Confirm button disabled until both date and time are selected.

Checkout page with:

Form validation (name, email required)

Terms and safety policy checkbox (must agree before submitting)

Promo code validation (via backend API)

Result / Confirmation page with booking reference.

✅ Backend (Node.js + Express + MongoDB)

REST APIs for experiences and bookings.

MongoDB Atlas connected successfully (verified via Compass).

Endpoints:

GET /api/experiences – list all experiences

GET /api/experiences/:id – get experience details

POST /api/bookings – store user booking data

POST /api/promo/validate – verify promo code

✅ Data Flow

Data fetched from MongoDB → displayed in React → booking details sent back to backend → stored successfully.

✅ Validations

Cannot confirm booking without date/time.

Checkout won’t submit without agreement checkbox.

Promo code and form inputs fully validated.

Duplicate bookings allowed (realistic scenario for multiple slots).

🛠️ Tech Stack

Frontend: React, TypeScript, Tailwind CSS Backend: Node.js, Express.js Database: MongoDB Atlas API Client: Axios IDE Used: VS Code Testing: Manual testing via browser + MongoDB Compass verification

📸 Verification

All created bookings appear in MongoDB Compass, confirming:

Proper schema

Unique IDs for each booking

Stored details (name, email, slot, date, experienceId)

=====================================================================================================================

==> How to Run

Install dependencies:

npm install

Run backend:

if we want to fetch experiences use command

--> node seed.js

--> npx nodemon server.js

Run frontend:

-->npm run dev

Access at http://localhost:5173
