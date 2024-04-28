export class Project {
  name= "";
  commitList = [];
  
  constructor(name) {
    this.name = name;
  }

  getProjectName() {
    return this.name;
  }

  addCommit(commitDescription, modifiedLines) {
    const commit = new Commit(commitDescription, modifiedLines);
    this.commitList.push(commit);
  }
}

export class ProjectsList {
  constructor() {
    this.projects = [];
  }

  getProjectList() {
    return this.projects;
  }

  addProject(projectName) {
    const project = new Project(projectName);
    this.projects.push(project);
  }

  deleteProject(index) {
    this.projects.splice(index, 1);
  }
}

export class Commit {
  commitDescription = "";
  modifiedLines = 0;

  constructor(commitDescription, modifiedLines) {
    this.commitDescription = commitDescription;
    this.modifiedLines = modifiedLines;
  }

  getCommitDescription() {
    return this.commitDescription;
  }

  getModifiedLines() {
    return this.modifiedLines;
  }
}
