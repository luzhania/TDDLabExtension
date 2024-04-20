import {Project, ProjectsList } from "./project.js";

const projectName = document.querySelector("#project-name");
const form = document.querySelector("#add-project-form");
const tableBody = document.querySelector("#result-tb")

let projectslist = new ProjectsList();

form.addEventListener("submit", (event) => {
  event.preventDefault();


  let project = new Project(projectName.value);
  projectslist.projects.push(project);
  tableBody.innerHTML = ""
  for(let pros = 0;pros<= projectslist.projects.length; pros++){
    tableBody.innerHTML += "<tr> <td>" + projectslist.projects[pros].name + "</td> </tr>";
  }
});
