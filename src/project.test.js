import {Project, ProjectsList} from "./project.js";

describe("Add project", () => {
  let project = new Project("Saludador");
  it("save 'Saludador' as the name of the project", () => {
    expect(project.name).toEqual("Saludador");
  });
});

describe("Add projects", () => {
  let project1 = new Project("Saludador");
  let project2 = new Project("Totalizador");
  let projectslist = new ProjectsList();
  projectslist.projects.push(project1);
  projectslist.projects.push(project2);
  it("save 2 projects 'Saludador, Totalizador'", () => {
    expect(projectslist.projects).toEqual([{"name": "Saludador"}, {"name": "Totalizador"}]);
  });
});

describe("Delete one project", () => {
  let project1 = new Project("Saludador");
  let project2 = new Project("Totalizador");
  let projectslist = new ProjectsList();
  projectslist.projects.push(project1);
  projectslist.projects.push(project2);
  projectslist.projects.pop(0);
  it("delete the last project 'Saludador'", () => {
    expect(projectslist.projects).toEqual([{"name": "Saludador"}]);
  });
});

describe("Delete any project", () => {
  let project1 = new Project("Saludador");
  let project2 = new Project("Totalizador");
  let project3 = new Project("Calculador");
  let projectslist = new ProjectsList();
  projectslist.projects.push(project1);
  projectslist.projects.push(project2);
  projectslist.projects.push(project3);
  projectslist.projects.splice(0, 1);
  it("delete the last project 'Totalizador'", () => {
    expect(projectslist.projects).toEqual([{"name": "Totalizador"}, {"name": "Calculador"}]);
  });
});
