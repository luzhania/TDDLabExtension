export class ProjectCoverageFeedbackAssigner {
    feedbackMessage = "";

    constructor(percentageOfCoverage) {
        this.assignFeedbackMessage(percentageOfCoverage);
    }

    assignFeedbackMessage(percentageOfCoverage) {
        if (percentageOfCoverage === null) {
            this.feedbackMessage = "This project has no commits yet.";
        }
        else{
            this.feedbackMessage = "Deficient";
        }
    }

    getFeedbackMessage() {
        return this.feedbackMessage;
    }
}