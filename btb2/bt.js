class Student {
    constructor(code, name, gender, dob, hometown) {
        this.code = code;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

class StudentManagement {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
    }

    addStudent(student) {
        this.students.push(student);
        this.saveStudents();
    }

    updateStudent(index, student) {
        this.students[index] = student;
        this.saveStudents();
    }

    deleteStudent(index) {
        this.students.splice(index, 1);
        this.saveStudents();
    }

    saveStudents() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    getStudents() {
        return this.students;
    }
}

const studentManagement = new StudentManagement();
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.querySelector('#studentTable tbody');

function renderStudents() {
    studentTableBody.innerHTML = '';
    const students = studentManagement.getStudents();

    students.forEach((student, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.code}</td>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.dob}</td>
            <td>${student.hometown}</td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(tr);
    });
}

function editStudent(index) {
    const student = studentManagement.getStudents()[index];
    document.getElementById('studentId').value = index;
    document.getElementById('studentCode').value = student.code;
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentGender').value = student.gender;
    document.getElementById('studentDOB').value = student.dob;
    document.getElementById('studentHometown').value = student.hometown;
}

function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        studentManagement.deleteStudent(index);
        renderStudents();
    }
}

studentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const studentCode = document.getElementById('studentCode').value;
    const studentName = document.getElementById('studentName').value;
    const studentGender = document.getElementById('studentGender').value;
    const studentDOB = document.getElementById('studentDOB').value;
    const studentHometown = document.getElementById('studentHometown').value;

    const newStudent = new Student(studentCode, studentName, studentGender, studentDOB, studentHometown);

    if (studentId === '') {
        studentManagement.addStudent(newStudent);
    } else {
        studentManagement.updateStudent(studentId, newStudent);
        document.getElementById('studentId').value = '';
    }

    studentForm.reset();
    renderStudents();
});

renderStudents();
