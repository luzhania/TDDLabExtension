export class Project {
  name= "";
  commitList = [];
  
  constructor(name) {
    this.name = name;
  }

  getProjectName() {
    return this.name;
  }

  addCommit(commitDescription, modifiedLines, addedTests, percentageOfCoverage) {
    const commit = new Commit(commitDescription, modifiedLines, addedTests, percentageOfCoverage);
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
  addedTests = 0;
  percentageOfCoverage = 0;

  constructor(commitDescription, modifiedLines, addedTests, percentageOfCoverage) {
    this.commitDescription = commitDescription;
    this.modifiedLines = modifiedLines;
    this.addedTests = addedTests;
    this.percentageOfCoverage = percentageOfCoverage;
  }

  getCommitDescription() {
    return this.commitDescription;
  }

  getModifiedLines() {
    return this.modifiedLines;
  }

  getAddedTests() {
    return this.addedTests;
  }

  getPercentageOfCoverage() {
    return this.percentageOfCoverage;
  }
}
