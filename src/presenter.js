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

const tableFeedbackProject = document.querySelector("#feedback-project-tb");

const projectsList = new ProjectsList();

addProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const projectName = projectNameInput.value.trim();
  projectsList.addProject(projectName);
  renderProjectsTable();
  updateCommitProjectSelect();
});

function getFormData(){
  return {
    projectIndex: commitProjectSelect.value,
    commitMessage: commitMessageInput.value.trim(),
    commitModifiedLines: modifiedLinesInput.value,
    commitAddedTests: addedTestsInput.value,
    commitPercentageOfCoverage: percentageOfCoverageInput.value,
    dateValue: dateInput.value,
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

addCommitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const { projectIndex, commitMessage, commitModifiedLines, commitAddedTests, commitPercentageOfCoverage, dateValue } = getFormData();
  const { year, month, day } = extractDate(dateValue);
  
  projectsList.projects[projectIndex].addCommit(commitMessage, commitModifiedLines, commitAddedTests, commitPercentageOfCoverage, day, month, year);
  renderCommitsTable(projectIndex);
  renderFeedbackTable(projectIndex);
  renderProjectsTable();
  updadateOverallScore();
});

commitProjectSelect.addEventListener("change", () => {
  const projectIndex = commitProjectSelect.value;
  renderCommitsTable(projectIndex);
  renderFeedbackTable(projectIndex);
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