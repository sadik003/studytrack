// Form Elements

const assignmentForm = document.getElementById("assignmentForm");

const assignmentInput = document.getElementById("assignmentInput");

const courseInput = document.getElementById("courseInput");

const priorityInput = document.getElementById("priorityInput");

// Assignment List

const assignmentList = document.getElementById("assignmentList");

const emptyMsg = document.getElementById("emptyMsg");

// Statistics

const totalCount = document.getElementById("totalCount");

const pendingCount = document.getElementById("pendingCount");

const completedCount = document.getElementById("completedCount");

// Filters

const filterButtons = document.querySelectorAll(".filter-btn");

let assignments = [];
let currentFilter = "all";

/*function render() {
  assignmentList.innerHTML = "";

  if (assignments.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
} */
function render() {
  assignmentList.innerHTML = "";

  if (assignments.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  assignments.forEach(function (assignment) {
    const li = document.createElement("li");

    li.innerHTML = `
    <strong>${assignment.title}</strong><br>
    ${assignment.course}<br>
    Priority: ${assignment.priority}
    <br><br>

    <button class="delete-btn">
        Delete
    </button>
`;

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function () {
      deleteAssignment(assignment.id);
    });

    assignmentList.appendChild(li);
  });
  totalCount.textContent = assignments.length;

  pendingCount.textContent = assignments.filter(function (assignment) {
    return !assignment.completed;
  }).length;

  completedCount.textContent = assignments.filter(function (assignment) {
    return assignment.completed;
  }).length;
}
render();

function addAssignment(title, course, priority) {
  const assignment = {
    id: Date.now().toString(),

    title: title,

    course: course,

    priority: priority,

    completed: false,
  };

  assignments.unshift(assignment);
  console.log(assignments);

  render();
}

function deleteAssignment(id) {
  assignments = assignments.filter(function (assignment) {
    return assignment.id !== id;
  });

  render();
}

assignmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = assignmentInput.value.trim();

  const course = courseInput.value.trim();

  const priority = priorityInput.value;

  if (title === "" || course === "") {
    return;
  }

  addAssignment(title, course, priority);
});
