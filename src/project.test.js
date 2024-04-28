import {Project, ProjectsList} from "./project.js";

describe("Add project", () => {
  let project = new Project("Saludador");
  it("should save 'Saludador' as the name of the project", () => {
    expect(project.getProjectName()).toEqual("Saludador");
  });
});

describe("Add projects", () => {
  let projectslist = new ProjectsList();
  projectslist.addProject("Saludador");
  projectslist.addProject("Totalizador");
  it("should save 2 projects with names 'Saludador' and 'Totalizador'", () => {
    const projectNames = projectslist.getProjectList().map(project => project.getProjectName());
    expect(projectNames).toEqual(["Saludador", "Totalizador"]);
  });
});

describe("Delete one project", () => {
  let projectslist = new ProjectsList();
  projectslist.addProject("Saludador");
  projectslist.addProject("Totalizador");
  projectslist.projects.pop(); 
  it("should delete the last project 'Totalizador'", () => {
    const projectNames = projectslist.getProjectList().map(project => project.getProjectName());
    expect(projectNames).toEqual(["Saludador"]);
  });
});

describe("Delete any project", () => {
  let projectslist = new ProjectsList();
  projectslist.addProject("Saludador");
  projectslist.addProject("Totalizador");
  projectslist.addProject("Calculador");
  projectslist.deleteProject(0); 
  it("should delete the first project 'Saludador'", () => {
    const projectNames = projectslist.getProjectList().map(project => project.getProjectName());
    expect(projectNames).toEqual(["Totalizador", "Calculador"]);
  });
});

describe("Add commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method");
  it("should save a commit with the description 'Added the greet method'", () => {
    expect(project.commitList[0].getCommitDescription()).toEqual("Added the greet method");
  });
});

describe("Add modified lines per commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method", 10);

  it("should save 1 commit with description 'Added the greet method' and 10 modified lines", () => {
    const commit = project.commitList[0]; 
    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines()).toEqual(10);
  });
});

describe("Add added tests per commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method", 10, 2);

  it("should save 1 commit with description 'Added the greet method', 10 modified lines, and 2 added tests", () => {
    const commit = project.commitList[0]; 
    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines()).toEqual(10);
    expect(commit.getAddedTests()).toEqual(2);
  });
});

describe("Add percentage of coverage per commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method", 10, 2, 100);

  it("should save 1 commit with description 'Added the greet method', 10 modified lines, and 2 added tests, 100 percentage of coverage", () => {
    const commit = project.commitList[0];
    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines()).toEqual(10);
    expect(commit.getAddedTests()).toEqual(2);
    expect(commit.getPercentageOfCoverage().getValue()).toEqual(100);
  });
});