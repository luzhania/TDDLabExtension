import { Project, ProjectsList, Commit } from "./project.js";

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

const tableFeedbackProject = document.querySelector("#feedback-project-tb");

const projectsList = new ProjectsList();

addProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const projectName = projectNameInput.value.trim();
  projectsList.addProject(projectName);
  renderProjectsTable();
  updateCommitProjectSelect();
});

addCommitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const projectIndex = commitProjectSelect.value;
  const commitMessage = commitMessageInput.value.trim();
  const commitModifiedLines = modifiedLinesInput.value;
  const commitAddedTests = addedTestsInput.value;
  const commitPercentageOfCoverage = percentageOfCoverageInput.value;
  projectsList.projects[projectIndex].addCommit(commitMessage, commitModifiedLines, commitAddedTests, commitPercentageOfCoverage);
  renderCommitsTable(projectIndex);
  renderFeedbackTable(projectIndex);
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

function renderCommitsTable(projectIndex) {
  tableCommitsBody.innerHTML = "";
  const project = projectsList.projects[projectIndex];

  project.commitList.forEach((commit, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${commit.getCommitDescription()}</td>
      <td>${commit.getModifiedLines().getValue()}</td>
      <td>${commit.getAddedTests()}</td>
      <td>${commit.getPercentageOfCoverage().getValue()}</td>
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
      <td>Nothing for now</td>
      <td>${commit.getPercentageOfCoverage().getFeedbackMessage() + "<br><br>" + commit.getModifiedLines().getFeedbackMessage()}</td>
    `;
    /*<td>${commit.getTestAdded().getPoints()}</td>
    <td>${commit.getTestAdded().getFeedbackMessage()}</td>
    */
    tableFeedbackProject.appendChild(row);
  });
}