
# 🏠 Rental Website – MERN Stack

A rental platform where users can view, list, and manage rental properties. Built using the MERN stack (MongoDB, Express.js, React, Node.js).

---

## 🚀 Features

- User registration and authentication
- Add, edit, and delete rental listings
- View available properties
- Filter by price, location, and availability
- Booking and contact system (optional/future)

---

## 🛠️ Tech Stack

### Frontend
- **React.js** – Component-based UI
- **React Router** – Navigation
- **Axios** – HTTP requests

### Backend
- **Node.js** – Runtime environment
- **Express.js** – Backend framework
- **Mongoose** – MongoDB object modeling

### Database
- **MongoDB** – NoSQL database

### Others
- **Dotenv** – Manage environment variables
- **Cors** – Handle cross-origin requests
- **Nodemon** – Live reloading during development
- **JWT / Bcrypt** – Authentication (if implemented)

---

## 📁 Project Structure (Example)

```
rental-website/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── .env
│   ├── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
├── README.md
```

---

## 🧰 Getting Started

### Prerequisites

- Node.js
- MongoDB (local or Atlas)
- Git

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/rental-website.git
cd rental-website
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

#### 🔐 Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

```bash
npm run dev  # Starts backend with nodemon
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start  # Runs React app on http://localhost:3000
```

---

## 🔗 API Endpoints (Examples)

| Method | Endpoint            | Description             |
|--------|---------------------|-------------------------|
| GET    | /api/properties     | Get all listings        |
| POST   | /api/properties     | Create a new property   |
| GET    | /api/properties/:id | Get property by ID      |
| PUT    | /api/properties/:id | Update a property       |
| DELETE | /api/properties/:id | Delete a property       |

---

## 🙋‍♀️ Team / Authors

- Your Name – [@yourhandle](https://github.com/yourhandle)
- Add team members here...

---

## 📄 License

This project is licensed under the MIT License.
