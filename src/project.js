export class Project {
  name = "";
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
  percentageOfCoverage = null;

  constructor(commitDescription, modifiedLines, addedTests, percentageOfCoverage) {
    this.commitDescription = commitDescription;
    this.modifiedLines = modifiedLines;
    this.addedTests = addedTests;
    this.percentageOfCoverage = new PercentageOfCoverageMetric(percentageOfCoverage);
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

export class PercentageOfCoverageMetric {
  value = 0;
  points = 0;
  feedbackMessage = "";

  constructor(value) {
    this.value = value;
    this.assignPoints();
    this.assignFeedbackMessage();
  }

  getValue() {
    return this.value;
  }

  getFeedbackMessage() {
    return this.feedbackMessage;
  }

  getPoints() {
    return this.points;
  }

  isRelativelyGood() {
    return this.value >= 60 && this.value < 90;
  }

  isCorrect() {
    return this.value >= 90;
  }

  assignPoints() {
    switch (true) {
      case this.isCorrect():
        this.points = 100;
        break;
      case this.isRelativelyGood():
        this.points = 70;
        break;
      default:
        this.points = 10;
        break;
    }
  }
  assignFeedbackMessage() {
    this.feedbackMessage = `❌ Cobertura de código: ¡Solo el ${this.value}% del código está cubierto por pruebas! Es fundamental mejorar drásticamente la cobertura de pruebas para garantizar la calidad y fiabilidad del código. Dedica más tiempo a escribir pruebas exhaustivas antes de escribir el código de producción. ¡Vamos, puedes lograr una cobertura mucho más alta en el siguiente commit!`
  }
}