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

function render() {
  assignmentList.innerHTML = "";

  if (assignments.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
}
render();
