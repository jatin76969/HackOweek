require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Student = require('./models/Student');
const Response = require('./models/Response');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
let isConnected = false;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        isConnected = true;
    })
    .catch(err => {
        console.error('MongoDB connection error. Falling back to in-memory/JSON storage.');
        console.log('Reason:', err.message);
        isConnected = false;
    });

// Fallback Data Storage (for when DB is unavailable)
const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, 'data_fallback.json');

const loadFallbackData = () => {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE));
    }
    return { students: [], responses: [] };
};

const saveFallbackData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};


// Quiz Questions Data (Mission 2: GET /api/quiz)
const questions = [
    {
        id: 1,
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        answer: 2
    },
    {
        id: 2,
        question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
        options: ["var", "let", "const", "Both let and const"],
        answer: 3
    },
    {
        id: 3,
        question: "What does DOM stand for?",
        options: ["Data Object Model", "Document Object Model", "Dynamic Object Management", "Document Order Model"],
        answer: 1
    },
    {
        id: 4,
        question: "Which company developed the JavaScript language?",
        options: ["Microsoft", "Oracle", "Netscape", "Google"],
        answer: 2
    },
    {
        id: 5,
        question: "What is the result of '2' + 2 in JavaScript?",
        options: ["4", "22", "NaN", "Error"],
        answer: 1
    },
    {
        id: 6,
        question: "Which CSS property is used to change the text color of an element?",
        options: ["text-color", "fg-color", "color", "font-color"],
        answer: 2
    },
    {
        id: 7,
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<css>", "<script>", "<style>", "<link>"],
        answer: 2
    },
    {
        id: 8,
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: 1
    },
    {
        id: 9,
        question: "Which of these is a popular JavaScript framework/library?",
        options: ["Django", "Laravel", "React", "Flask"],
        answer: 2
    },
    {
        id: 10,
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msg('Hello World')", "alertBox('Hello World')", "alert('Hello World')", "console.log('Hello World')"],
        answer: 2
    }
];

// --- API Endpoints ---

// POST /api/register - Save student details
app.post('/api/register', async (req, res) => {
    try {
        const { name, rollNumber, institute } = req.body;

        if (isConnected) {
            let student = await Student.findOne({ rollNumber });
            if (!student) {
                student = new Student({ name, rollNumber, institute });
                await student.save();
            }
            return res.status(201).json({
                message: 'Student registered successfully',
                studentId: student._id,
                student
            });
        } else {
            // Fallback Logic
            const data = loadFallbackData();
            let student = data.students.find(s => s.rollNumber === rollNumber);
            if (!student) {
                student = { _id: Date.now().toString(), name, rollNumber, institute, registrationTimestamp: new Date() };
                data.students.push(student);
                saveFallbackData(data);
            }
            return res.status(201).json({
                message: 'Student registered successfully (Local Fallback)',
                studentId: student._id,
                student
            });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /api/quiz - Fetch all 10 programming questions
app.get('/api/quiz', (req, res) => {
    // Send questions without the 'answer' field for security
    const sanitizedQuestions = questions.map(({ answer, ...rest }) => rest);
    res.json(sanitizedQuestions);
});

// POST /api/submit - Receive answers, calculate score, store in database
app.post('/api/submit', async (req, res) => {
    try {
        const { studentId, answers } = req.body;

        if (!studentId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: 'Invalid submission data' });
        }

        // Calculate score
        let score = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.answer) {
                score++;
            }
        });

        if (isConnected) {
            const response = new Response({ studentId, answers, score });
            await response.save();
        } else {
            // Fallback Logic
            const data = loadFallbackData();
            const response = {
                _id: Date.now().toString(),
                studentId,
                answers,
                score,
                dateSubmitted: new Date()
            };
            data.responses.push(response);
            saveFallbackData(data);
        }

        res.status(201).json({
            message: 'Quiz submitted successfully',
            score,
            total: questions.length
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /api/results/:studentId - Retrieve student results with details
app.get('/api/results/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        let student, latestResponse;

        if (isConnected) {
            student = await Student.findById(studentId);
            if (!student) return res.status(404).json({ error: 'Student not found' });

            const responses = await Response.find({ studentId }).sort({ dateSubmitted: -1 });
            if (responses.length === 0) return res.status(404).json({ error: 'No quiz responses found for this student' });
            latestResponse = responses[0];
        } else {
            // Fallback Logic
            const data = loadFallbackData();
            student = data.students.find(s => s._id === studentId);
            if (!student) return res.status(404).json({ error: 'Student not found in local data' });

            const studentResponses = data.responses
                .filter(r => r.studentId === studentId)
                .sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted));

            if (studentResponses.length === 0) return res.status(404).json({ error: 'No local responses found for this student' });
            latestResponse = studentResponses[0];
        }

        // Detailed breakdown (including questions, provided info, and correct answers)
        const breakdown = questions.map((q, index) => ({
            question: q.question,
            options: q.options,
            studentAnswer: latestResponse.answers[index],
            correctAnswer: q.answer,
            isCorrect: latestResponse.answers[index] === q.answer
        }));

        res.json({
            student: {
                name: student.name,
                rollNumber: student.rollNumber,
                institute: student.institute
            },
            score: latestResponse.score,
            total: questions.length,
            dateSubmitted: latestResponse.dateSubmitted,
            breakdown
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
