# E-Commerce Backend API

A scalable and secure **E-commerce Backend API** built using **Node.js**, **Express**, and **MongoDB**.
This project provides core backend functionality required for an e-commerce application, including authentication, user management, product management, and address handling.

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- User Login
- User Logout
- Email Verification
- Resend Verification Email
- Forgot Password
- Change Password

### 👤 User

- Get User Profile
- Update User Profile

### 📦 Product

- Create Product
- Update Product
- Delete Product
- Get Single Product
- Get Multiple Products (with filters & pagination)

### 🏠 Address

- Create Address
- Update Address
- Delete Address
- Get All Addresses for a User

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose)
- **JWT** (Authentication & Authorization)
- **bcrypt** (Password hashing)
- **Nodemailer & Mailgen** (Email services)
- **dotenv** (Environment variables)

---

## 📁 Project Structure

- **`/src`**: Contains the source code for the application.
  - `app.js`: Contains all middlewares of the application.
  - `index.js`: Entry point of the application.
  - `/controllers`: Reusable UI components.
  - `/database`: Reusable UI components.
  - `/middlewares`: Reusable UI components.
  - `/models`: Reusable UI components.
  - `/routes`: Utility functions and helpers.
  - `/utils`: Utility functions and helpers.
  - `/validators`: Utility functions and helpers.
- **`.env`**: Contains environment variables
- **`.env.sample`**: Template for **`.env`** file

---

## ▶️ Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend
```

### 🔑 Environment Variables

Create a `.env` file in the root directory. Copy the env examples from `.env.example` file.
