🎵 Tanvi Fullstack — Spotify Lookalike App

A full-stack music streaming web app built with React (Vite), Node.js, Express, and MongoDB.
Users can sign up, log in, upload tracks, create playlists, and play music directly in the browser 🎧

🏗️ Tech Stack
Frontend

React + Vite

React Router DOM

Axios

Context API for Auth & Player state

Backend

Node.js + Express

MongoDB + Mongoose

Multer (for file uploads)

JWT Auth

CORS enabled

🗂️ Project Structure
tanvi-fullstack/
│
├── backend/
│   ├── server.js               # Express server
│   ├── .env                    # Environment variables
│   ├── config/db.js            # MongoDB connection
│   ├── models/                 # User, Track, Playlist models
│   ├── routes/                 # Auth, Track, Playlist routes
│   ├── controllers/            # Route logic
│   ├── middleware/             # Auth + upload middlewares
│   ├── utils/                  # Helper (JWT token)
│   └── uploads/                # Uploaded files (ignored by Git)
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Player, ProtectedRoute, etc.
│   │   ├── contexts/           # AuthContext, TrackContext
│   │   ├── pages/              # Home, Login, Signup, Upload
│   │   ├── services/           # Axios API instance
│   │   ├── App.jsx, main.jsx
│   │   └── styles.css
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
│
├── .gitignore
└── README.md

⚙️ Installation & Setup
1️⃣ Clone repo
git clone https://github.com/<your-username>/tanvi-fullstack.git
cd tanvi-fullstack

2️⃣ Setup backend
cd backend
npm install

Create a .env file in backend/:
PORT=5000
MONGO_URI=mongodb://localhost:27017/spotify_clone
JWT_SECRET=supersecretkey

Start backend:
npm run dev

🧠 Features

✅ User Authentication (JWT-based)
✅ Upload Audio Files (MP3, WAV, etc.)
✅ Stream Songs Directly in Browser
✅ Create & Manage Playlists
✅ Mini Audio Player with Play/Pause/Next/Prev
✅ Search Functionality
✅ Responsive Dark UI
