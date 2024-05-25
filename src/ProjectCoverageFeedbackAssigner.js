export class ProjectCoverageFeedbackAssigner {
    feedbackMessage = "";
    points = 0;

    constructor(percentageOfCoverage) {
        this.assignFeedbackMessage(percentageOfCoverage);
        this.assignPoints(percentageOfCoverage);
    }

    assignFeedbackMessage(percentageOfCoverage) {
        switch (true) {
            case percentageOfCoverage === null:
                this.feedbackMessage = "This project has no commits yet.";
                break;
            case percentageOfCoverage < 70:
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
        this.points = 0;
    }

    getPoints() {
        return this.points;
    }
}
