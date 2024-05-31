import { ModifiedLinesEvaluationCriteria } from "./ModifiedLinesEvaluationCriteria";
export class ModifiedLinesMetric {
    value = 0;
    points = 0;
    feedbackMessage = "";
  
    constructor(value) {
      this.value = value;
      this.ModifiedLinesEvaluationCriteria = new ModifiedLinesEvaluationCriteria();
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

    assignPoints() {
      switch (true) {
        case this.ModifiedLinesEvaluationCriteria.isThereNone(this.value):
          this.points = 0;
          break;
        case this.ModifiedLinesEvaluationCriteria.isDeficient(this.value):
          this.points = 8;
          break;
        case this.ModifiedLinesEvaluationCriteria.isRegular(this.value):
           this.points = 12;
           break;
        case this.ModifiedLinesEvaluationCriteria.isGood(this.value):
           this.points = 16;
           break;
        case this.ModifiedLinesEvaluationCriteria.isExcelent(this.value):
          this.points = 20;
          break;
      }
    }
    assignFeedbackMessage() {
      switch (true) {
        case this.ModifiedLinesEvaluationCriteria.isThereNone(this.value):
          this.feedbackMessage = `❌ Líneas de código modificadas: ${this.value}. Debes hacer los cambios necesarios para el ciclo TDD en tu código antes de hacer un commit. No te desanimes. ¡Aplica lo aprendido en la siguiente!`
          break;
        case this.ModifiedLinesEvaluationCriteria.isDeficient(this.value):
          this.feedbackMessage = `❌ Líneas de código modificadas: ${this.value}. DEFICIENTE. Demasiadas líneas de código añadidas. Debes hacer solo los cambios necesarios en cada ciclo de TDD. ¡Vamos, puedes hacerlo mejor y tendrás más puntos!`
          break;
        case this.ModifiedLinesEvaluationCriteria.isRegular(this.value):
          this.feedbackMessage = `🤔 Líneas de código modificadas: ${this.value}. REGULAR. Muchas líneas de código modificadas para ser un ciclo TDD, debes reducir los cambios que realizas al código en cada ciclo ¡Lo harás mejor en el siguiente commit!`
          break;
        case this.ModifiedLinesEvaluationCriteria.isGood(this.value):
          this.feedbackMessage = `✔ Líneas de código modificadas: ${this.value}. BUENO. El código sufrió pocos cambios. ¡Buen trabajo! ¡Sigue así!`
          break;
          case this.ModifiedLinesEvaluationCriteria.isExcelent(this.value):
          this.feedbackMessage = `✔  Líneas de código modificadas: ${this.value}. EXCELENTE. El código sufrió cambios mínimos. ¡Sigue con el buen trabajo!`
          break;
      }
    }
  }