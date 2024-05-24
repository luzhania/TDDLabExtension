import { Commit } from "./commit.js";

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

  getTotalPointsPerProject() {
    return this.commitList.reduce((acc, commit) => acc + commit.getTotalPoints(), 0);
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
  points = 0
  feedbackMessage = ''
  constructor(value, message) {
    this.value = value;
    this.message = message;
    this.points = this.assignPoints();
    this.feedbackMessage = this.assignFeedbackMessage();
  }
  getPoints(){
    return this.points;
  }
  getValue(){
    return this.value;
  }
  assignPoints(){
    switch(true){
      case this.isIncorrect(): return 0;
      case this.areMuchTestsInNoRefactoring(): return 10;
      default: return 100;
    }
  }
  isRefactCommit(){
    const refactor = 'refact:';
    return this.getFirstWordCommit() == refactor ? true : false;
  }
  getFirstWordCommit(){
    const index = 0;
    return this.message.trim().split(' ')[index];
  }
  isIncorrect(){
    return this.areTestAddedInRefactoring() || this.noTestAddedInNoRefactoring();
  }
  areMuchTestsInNoRefactoring(){
    return !this.isRefactCommit() && this.value > 1;
  }
  getFeedbackMessage(){
    return this.feedbackMessage;
  }
  assignFeedbackMessage(){
    switch(true){
      case this.areTestAddedInRefactoring():
        return "❌Recuerda, no se añaden pruebas cuando el código solo es modificado para 'refactoring'⚠️";
      case this.noTestAddedInNoRefactoring():
        return "❌Para escribir código con TDD no olvides hacer primero las pruebas!!!😨";
      case this.testAddedInNoRefactoring():
        return "☑️Excelente! No olvides que las pruebas son el alma del TDD 😎";
      case this.areMuchTestsInNoRefactoring(): 
        return "🤦‍♂️No hace falta añadir tantas pruebas en un solo ciclo de TDD";
      default:
        return "☑️Buen trabajo, no se añaden pruebas cuando el código solo es modificado para 'refactoring' 👍";
    }
  }
  areTestAddedInRefactoring(){
    return this.isRefactCommit() && this.value > 0;
  }
  noTestAddedInNoRefactoring(){
    return !this.isRefactCommit() && this.value == 0;
  }
  testAddedInNoRefactoring(){
    return !this.isRefactCommit() && this.value == 1;
  }
}