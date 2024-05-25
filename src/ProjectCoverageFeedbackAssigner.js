import { TestCoverageEvaluationCriteria } from "./TestCoverageEvaluationCriteria";
export class ProjectCoverageFeedbackAssigner {
    feedbackMessage = "";
    points = 0;

    constructor(percentageOfCoverage) {
        this.evaluationCriteria = new TestCoverageEvaluationCriteria();
        this.assignFeedbackMessage(percentageOfCoverage);
        this.assignPoints(percentageOfCoverage);
    }

    assignFeedbackMessage(percentageOfCoverage) {
        switch (true) {
            case percentageOfCoverage === null:
                this.feedbackMessage = "This project has no commits yet.";
                break;
            case this.evaluationCriteria.isDeficient(percentageOfCoverage):
                this.feedbackMessage = "Deficient";
                break;
            case this.evaluationCriteria.isRegular(percentageOfCoverage):
                this.feedbackMessage = "Regular";
                break;
            case this.evaluationCriteria.isGood(percentageOfCoverage):
                this.feedbackMessage = "Good";
                break;
            case this.evaluationCriteria.isExcellent(percentageOfCoverage):
                this.feedbackMessage = "Excellent";
                break;
        }
    }

    getFeedbackMessage() {
        return this.feedbackMessage;
    }

    assignPoints(percentageOfCoverage) {
        switch (true) {
            case percentageOfCoverage === null:
                this.points = 0;
                break;
            case this.evaluationCriteria.isDeficient(percentageOfCoverage):
                this.points = 8;
                break;
            case this.evaluationCriteria.isRegular(percentageOfCoverage):
                this.points = 12;
                break;
            case this.evaluationCriteria.isGood(percentageOfCoverage):
                this.points = 16;
                break;
            case this.evaluationCriteria.isExcellent(percentageOfCoverage):
                this.points = 20;
                break;
        }
    }

    getPoints() {
        return this.points;
    }
}
