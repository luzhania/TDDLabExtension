import { TestCoverageEvaluationCriteria } from "./TestCoverageEvaluationCriteria";
export class TestCoverageCommitMetric {
    value = 0;
    points = 0;
    feedbackMessage = "";
  
    constructor(value) {
      this.value = value;
      this.evaluationCriteria = new TestCoverageEvaluationCriteria();
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
        case this.evaluationCriteria.isExcellent(this.value):
          this.feedbackMessage = `👏 Cobertura de código: ¡${this.value}% del código está cubierto por las pruebas! Continúa aplicando este enfoque riguroso para escribir pruebas antes de escribir el código de producción`
          break;
        case this.evaluationCriteria.isGood(this.value):
          this.feedbackMessage = `✔ Cobertura de código: ¡${this.value}% del código está cubierto por las pruebas! Continúa manteniendo este nivel de rigurosidad y busca oportunidades para mejorar aún más. ¡Sigue así y alcanzarás una cobertura aún mayor!`
          break;
        case this.evaluationCriteria.isRegular(this.value):
          this.feedbackMessage = `🤔 Cobertura de código: ${this.value}% del código está cubierto por pruebas. Aunque la cobertura de pruebas es relativamente buena, aún hay espacio para mejorar. Recuerda que al aplicar TDD es importante obtener un porcentaje de cobertura más alto. Escribe más pruebas para cubrir todas las funcionalidades y casos de uso de tu código. Con un poco más de esfuerzo, podrás alcanzar una cobertura más alta.`
          break;
        case this.evaluationCriteria.isDeficient(this.value):
          this.feedbackMessage = `❌ Cobertura de código: ¡Solo el ${this.value}% del código está cubierto por pruebas! Es fundamental mejorar drásticamente la cobertura de pruebas para garantizar la calidad y fiabilidad del código. Dedica más tiempo a escribir pruebas exhaustivas antes de escribir el código de producción. ¡Vamos, puedes lograr una cobertura mucho más alta en el siguiente commit!`
          break;
      }
    }
  }