import { ProjectsList } from "./projectList";

const projectNameInput = document.querySelector("#project-name");
const addProjectForm = document.querySelector("#add-project-form");
const tableProjectsBody = document.querySelector("#result-tb");
const commitProjectSelect = document.querySelector("#commit-project");
const commitMessageInput = document.querySelector("#commit-message"); //test criteria
const addCommitForm = document.querySelector("#add-commit-form");
const tableCommitsBody = document.querySelector("#result-tb-commit");
const modifiedLinesInput = document.querySelector("#modified-lines");
const addedTestsInput = document.querySelector("#added-tests"); //test criteria
const percentageOfCoverageInput = document.querySelector("#percentage-coverage");
const overallScore = document.querySelector("#overAll-score");
const dateInput = document.querySelector("#date");
const timeInput = document.querySelector("#time");

const tableFeedbackProject = document.querySelector("#feedback-project-tb");
const projectFeedback = document.querySelector("#project-feedback");

const projectsList = new ProjectsList();

addProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const projectName = projectNameInput.value.trim();
  projectsList.addProject(projectName);
  renderProjectsTable();
  updateCommitProjectSelect();
  const projectIndex = commitProjectSelect.value;
  updateProjectFeedback(projectIndex);
});

function getFormData(){
  return {
    projectIndex: commitProjectSelect.value,
    commitMessage: commitMessageInput.value.trim(),
    commitModifiedLines: modifiedLinesInput.value,
    commitAddedTests: addedTestsInput.value,
    commitPercentageOfCoverage: percentageOfCoverageInput.value,
    dateValue: dateInput.value,
    timeValue: timeInput.value,
  };
}

function extractDate(dateValue) {
  const dateParts = dateValue.split('-');
  return {
    year: parseInt(dateParts[0]),
    month: parseInt(dateParts[1]),
    day: parseInt(dateParts[2]),
  };
}

function extractTime(timeValue) {
  const timeParts = timeValue.split(':');
  return {
    hours: parseInt(timeParts[0]),
    minutes: parseInt(timeParts[1]),
  };
}

addCommitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const { projectIndex, commitMessage, commitModifiedLines, commitAddedTests, commitPercentageOfCoverage, dateValue, timeValue } = getFormData();
  const { year, month, day } = extractDate(dateValue);
  const { hours, minutes } = extractTime(timeValue);
  
  projectsList.projects[projectIndex].addCommit(commitMessage, commitModifiedLines, commitAddedTests, commitPercentageOfCoverage, day, month, year, hours, minutes);
  renderCommitsTable(projectIndex);
  renderFeedbackTable(projectIndex);
  renderProjectsTable();
  updadateOverallScore();
  updateProjectFeedback(projectIndex);
});

commitProjectSelect.addEventListener("change", () => {
  const projectIndex = commitProjectSelect.value;
  renderCommitsTable(projectIndex);
  renderFeedbackTable(projectIndex);
  updateProjectFeedback(projectIndex);
});

function renderProjectsTable() {
  tableProjectsBody.innerHTML = "";

  projectsList.projects.forEach((project, index) => {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      projectsList.deleteProject(index);
      renderProjectsTable();
      updateCommitProjectSelect();
    });

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${project.name}</td>
      <td>${project.getTotalPointsPerProject()}</td>
      <td><button class="delete-project-btn">Delete</button></td>
    `;
    row.querySelector(".delete-project-btn").addEventListener("click", () => {
      projectsList.deleteProject(index);
      renderProjectsTable();
      updateCommitProjectSelect();
    });

    tableProjectsBody.appendChild(row);
  });

  updateCommitProjectSelect();
}

function updateCommitProjectSelect() {
  commitProjectSelect.innerHTML = "";
  projectsList.getProjectList().forEach((project, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = project.name;
    commitProjectSelect.appendChild(option);
  });
}

function updadateOverallScore() {
  overallScore.innerHTML = "OverAll Score: " + projectsList.getTotalPoints();
}

function renderCommitsTable(projectIndex) {
  tableCommitsBody.innerHTML = "";
  const project = projectsList.projects[projectIndex];

  project.commitList.forEach((commit, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${commit.getCommitDescription()}</td>
      <td>${commit.getModifiedLines().getValue()}</td>
      <td>${commit.getAddedTests().getValue()}</td>
      <td>${commit.getPercentageOfCoverage().getValue()}</td>
      <td>${commit.getTotalPoints()}</td>
      <td>${commit.getCommitStringDate()}</td>
      <td>${commit.getCommitTimeString()}</td>
    `;
    tableCommitsBody.appendChild(row);
  });
}

function renderFeedbackTable(projectIndex) {
  tableFeedbackProject.innerHTML = "";
  const project = projectsList.projects[projectIndex];
  project.commitList.forEach((commit, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${commit.getCommitDescription()}</td>
      <td>${commit.getPercentageOfCoverage().getPoints()}</td>
      <td>${commit.getModifiedLines().getPoints()}</td>
      <td>${commit.getAddedTests().getPoints()}</td>
      <td>${commit.getPercentageOfCoverage().getFeedbackMessage()}<br><br>${commit.getModifiedLines().getFeedbackMessage()}<br><br>${commit.getAddedTests().getFeedbackMessage()}</td>
    `;
    /*
    <td></td>
    */
    tableFeedbackProject.appendChild(row);
  });
}

function updateProjectFeedback(projectIndex) {
  const project = projectsList.projects[projectIndex];
  projectFeedback.innerHTML = "<p> Percentage of test coverage: "+project.getTestCoverage().getFeedbackMessage()+"</p>";
}