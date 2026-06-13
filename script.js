// Form Elements

const assignmentForm = document.getElementById("assignmentForm");

const assignmentInput = document.getElementById("assignmentInput");

const courseInput = document.getElementById("courseInput");

const priorityInput = document.getElementById("priorityInput");

const dueDateInput = document.getElementById("dueDate");

// Assignment List

const assignmentList = document.getElementById("assignmentList");

const emptyMsg = document.getElementById("emptyMsg");

// Statistics

const totalCount = document.getElementById("totalCount");

const pendingCount = document.getElementById("pendingCount");

const completedCount = document.getElementById("completedCount");

const completionRate = document.getElementById("completionRate");

// Filters

const filterButtons = document.querySelectorAll(".filter-btn");

// App State

let assignments = [];

let currentFilter = "all";

// Render Function

function render() {
  assignmentList.innerHTML = "";

  let filteredAssignments = assignments;

  if (currentFilter === "active") {
    filteredAssignments = assignments.filter(function (assignment) {
      return !assignment.completed;
    });
  }

  if (currentFilter === "completed") {
    filteredAssignments = assignments.filter(function (assignment) {
      return assignment.completed;
    });
  }

  if (filteredAssignments.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  filteredAssignments.forEach(function (assignment) {
    const li = document.createElement("li");

    if (assignment.completed) {
      li.classList.add("completed");
    }

    let priorityClass = "";

    if (assignment.priority === "High") {
      priorityClass = "high-priority";
    }

    if (assignment.priority === "Medium") {
      priorityClass = "medium-priority";
    }

    if (assignment.priority === "Low") {
      priorityClass = "low-priority";
    }

    const today = new Date().toISOString().split("T")[0];

    const isOverdue =
      assignment.dueDate && assignment.dueDate < today && !assignment.completed;

    if (isOverdue) {
      li.classList.add("overdue");
    }

    li.innerHTML = `
            <div class="assignment-header">

                <strong>${assignment.title}</strong>

                <span class="${priorityClass}">
                    ${assignment.priority}
                </span>

            </div>

            <p><strong>Course:</strong> ${assignment.course}</p>

            <p>
                <strong>Due:</strong>
                ${assignment.dueDate ? assignment.dueDate : "Not Set"}
            </p>

            <div class="assignment-actions">

                <button class="complete-btn">
                    ${assignment.completed ? "Undo" : "Complete"}
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>
        `;

    const completeBtn = li.querySelector(".complete-btn");

    const deleteBtn = li.querySelector(".delete-btn");

    completeBtn.addEventListener("click", function () {
      toggleComplete(assignment.id);
    });

    deleteBtn.addEventListener("click", function () {
      deleteAssignment(assignment.id);
    });

    assignmentList.appendChild(li);
  });

  // Statistics

  totalCount.textContent = assignments.length;

  pendingCount.textContent = assignments.filter(function (assignment) {
    return !assignment.completed;
  }).length;

  completedCount.textContent = assignments.filter(function (assignment) {
    return assignment.completed;
  }).length;

  const rate =
    assignments.length === 0
      ? 0
      : Math.round(
          (assignments.filter(function (assignment) {
            return assignment.completed;
          }).length /
            assignments.length) *
            100,
        );

  completionRate.textContent = rate + "%";
}

// Add Assignment

function addAssignment(title, course, priority, dueDate) {
  const assignment = {
    id: Date.now().toString(),

    title: title,

    course: course,

    priority: priority,

    dueDate: dueDate,

    completed: false,
  };

  assignments.unshift(assignment);

  saveAssignments();

  assignmentInput.value = "";
  courseInput.value = "";
  dueDateInput.value = "";
  priorityInput.value = "High";

  render();
}

// Delete Assignment

function deleteAssignment(id) {
  assignments = assignments.filter(function (assignment) {
    return assignment.id !== id;
  });

  saveAssignments();

  render();
}

// Toggle Complete

function toggleComplete(id) {
  const assignment = assignments.find(function (assignment) {
    return assignment.id === id;
  });

  if (!assignment) return;

  assignment.completed = !assignment.completed;

  saveAssignments();

  render();
}

// Form Submission

assignmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = assignmentInput.value.trim();

  const course = courseInput.value.trim();

  const priority = priorityInput.value;

  const dueDate = dueDateInput.value;

  if (title === "" || course === "") {
    return;
  }

  addAssignment(title, course, priority, dueDate);
});

// Filters

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    render();
  });
});

// localStorage

function saveAssignments() {
  localStorage.setItem("studytrackAssignments", JSON.stringify(assignments));
}

function loadAssignments() {
  const storedAssignments = localStorage.getItem("studytrackAssignments");

  if (storedAssignments) {
    assignments = JSON.parse(storedAssignments);
  }
}

// App Initialization

loadAssignments();

render();
