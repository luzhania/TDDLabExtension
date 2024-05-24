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