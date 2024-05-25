export class ProjectCoverageFeedbackAssigner {
    feedbackMessage = "";

    constructor(percentageOfCoverage) {
        this.assignFeedbackMessage(percentageOfCoverage);
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
        }
    }

    getFeedbackMessage() {
        return this.feedbackMessage;
    }
}
