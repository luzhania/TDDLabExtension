export class AddedTestMetric {
    amountTest = 0
    message = ''
    points = 0
    feedbackMessage = ''
    constructor(amountTest, message) {
      this.amountTest = amountTest;
      this.message = message;
      this.points = this.assignPoints();
      this.feedbackMessage = this.assignFeedbackMessage();
    }
    getPoints(){
      return this.points;
    }
    getValue(){
      return this.amountTest;
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
      return !this.isRefactCommit() && this.amountTest > 1;
    }
    getFeedbackMessage(){
      return this.feedbackMessage;
    }
    assignFeedbackMessage(){
      switch(true){
        case this.areTestAddedInRefactoring():
          return `❌ Cantidad de pruebas añadidas: ${this.amountTest} prueba/s nueva/s. ⚠️ Recuerda, no se añaden pruebas cuando el código solo es modificado para 'refactoring'`;
        case this.noTestAddedInNoRefactoring():
          return "❌ Cantidad de pruebas añadidas: 0 pruebas nuevas. 😨 Para escribir código con TDD no olvides hacer primero las pruebas!!!";
        case this.testAddedInNoRefactoring():
          return "✔ Cantidad de pruebas añadidas: 1 prueba nueva. ☑️Excelente! No olvides que las pruebas son el alma del TDD 😎";
        case this.areMuchTestsInNoRefactoring(): 
          return `✔ Cantidad de pruebas añadidas: ${this.amountTest} pruebas nuevas. 🤔 No hace falta añadir tantas pruebas en un solo ciclo de TDD`;
        default:
          return "✔ Cantidad de pruebas añadidas: 0 pruebas nuevas. ☑️Buen trabajo, no se añaden pruebas cuando el código solo es modificado para 'refactoring' 👍";
      }
    }
    areTestAddedInRefactoring(){
      return this.isRefactCommit() && this.amountTest > 0;
    }
    noTestAddedInNoRefactoring(){
      return !this.isRefactCommit() && this.amountTest == 0;
    }
    testAddedInNoRefactoring(){
      return !this.isRefactCommit() && this.amountTest == 1;
    }
  }