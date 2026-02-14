/* LOGIN */
function login() {
  if (user.value.trim() !== "") {
    location = "dashboard.html";
  } else {
    error.innerText = "Please enter ID";
  }
}

function logout() {
  location = "index.html";
}

/* STUDENT DATA (100 RANDOM STUDENTS) */
const students = [];
const names = [
  "palak singh","aryann ","mohit","shivang singh","om Singh",
  "palak Gupta","disha jaiswal","kishan pandey","badal singh","Ananya Roy","palak singh"
,"aarav sharma"
,"vivaan mehta"
,"aditya verma"
,"arjun patel"
,"rohan singh"
,"ishita gupta"
,"neha joshi"
,"kunal shah"
,"priya nair"
,"ananya roy"
,"rahul khanna"
,"sakshi malhotra"
,"manish kumar"
,"pooja mishra"
,"nikhil agarwal"
,"simran kaur"
,"alok tiwari"
,"kavya jain"
,"saurabh pandey"

];
const classes = ["BCA","BSc IT","BTech"];
const divisions = ["A","B"];

for (let i = 1; i <= 100; i++) {
  students.push({
    roll: i,
    name: names[i % names.length],
    class: classes[i % classes.length],
    div: divisions[i % divisions.length],
    attendance: Math.floor(Math.random() * 30) + 70,
    cgpa: (Math.random() * 3 + 6).toFixed(2),
    projects: Math.floor(Math.random() * 6) + 1
  });
}

let currentList = [];

/* SHOW CLASS & DIVISION */
if (document.getElementById("classList")) {
  classes.forEach(c => {
    divisions.forEach(d => {
      classList.innerHTML +=
        `<button class="class-btn" onclick="showStudents('${c}','${d}')">${c} - ${d}</button>`;
    });
  });
}

/* SHOW STUDENTS AFTER CLASS CLICK */
function showStudents(cls, div) {
  currentList = students.filter(s => s.class === cls && s.div === div);
  loadTable(currentList);
}

/* LOAD TABLE */
function loadTable(data) {
  studentTable.innerHTML = "";
  noResult.style.display = data.length === 0 ? "block" : "none";

  data.forEach(s => {
    studentTable.innerHTML += `
      <tr>
        <td>${s.roll}</td>
        <td>${s.name}</td>
        <td>${s.class}</td>
        <td>${s.div}</td>
        <td class="att">${s.attendance}%</td>
        <td class="cgpa">${s.cgpa}</td>
        <td class="proj">${s.projects}</td>
        <td><button class="edit-btn" onclick="editStudent(${s.roll})">Edit</button></td>
      </tr>
    `;
  });

  toggleColumns();
}

/* SEARCH BY NAME OR CLASS */
function searchStudent() {
  let value = searchInput.value.toLowerCase();
  let filtered = currentList.filter(s =>
    s.name.toLowerCase().includes(value) ||
    s.class.toLowerCase().includes(value)
  );
  loadTable(filtered);
}

/* SHOW / HIDE DETAILS */
function toggleColumns() {
  document.querySelectorAll(".att").forEach(e =>
    e.style.display = showAttendance.checked ? "" : "none");

  document.querySelectorAll(".cgpa").forEach(e =>
    e.style.display = showCGPA.checked ? "" : "none");

  document.querySelectorAll(".proj").forEach(e =>
    e.style.display = showProjects.checked ? "" : "none");

  attHead.style.display = showAttendance.checked ? "" : "none";
  cgpaHead.style.display = showCGPA.checked ? "" : "none";
  projHead.style.display = showProjects.checked ? "" : "none";
}

document.addEventListener("change", toggleColumns);

/* EDIT STUDENT */
function editStudent(roll) {
  const s = students.find(st => st.roll === roll);
  s.attendance = prompt("Attendance", s.attendance);
  s.cgpa = prompt("CGPA", s.cgpa);
  s.projects = prompt("Projects", s.projects);
  alert("Student record updated");
}
