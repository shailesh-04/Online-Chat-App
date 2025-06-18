# Online-Chat-App
A full-stack real-time chat application built using Node.js, Socket.io, HTML, and Tailwind CSS, with secure user login and registration via email authentication.

---

### 📦 Project: Online Chat App 💬

A real-time online chat application built using **Node.js**, **Socket.io**, **HTML**, and **Tailwind CSS**. This app features **user registration and login with email authentication**, allowing users to engage in live conversations instantly.

---

### 🚀 Features

* 🔐 **Email-based Authentication**

  * User Registration (with email & password)
  * User Login with session management
  * Password hashing using **bcrypt**
  * Secure authentication using **Express-session**

* 💬 **Real-time Chat**

  * One-to-one and global chat rooms using **Socket.io**
  * Live message updates without page reloads
  * Shows active users list in real-time

* 🎨 **Frontend**

  * Responsive UI using **HTML + Tailwind CSS**
  * Simple, elegant layout optimized for desktop and mobile

* ⚙️ **Backend**

  * Built on **Node.js + Express.js**
  * Socket management using **Socket.io**
  * Email authentication logic in a clean MVC structure

---

### 🗂️ Tech Stack

* **Frontend**: HTML, Tailwind CSS
* **Backend**: Node.js, Express.js
* **WebSocket**: Socket.io
* **Authentication**: Email + bcrypt + Express-session
* **Database**: MongoDB or MySQL (depending on your setup)

---

### 📁 Folder Structure (Example)

```
chat-app/
├── public/
│   ├── index.html
│   ├── chat.html
│   └── css/
│       └── tailwind.css
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   └── views/
├── app.js
├── package.json
└── README.md
```

---

### ⚒️ Actual Work Or Data Flow

* 🔐 **Connect Soket.io**

  1. when new login user set status login
  2. when send user message store database and send other user chat
  3. if user is online but not avalable in message send user that time show message number bage
  4. 

---

### ✅ Setup Instructions

1. Clone the repo:

   ```bash
   https://github.com/shailesh-04/Online-Chat-App.git
   cd Online-Chat-App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure `.env` file for MySQL and session secrets.

4. Run the app:

   ```bash
   npm start
   ```

---

### 🔐 Authentication Demo

* Register: `/register`
* Login: `/login`
* Chat Room: `/chat` (protected route)

---

Let me know if you want the actual code structure or a GitHub-ready version of this project scaffold!

start app :
server and app create,
create database ;
create backend;
implement frontend;
