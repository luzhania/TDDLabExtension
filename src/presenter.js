import {Project, ProjectsList } from "./project.js";

const projectName = document.querySelector("#project-name");
const form = document.querySelector("#add-project-form");
const tableBody = document.querySelector("#result-tb")

let projectslist = new ProjectsList();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let project = new Project(projectName.value);
  projectslist.projects.push(project);
  
  renderTable();
});

function renderTable() {
  tableBody.innerHTML = "";
  projectslist.projects.forEach((project, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index}</td>
      <td>${project.name}</td>
    `;
    const cell = document.createElement("td");
    row.appendChild(cell);
    tableBody.appendChild(row);
  });
}