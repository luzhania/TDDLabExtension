export class ProjectTestsFeedbackAssigner {
    constructor(commitList){
        this.assignPointsAndFeedback(commitList);
    };
    assignPointsAndFeedback(commitList) {
        this.points = 0;
        this.feedbackMessage = "This project has no commits yet.";
        let percentOfTestInProject = this.getPercentageOfCommitsWithTests(commitList);
        if(isFinite(percentOfTestInProject)){
            this.points = 8;
            this.feedbackMessage = "Deficient";
            if(Number(percentOfTestInProject) >= 0.6){
                this.points = 12;
                this.feedbackMessage = "Regular";
                if(Number(percentOfTestInProject) >= 0.8){
                    this.points = 16;
                    if(Number(percentOfTestInProject) >= 1){
                        this.points = 20;
                    }
                }
            }
        }
        
    };
    getPoints() {    
        return this.points;
    };
    getFeedbackMessage(){
        return this.feedbackMessage;
    };
    isRefactoringCommit(commit){
        const refactor = 'refact:';
        return this.getFirstWordCommit(commit) == refactor ? true : false;
    };
    getFirstWordCommit(commit){
        const index = 0;
        return commit.getCommitDescription().trim().split(' ')[index];
    };
    getPercentageOfCommitsWithTests(commitList) {
        let count = 0;
        let nonRefactCommits = 0;
        for (const commit of commitList){
          if(!this.isRefactoringCommit(commit)) {
            nonRefactCommits++;
            if(commit.getAddedTests().getValue() >= 1) 
              count ++;
          }
        };
        return count/nonRefactCommits;
    }
}
