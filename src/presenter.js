import {Project, ProjectsList } from "./project.js";

const projectName = document.querySelector("#project-name");
const form = document.querySelector("#add-project-form");
const div = document.querySelector("#result-div");

let projectslist = new ProjectsList();

form.addEventListener("submit", (event) => {
  event.preventDefault();


  let project = new Project(projectName.value);
  projectslist.projects.push(project);
  div.innerHTML = "";
  for(let pros = 0;pros<= projectslist.projects.length; pros++){
    div.innerHTML += "<p>" + projectslist.projects[pros].name + "</p>";
  }
});
