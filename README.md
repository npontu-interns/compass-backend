# Compass Backend

## ✅ Prerequisites

- **Node.js** v18+
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git**

---

## ⚙️ Setup

```bash
# Clone the repository
git clone https://github.com/your-username/compass-backend.git
cd compass-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
🧾 Configure Environment
Edit .env:

env
MONGO_URI=mongodb://localhost:27017/house_booking_db
JWT_SECRET=your_secure_secret_here
JWT_EXPIRE=30d
NODE_ENV=development
PORT=3000

mongod  # Start MongoDB service in another terminal
# Development (with auto-restart)
npm run dev

# Production
npm start
compass-backend/
├── src/
│   ├── controllers/      # Business logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints  
│   ├── middleware/       # Authentication & validation
│   ├── db/               # Database connection
│   └── app.js            # Main application
├── .env.example          # Environment template
└── package.json
# Clean reinstall
rm -rf node_modules package-lock.json (in bash. rm is not recognized in cmd)
npm install

##Endpoint testing
POST /api/v1/auth/register
Body: { "email": "user@example.com", "password": "secure123" }

POST /api/v1/auth/login
Body: { "email": "user@example.com", "password": "secure123" }

