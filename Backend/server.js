
const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(express.json());

// MongoDB connection
const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);

const uri = `mongodb+srv://${username}:${password}@studyai.f3vchxe.mongodb.net/StudyAI?appName=StudyAI`;

const client = new MongoClient(uri);

async function connectDatabase() {
    try {
        await client.connect();
        await client.db("StudyAI").command({ ping: 1 });
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection failed!");
        console.error(error.message);
    }
}

app.get("/", (req, res) => {
    res.json({
        message: "StudyAI Backend is running 🚀"
    });
});

async function startServer() {
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(`StudyAI server running on http://localhost:${PORT}`);
    });
}

startServer();
