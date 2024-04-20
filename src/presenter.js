import {Project, ProjectsList } from "./project.js";

const projectName = document.querySelector("#project-name");
const form = document.querySelector("#add-project-form");
const tableBody = document.querySelector("#result-tb")

let projectslist = new ProjectsList();

document.addEventListener("DOMContentLoaded", function() {
  function deleteProject(index) {
    projectslist.projects.splice(index, 1);
    renderTable();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let project = new Project(projectName.value);
    projectslist.projects.push(project);
    renderTable();
  });

  function renderTable() {
    tableBody.innerHTML = "";
    projectslist.projects.forEach((project, index) => {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteProject(index));

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index}</td>
        <td>${project.name}</td>
      `;
      const cell = document.createElement("td");
      cell.appendChild(deleteButton);
      row.appendChild(cell);

      tableBody.appendChild(row);
    });
  }
});