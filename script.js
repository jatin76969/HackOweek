// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// App State
let currentState = {
    studentId: null,
    student: {
        name: "",
        roll: "",
        institute: ""
    },
    questions: [], // Will be fetched from API
    currentQuestionIndex: 0,
    answers: [],
    timeLeft: 600, // 10 minutes in seconds
    timerInterval: null
};

// DOM Elements
const entrySection = document.getElementById('entry-form-section');
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');

const registrationForm = document.getElementById('registration-form');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const qCurrent = document.getElementById('q-current');
const progressBar = document.getElementById('progress-bar');
const timerDisplay = document.getElementById('timer');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');

// --- Initialization ---
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validateForm()) {
        try {
            await registerStudent();
            await fetchQuestions();
            startQuiz();
        } catch (err) {
            alert("Error connecting to backend: " + err.message);
        }
    }
});

async function registerStudent() {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: currentState.student.name,
            rollNumber: currentState.student.roll,
            institute: currentState.student.institute
        })
    });

    if (!response.ok) throw new Error('Registration failed');
    const data = await response.json();
    currentState.studentId = data.studentId;
}

async function fetchQuestions() {
    const response = await fetch(`${API_BASE_URL}/quiz`);
    if (!response.ok) throw new Error('Failed to fetch questions');
    currentState.questions = await response.json();
    currentState.answers = Array(currentState.questions.length).fill(null);
}

function validateForm() {
    const name = document.getElementById('student-name').value.trim();
    const roll = document.getElementById('roll-number').value.trim();
    const institute = document.getElementById('institute').value.trim();
    let isValid = true;

    if (!name) {
        showError('name-error', 'Name is required');
        isValid = false;
    } else {
        clearError('name-error');
    }

    if (!roll) {
        showError('roll-error', 'Roll number is required');
        isValid = false;
    } else {
        clearError('roll-error');
    }

    if (!institute) {
        showError('institute-error', 'Institute name is required');
        isValid = false;
    } else {
        clearError('institute-error');
    }

    if (isValid) {
        currentState.student = { name, roll, institute };
    }
    return isValid;
}

function showError(id, msg) {
    document.getElementById(id).textContent = msg;
}

function clearError(id) {
    document.getElementById(id).textContent = '';
}

// --- Quiz Logic ---
function startQuiz() {
    entrySection.classList.remove('active');
    quizSection.classList.add('active');

    document.getElementById('display-name').textContent = currentState.student.name;
    document.getElementById('display-roll').textContent = currentState.student.roll;

    renderQuestion();
    startTimer();
}

function renderQuestion() {
    const q = currentState.questions[currentState.currentQuestionIndex];
    questionText.textContent = q.question;
    qCurrent.textContent = currentState.currentQuestionIndex + 1;

    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = `option-btn ${currentState.answers[currentState.currentQuestionIndex] === index ? 'selected' : ''}`;
        btn.innerHTML = `<span>${String.fromCharCode(65 + index)}.</span> ${opt}`;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });

    updateNavigation();
    updateProgressBar();
}

function selectOption(index) {
    currentState.answers[currentState.currentQuestionIndex] = index;
    renderQuestion();
}

function updateNavigation() {
    prevBtn.disabled = currentState.currentQuestionIndex === 0;

    const isLast = currentState.currentQuestionIndex === currentState.questions.length - 1;
    if (isLast) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

function updateProgressBar() {
    const progress = ((currentState.currentQuestionIndex + 1) / currentState.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

prevBtn.onclick = () => {
    if (currentState.currentQuestionIndex > 0) {
        currentState.currentQuestionIndex--;
        renderQuestion();
    }
};

nextBtn.onclick = () => {
    if (currentState.currentQuestionIndex < currentState.questions.length - 1) {
        currentState.currentQuestionIndex++;
        renderQuestion();
    }
};

submitBtn.onclick = async () => {
    if (confirm("Are you sure you want to submit?")) {
        try {
            await submitQuiz();
            await showResults();
        } catch (err) {
            alert("Submission failed: " + err.message);
        }
    }
};

async function submitQuiz() {
    const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            studentId: currentState.studentId,
            answers: currentState.answers
        })
    });

    if (!response.ok) throw new Error('Submission failed');
}

// --- Timer ---
function startTimer() {
    currentState.timerInterval = setInterval(() => {
        currentState.timeLeft--;
        const minutes = Math.floor(currentState.timeLeft / 60);
        const seconds = currentState.timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (currentState.timeLeft <= 0) {
            clearInterval(currentState.timerInterval);
            alert("Time is up! Submitting your answers.");
            submitBtn.click();
        }
    }, 1000);
}

// --- Results Dashboard ---
async function showResults() {
    clearInterval(currentState.timerInterval);

    const response = await fetch(`${API_BASE_URL}/results/${currentState.studentId}`);
    if (!response.ok) throw new Error('Failed to fetch results');
    const data = await response.json();

    quizSection.classList.remove('active');
    resultsSection.classList.add('active');

    const breakdownContainer = document.getElementById('question-list');
    breakdownContainer.innerHTML = '';

    data.breakdown.forEach((item, i) => {
        const element = document.createElement('div');
        element.className = `breakdown-item ${item.isCorrect ? 'correct' : 'incorrect'}`;
        element.innerHTML = `
            <p><strong>Q${i + 1}: ${item.question}</strong></p>
            <p>Your Answer: ${item.studentAnswer !== null ? item.options[item.studentAnswer] : 'Not Answered'}</p>
            <p>Correct Answer: ${item.options[item.correctAnswer]}</p>
        `;
        breakdownContainer.appendChild(element);
    });

    // Update UI
    document.getElementById('res-name').textContent = data.student.name;
    document.getElementById('res-roll').textContent = data.student.rollNumber;
    document.getElementById('res-inst').textContent = data.student.institute;
    document.getElementById('res-accuracy').textContent = `${(data.score / data.total) * 100}%`;
    document.getElementById('score-text').textContent = `${data.score}/${data.total}`;

    // Circular progress
    const circle = document.getElementById('score-circle-progress');
    const pct = (data.score / data.total) * 100;
    circle.setAttribute('stroke-dasharray', `${pct}, 100`);
}

