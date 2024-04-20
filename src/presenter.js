import Project from "./project.js";

const projectName = document.querySelector("#project-name");
const form = document.querySelector("#add-project-form");
const div = document.querySelector("#result-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let project = new Project(projectName.value);
  console.log(project.name);
  div.innerHTML = "<p>" + project.name + "</p>";
  
});
