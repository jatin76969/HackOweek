let tasks = JSON.parse(localStorage.getItem('be_productive_tasks')) || [];
let currentFilter = 'all';
let currentCategory = 'Personal';
let currentPriority = 'Medium';
let editingTaskId = null;

// --- DOM Elements ---
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const progressBar = document.getElementById('task-progress');
const progressPercent = document.getElementById('progress-percent');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const themeToggle = document.getElementById('theme-toggle');
const greetingEl = document.getElementById('greeting');
const displayDateEl = document.getElementById('display-date');
const displayTimeEl = document.getElementById('display-time');
const quoteText = document.getElementById('quote-text');
const categoryPills = document.querySelectorAll('#category-selector .pill');
const priorityPills = document.querySelectorAll('#priority-selector .pill');
const editModal = document.getElementById('edit-modal');
const editInput = document.getElementById('edit-task-input');
const saveEditBtn = document.getElementById('save-edit');
const cancelEditBtn = document.getElementById('cancel-edit');

// --- Motivational Quotes ---
const quotes = [
    "The secret of getting ahead is getting started.",
    "Your future is created by what you do today, not tomorrow.",
    "Don't stop until you're proud.",
    "Productivity is being able to do things that you were never able to do before.",
    "Focus on being productive instead of busy.",
    "Small progress is still progress.",
    "Action is the foundational key to all success."
];

// --- Initialization ---
function init() {
    updateDateTime();
    updateGreeting();
    renderTasks();
    updateStats();
    setInterval(updateDateTime, 1000);

    // Check for saved theme
    if (localStorage.getItem('be_productive_theme') === 'dark') {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// --- Core Functions ---

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    displayDateEl.textContent = now.toLocaleDateString('en-US', options);
    displayTimeEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function updateGreeting() {
    const hour = new Date().getHours();
    let text = "Good ";
    if (hour < 12) text += "Morning";
    else if (hour < 17) text += "Afternoon";
    else text += "Evening";
    greetingEl.textContent = `${text}, Jatin!`;
}

function saveTasks() {
    localStorage.setItem('be_productive_tasks', JSON.stringify(tasks));
    updateStats();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;

    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    progressBar.style.width = `${percent}%`;
    progressPercent.textContent = `${percent}%`;

    // Confetti Check
    if (total > 0 && completed === total && !localStorage.getItem('confetti_fired')) {
        fireConfetti();
        localStorage.setItem('confetti_fired', 'true');
    } else if (completed < total) {
        localStorage.removeItem('confetti_fired');
    }

    // Update Quote
    if (completed > 0 && total > 0 && completed === total) {
        quoteText.textContent = "You've crushed it! All tasks completed. 🎉";
    } else {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteText.textContent = `"${quotes[randomIndex]}"`;
    }
}

function renderTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterVal = categoryFilter.value;

    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(searchTerm);
        const matchesCategory = filterVal === 'all' || task.category === filterVal;
        return matchesSearch && matchesCategory;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<li style="text-align:center; padding: 20px; opacity: 0.5;">No tasks found</li>`;
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item glass-card ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="checkbox" onclick="toggleTask(${task.id})">
                <i class="fas fa-check"></i>
            </div>
            <div class="task-content">
                <span class="task-text">${task.text}</span>
                <div class="task-meta">
                    <span class="tag-category cat-${task.category}">${task.category}</span>
                    <span class="tag-priority pri-${task.priority}">${task.priority} Priority</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="action-btn edit-btn" onclick="openEditModal(${task.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// --- Event Handlers ---

addTaskBtn.onclick = () => {
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text: text,
        category: currentCategory,
        priority: currentPriority,
        completed: false,
        createdAt: new Date()
    };

    tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';

    // Add animation class temporarily
    const firstItem = taskList.firstChild;
    if (firstItem) {
        firstItem.style.animation = 'slideIn 0.5s ease';
    }
};

taskInput.onkeypress = (e) => {
    if (e.key === 'Enter') addTaskBtn.onclick();
};

window.toggleTask = (id) => {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks();
    renderTasks();
};

window.deleteTask = (id) => {
    const item = document.querySelector(`[onclick="deleteTask(${id})"]`).closest('.task-item');
    item.style.transform = 'translateX(100px)';
    item.style.opacity = '0';

    setTimeout(() => {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }, 300);
};

window.openEditModal = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    editingTaskId = id;
    editInput.value = task.text;
    editModal.style.display = 'flex';
};

saveEditBtn.onclick = () => {
    const newText = editInput.value.trim();
    if (newText && editingTaskId) {
        tasks = tasks.map(t => t.id === editingTaskId ? { ...t, text: newText } : t);
        saveTasks();
        renderTasks();
        closeModal();
    }
};

cancelEditBtn.onclick = closeModal;

function closeModal() {
    editModal.style.display = 'none';
    editingTaskId = null;
}

// --- Filter & Pill Handlers ---

searchInput.oninput = renderTasks;
categoryFilter.onchange = renderTasks;

categoryPills.forEach(pill => {
    pill.onclick = () => {
        categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCategory = pill.dataset.value;
    };
});

priorityPills.forEach(pill => {
    pill.onclick = () => {
        priorityPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentPriority = pill.dataset.value;
    };
});

// --- Theme Toggle ---
themeToggle.onclick = () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('be_productive_theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
};

// --- Confetti Effect ---
function fireConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Boot up
init();
