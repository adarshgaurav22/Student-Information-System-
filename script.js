// Initialize Charts
function initializeCharts() {
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(attendanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Attendance %',
                data: [85, 88, 82, 90, 85, 88],
                borderColor: '#4a90e2',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Attendance Trends'
                }
            }
        }
    });

    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [{
                label: 'Grade Distribution',
                data: [30, 45, 15, 8, 2],
                backgroundColor: '#4a90e2'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Grade Distribution'
                }
            }
        }
    });
}

// Navigation
const navLinks = document.querySelectorAll('.nav-links li');
const pages = document.querySelectorAll('.page');

function navigateToPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const pageId = link.getAttribute('data-page');
        navigateToPage(pageId);
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
let isDarkTheme = false;

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = isDarkTheme ? '☀️ Light Mode' : '🌙 Dark Mode';
}

themeToggle.addEventListener('click', toggleTheme);

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function showAddStudentModal() {
    showModal('addStudentModal');
}

function showAddNoticeModal() {
    showModal('addNoticeModal');
}

// Student Management
const students = [
    { id: 1, name: 'John Smith', roll: '101', class: '10', attendance: 92, performance: 'A' },
    { id: 2, name: 'Emma Wilson', roll: '102', class: '10', attendance: 88, performance: 'B+' },
    // Add more sample students
];

function renderStudents(filteredStudents = students) {
    const studentsGrid = document.getElementById('studentsGrid');
    studentsGrid.innerHTML = filteredStudents.map(student => `
        <div class="stat-card">
            <h3>${student.name}</h3>
            <p>Roll No: ${student.roll}</p>
            <p>Class: ${student.class}</p>
            <p>Attendance: ${student.attendance}%</p>
            <p>Performance: ${student.performance}</p>
        </div>
    `).join('');
}

// Attendance Management
function updateCurrentDate() {
    const currentDate = document.getElementById('currentDate');
    const date = new Date();
    currentDate.textContent = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function renderAttendance() {
    const attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = students.map(student => `
        <div class="stat-card">
            <h3>${student.name}</h3>
            <p>Roll No: ${student.roll}</p>
            <div class="attendance-toggle">
                <label>
                    <input type="checkbox" ${student.attendance > 90 ? 'checked' : ''}>
                    Present
                </label>
            </div>
        </div>
    `).join('');
}

// Notice Board
const notices = [
    {
        id: 1,
        title: 'End of Term Exams',
        content: 'End of term examinations will begin from next week. Please check the schedule.',
        priority: 'high',
        date: '2024-03-15'
    },
    // Add more sample notices
];

function renderNotices() {
    const noticesContainer = document.getElementById('noticesContainer');
    noticesContainer.innerHTML = notices.map(notice => `
        <div class="stat-card">
            <div class="notice-header">
                <h3>${notice.title}</h3>
                <span class="priority ${notice.priority}">${notice.priority}</span>
            </div>
            <p>${notice.content}</p>
            <small>${new Date(notice.date).toLocaleDateString()}</small>
        </div>
    `).join('');
}

// Form Submissions
document.getElementById('addStudentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStudent = {
        id: students.length + 1,
        name: formData.get('name'),
        roll: formData.get('roll'),
        class: formData.get('class'),
        attendance: 100,
        performance: 'N/A'
    };
    students.push(newStudent);
    renderStudents();
    closeModal('addStudentModal');
    e.target.reset();
});

document.getElementById('addNoticeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newNotice = {
        id: notices.length + 1,
        title: formData.get('title'),
        content: formData.get('content'),
        priority: formData.get('priority'),
        date: new Date().toISOString().split('T')[0]
    };
    notices.push(newNotice);
    renderNotices();
    closeModal('addNoticeModal');
    e.target.reset();
});

// Search and Filter Functions
document.querySelector('.search-bar input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm) ||
        student.roll.includes(searchTerm)
    );
    renderStudents(filteredStudents);
});

document.getElementById('classFilter').addEventListener('change', (e) => {
    const classFilter = e.target.value;
    const filteredStudents = classFilter 
        ? students.filter(student => student.class === classFilter)
        : students;
    renderStudents(filteredStudents);
});

document.getElementById('sortFilter').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const sortedStudents = [...students].sort((a, b) => {
        switch(sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'roll':
                return a.roll.localeCompare(b.roll);
            case 'performance':
                return b.performance.localeCompare(a.performance);
            default:
                return 0;
        }
    });
    renderStudents(sortedStudents);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    renderStudents();
    renderAttendance();
    renderNotices();
    updateCurrentDate();
});