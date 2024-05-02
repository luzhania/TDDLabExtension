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
    let linesValue = new ModifiedLinesMetric(modifiedLines);
    this.modifiedLines = linesValue;
    this.addedTests = new AddedTestMetric(addedTests, commitDescription)
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
    switch (true) {
      case this.isCorrect():
        this.feedbackMessage = `✔ Cobertura de código: ¡${this.value}% del código está cubierto por las pruebas! Continúa aplicando este enfoque riguroso para escribir pruebas antes de escribir el código de producción.`
        break;
      case this.isRelativelyGood():
        this.feedbackMessage = `🤔 Cobertura de código: ${this.value}% del código está cubierto por pruebas. Aunque la cobertura de pruebas es relativamente buena, aún hay espacio para mejorar. Recuerda que al aplicar TDD es importante obtener un porcentaje de cobertura más alto. Escribe más pruebas para cubrir todas las funcionalidades y casos de uso de tu código. ¡Ánimo! ¡Tendrás una mayor cobertura en el siguiente commit!`
        break;
      default:
        this.feedbackMessage = `❌ Cobertura de código: ¡Solo el ${this.value}% del código está cubierto por pruebas! Es fundamental mejorar drásticamente la cobertura de pruebas para garantizar la calidad y fiabilidad del código. Dedica más tiempo a escribir pruebas exhaustivas antes de escribir el código de producción. ¡Vamos, puedes lograr una cobertura mucho más alta en el siguiente commit!`
        break;
    }
  }
}

export class ModifiedLinesMetric {
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

  getPoints() {
    return this.points;
  }

  getFeedbackMessage() {
    return this.feedbackMessage;
  }

  isIncorrect() {
    return this.value == 0;
  }

  isCorrect() {
    return this.value > 0 && this.value <= 35;
  }

  isRelativelyGood() {
    return this.value > 35 && this.value <= 50;
  }

  assignPoints() {
    switch (true) {
      case this.isIncorrect():
        this.points = 0;
        break;
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
    switch (true) {
      case this.isIncorrect():
        this.feedbackMessage = `❌ Líneas de código modificadas: ${this.value}. Debes hacer los cambios necesarios para el ciclo TDD en tu código antes de hacer un commit. No te desanimes. ¡Aplica lo aprendido en la siguiente!`
        break;
      case this.isCorrect():
        this.feedbackMessage = `✔ Líneas de código modificadas: ${this.value}. El código sufrió pocos cambios. ¡Buen trabajo! ¡Sigue así!`
        break;
      case this.isRelativelyGood():
        this.feedbackMessage = `🤔 Líneas de código modificadas: ${this.value}. Muchas líneas de código modificadas para ser un ciclo TDD, debes reducir los cambios que realizas al código en cada ciclo ¡Lo harás mejor en el siguiente commit!`
        break;
      default:
        this.feedbackMessage = `❌ Líneas de código modificadas: ${this.value}. Demasiadas líneas de código añadidas. Debes hacer solo los cambios necesarios en cada ciclo de TDD. ¡Vamos, puedes hacerlo mejor y tendrás más puntos!`
        break;
    }
  }
}

export class AddedTestMetric {
  value = 0
  message = ''
  constructor(value, message) {
    this.value = value;
    this.message = message;
  }
  getPoints(){
    if(this.message.trim().split(' ')[0] === 'refact:' && this.value === 1) return 0;
    return 100;
  }
}