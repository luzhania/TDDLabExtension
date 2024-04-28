export class Project {
  name= "";
  commitList = [];
  
  constructor(name) {
    this.name = name;
  }

  getProjectName() {
    return this.name;
  }

  addCommit(commitDescription) {
    const commit = new Commit(commitDescription);
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

  constructor(commitDescription) {
    this.commitDescription = commitDescription;
  }

  getCommitDescription() {
    return this.commitDescription;
  }
}
