import { Project, ProjectsList, Commit } from "./project.js";

const projectNameInput = document.querySelector("#project-name");
const addProjectForm = document.querySelector("#add-project-form");
const tableProjectsBody = document.querySelector("#result-tb");
const commitProjectSelect = document.querySelector("#commit-project");
const commitMessageInput = document.querySelector("#commit-message");
const addCommitForm = document.querySelector("#add-commit-form");
const tableCommitsBody = document.querySelector("#result-tb-commit");

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
  projectsList.projects[projectIndex].addCommit(commitMessage);
  renderCommitsTable(projectIndex);
});

commitProjectSelect.addEventListener("change", () => {
  const projectIndex = commitProjectSelect.value;
  renderCommitsTable(projectIndex);
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
    `;
    tableCommitsBody.appendChild(row);
  });
}