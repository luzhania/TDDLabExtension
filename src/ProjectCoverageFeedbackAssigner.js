export class ProjectCoverageFeedbackAssigner {
    feedbackMessage = "";

    constructor(percentageOfCoverage) {
        this.assignFeedbackMessage(percentageOfCoverage);
    }

    assignFeedbackMessage(percentageOfCoverage) {
        this.feedbackMessage = "This project has no commits yet.";
    }

    getFeedbackMessage() {
        return this.feedbackMessage;
    }
}