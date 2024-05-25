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
            case percentageOfCoverage >= 70 && percentageOfCoverage <= 79:
                this.feedbackMessage = "Regular";
                break;
            case percentageOfCoverage >= 80 && percentageOfCoverage <= 90:
                this.feedbackMessage = "Good";
                break;
            case percentageOfCoverage >= 91 && percentageOfCoverage <= 100:
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
            case percentageOfCoverage >= 70 && percentageOfCoverage <= 79:
                this.points = 12;
                break;
            case percentageOfCoverage >= 80 && percentageOfCoverage <= 90:
                this.points = 16;
                break;
            case percentageOfCoverage >= 91 && percentageOfCoverage <= 100:
                this.points = 20;
                break;
        }
    }

    getPoints() {
        return this.points;
    }
}
