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

// Application State

let assignments = [];

let currentFilter = "all";

console.log(assignments);
console.log(currentFilter);
console.log("Script is connected!");
