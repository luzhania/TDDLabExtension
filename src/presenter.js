import { Project, ProjectsList } from "./project.js";

const projectNameInput = document.querySelector("#project-name");
const form = document.querySelector("#add-project-form");
const tableBody = document.querySelector("#result-tb");

const projectsList = new ProjectsList();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const projectName = projectNameInput.value.trim();
  projectsList.addProject(projectName);
  renderTable();
});

function renderTable() {
  tableBody.innerHTML = "";

  projectsList.projects.forEach((project, index) => {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      projectsList.deleteProject(index);
      renderTable();
    });

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${project.name}</td>
    `;

    const cell = document.createElement("td");
    cell.appendChild(deleteButton);
    row.appendChild(cell);

    tableBody.appendChild(row);
  });
}