export class ProjectCoverageFeedbackAssigner {
    feedbackMessage = "";

    constructor(percentageOfCoverage) {
        this.assignFeedbackMessage(percentageOfCoverage);
    }

    assignFeedbackMessage(percentageOfCoverage) {
        if (percentageOfCoverage === null) {
            this.feedbackMessage = "This project has no commits yet.";
            return;
        }
        if(percentageOfCoverage < 70) {
            this.feedbackMessage = "Deficient";
        }
    }

    getFeedbackMessage() {
        return this.feedbackMessage;
    }
}
