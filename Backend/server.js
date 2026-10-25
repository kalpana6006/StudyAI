
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection
const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);

const uri = `mongodb+srv://${username}:${password}@studyai.f3vchxe.mongodb.net/StudyAI?appName=StudyAI`;

const client = new MongoClient(uri);
let studentsCollection;

async function connectDatabase() {
    await client.connect();

    const database = client.db("StudyAI");
    await database.command({ ping: 1 });

    studentsCollection = database.collection("students");

    console.log("✅ MongoDB connected successfully!");
}

app.get("/", (req, res) => {
    res.json({
        message: "StudyAI Backend is running 🚀"
    });
});

// Student Registration API
app.post("/api/auth/register", async (req, res) => {
    try {
        const {
    name,
    email,
    password,
    dob,
    gender,
    education,
    institution,
    stream,
    subjects,
    targets,
    governmentExam,
    studyHours,
    studyTime,
    learningStyle,
    examType,
    className
} = req.body;

        if (
    !name?.trim() ||
    !email?.trim() ||
    !password ||
    !dob ||
    !gender ||
    !education ||
    !Array.isArray(targets) ||
    targets.length === 0
) {
    return res.status(400).json({
        message: "Please fill all required fields and select at least one target."
    });
}

        if (typeof password !== "string" || password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingStudent = await studentsCollection.findOne({
            email: normalizedEmail
        });

        if (existingStudent) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newStudent = {
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,

    dob,
    gender,
    education,
    institution: institution?.trim() || "",
    stream: stream || "",
    subjects: subjects || "",

    targets,
    governmentExam: governmentExam || "",

    studyHours: studyHours || "",
    studyTime: studyTime || "",
    learningStyle: learningStyle || "",

    examType: String(examType || targets.join(", ")).trim(),
    className: String(className || education).trim(),

    createdAt: new Date()
};

        await studentsCollection.insertOne(newStudent);

        return res.status(201).json({
            message: "Registration successful!"
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        return res.status(500).json({
            message: "Registration failed. Please try again."
        });
    }
});

async function startServer() {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`StudyAI server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Backend startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
