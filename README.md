# 💸 Expense Tracker — MERN Stack Finance Management App

A modern full-stack Expense Tracker application built using the MERN Stack with secure JWT authentication, cookie-based sessions, responsive fintech-style UI, and smooth user experience. This application helps users manage their income and expenses efficiently with a clean dashboard and real-time transaction tracking.

---

# 🚀 Features

## 🔐 Authentication System

* User Registration
* Secure Login & Logout
* JWT Authentication
* HTTP-only Cookie Storage
* Protected Routes

---

## 💰 Transaction Management

* Add Income & Expenses
* Delete Transactions
* View Transaction History
* Category-based Transactions
* Real-time Balance Calculation

---

## 📊 Dashboard Analytics

* Total Balance Overview
* Total Income Tracking
* Total Expense Tracking
* Dynamic Financial Summary Cards

---

## 🎨 Modern UI/UX

* Responsive Design
* Tailwind CSS Styling
* Professional Fintech Dashboard
* Smooth Hover Effects
* Clean Component Architecture
* Mobile Friendly Layout

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router

---

## Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* bcryptjs
* cookie-parser

---

# 📂 Project Structure

```txt
Expense-tracker/
│
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       ├── validations/
│       ├── app.js
│       └── server.js
```

---

# ⚡ Installation

## Clone Repository

```bash
git clone <your-repo-link>
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 🔗 API Routes

## Authentication Routes

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |
| POST   | `/api/auth/logout`   |
| GET    | `/api/auth/me`       |

---

## Transaction Routes

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | `/api/transactions`     |
| GET    | `/api/transactions`     |
| DELETE | `/api/transactions/:id` |

---

# 🎯 Learning Outcomes

This project demonstrates:

* Full-stack MERN development
* REST API architecture
* Authentication & Authorization
* JWT & Cookie Handling
* MongoDB Relationships
* Protected Routes
* React State Management
* Responsive UI Design
* Modular Backend Architecture

---

# 🌟 Future Improvements

* Update Transactions
* Monthly Analytics Charts
* Budget Planning
* Expense Categories Visualization
* Dark Mode
* Export Reports
* Pagination & Filtering
* GSAP Animations
* AI Expense Insights

---

# 📸 Preview

A clean and responsive fintech-style expense management dashboard with secure authentication and real-time transaction tracking.

---

# 👨‍💻 Author

Developed with ❤️ using the MERN Stack.
