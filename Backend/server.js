const express = require("express");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "StudyAI Backend is running 🚀"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`StudyAI server running on http://localhost:${PORT}`);
});