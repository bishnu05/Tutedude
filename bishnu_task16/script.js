let students = [
  {
    name: "Bishnu Gorai",
    marks: 90,
    class: "VII",
    address: "kolkata,West Bengal",
  },
  {
    name: "Bhumika Kolhatkar",
    marks: 85,
    class: "VI",
    address: "Mumbai,Maharashtra",
  },
  {
    name: "Bharat Raina",
    marks: 75,
    class: "X",
    address: "Chennai,Tamil Nadu",
  },
  {
    name: "Priyam Mondal",
    marks: 70,
    class: "IX",
    address: "Bangalore,Karnataka",
  },
  {
    name: "Rahul Chimaniya",
    marks: 65,
    class: "VII",
    address: "Bhopal,Madhya Pradesh",
  },
  { name: "Janki Gohil", marks: 60, class: "XI", address: "Bhavnagar,Gujarat" },
  {
    name: "Ananya Shrivastava",
    marks: 55,
    class: "XII",
    address: "Ranchi,Jharkhand",
  },
  {
    name: "Rohit Kumar",
    marks: 50,
    class: "XIII",
    address: "Lucknow,Uttar Pradesh",
  },

  {
    name: "Satish Patel",
    marks: 40,
    class: "XV",
    address: "Ahmedabad,Gujarat",
  },
  {
    name: "Roma Agarwal",
    marks: 35,
    class: "XVI",
    address: "Bhubaneshwar,Odisha",
  },
  {
    name: "Payal Ghosale",
    marks: 30,
    class: "XVII",
    address: "Pune,Maharashtra",
  },
  {
    name: "Sonali Debnath",
    marks: 25,
    class: "XVIII",
    address: "Guawahati,Assam",
  },
  {
    name: "Sanchita Majumder",
    marks: 20,
    class: "XIX",
    address: "Siliguri,West Bengal",
  },
  {
    name: "Sakshi Mane",
    marks: 15,
    class: "XX",
    address: "Kolhapur,Maharashtra",
  },
  {
    name: "Ishita Sharma",
    marks: 10,
    class: "XXI",
    address: "Indore,Madhya Pradesh",
  },
  {
    name: "Priyali Gupta",
    marks: 5,
    class: "XXII",
    address: "Jaipur,Rajasthan",
  },
  {
    name: "Tanmoy Mondal",
    marks: 0,
    class: "XXIII",
    address: "Durgapur,West Bengal",
  },
  {
    name: "Selva Raman",
    marks: 95,
    class: "XXIV",
    address: "Chennai,Tamil Nadu",
  },
  {
    name: "Akash Kolte",
    marks: 88,
    class: "XXV",
    address: "Pune,Maharashtra",
  },
  {
    name: "Ankita Singh",
    marks: 92,
    class: "XXVI",
    address: "Lucknow,Uttar Pradesh",
  },
];

// let container = document.getElementById("container");

// let card = document.createElement("div");
// card.classList.add("student-container");

// students.map((student) => {
//   let studentDiv = document.createElement("div");
//   studentDiv.classList.add("student");
//   studentDiv.innerHTML = `
//     <p>Student Name: <strong>${student.name}</strong></p>
//     <p>Marks: <strong>${student.marks}</strong></p>
//     <p>Class: <strong>${student.class}</strong></p>
//     <p>Address: <strong>${student.address}</strong></p>
//   `;
//   card.appendChild(studentDiv);
// });

// container.appendChild(card);

// const searchInput = document.getElementById("searchInput");
// const searchButton = document.getElementById("searchBtn");

// searchButton.addEventListener("click", () => {
//   let searchValue = searchInput?.value?.trim();
//   card.innerHTML = "";

//   students
//     .filter((student) => {
//       return student.name.toLowerCase().startsWith(searchValue.toLowerCase());
//     })
//     .map((student) => {
//       let studentDiv = document.createElement("div");
//       studentDiv.classList.add("student");
//       studentDiv.innerHTML = `
//     <p>Student Name: <strong>${student.name}</strong></p>
//     <p>Marks: <strong>${student.marks}</strong></p>
//     <p>Class: <strong>${student.class}</strong></p>
//     <p>Address: <strong>${student.address}</strong></p>
//   `;
//       card.appendChild(studentDiv);
//     });
// });

// container.appendChild(card);

// searchInput.addEventListener("input", () => {
//   let searchValue = searchInput.value.trim().toLowerCase();

//   // Input clear hai → saare students show karo
//   if (searchValue === "") {
//     card.innerHTML = "";

//     students.map((student) => {
//       let studentDiv = document.createElement("div");
//       studentDiv.classList.add("student");

//       studentDiv.innerHTML = `
//         <p>Student Name: <strong>${student.name}</strong></p>
//         <p>Marks: <strong>${student.marks}</strong></p>
//         <p>Class: <strong>${student.class}</strong></p>
//         <p>Address: <strong>${student.address}</strong></p>
//       `;

//       card.appendChild(studentDiv);
//     });
//   }
// });

let container = document.getElementById("container");
let card = document.createElement("div");
card.classList.add("student-container");
container.appendChild(card);

// Function to display students
function displayStudents(studentList) {
  card.innerHTML = "";

  studentList.map((student) => {
    let studentDiv = document.createElement("div");
    studentDiv.classList.add("student");

    studentDiv.innerHTML = `
      <p>Student Name: <strong>${student.name}</strong></p>
      <p>Marks: <strong>${student.marks}</strong></p>
      <p>Class: <strong>${student.class}</strong></p>
      <p>Address: <strong>${student.address}</strong></p>
    `;

    card.appendChild(studentDiv);
  });
}

// Initial display
displayStudents(students);
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn");

// Search button
searchButton.addEventListener("click", () => {
  let searchValue = searchInput.value.trim().toLowerCase();

  let filteredStudents = students.filter((student) => {
    return student.name.toLowerCase().startsWith(searchValue);
  });
  displayStudents(filteredStudents);
});


searchInput.addEventListener("input", () => {
  let searchValue = searchInput.value.trim();

  if (searchValue === "") {
    displayStudents(students);
  }
});
