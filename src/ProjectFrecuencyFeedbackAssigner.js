export class ProjectFrecuencyFeedbackAssigner {
    constructor(commitList){
        this.assignPoints(commitList);
    };
    assignPoints(commitList) {
        this.points = this.getFrecuencyOfCommits();
    };
    getPoints() {    
        return this.points;
    };
    getFrecuencyOfCommits() {
        return 0;
    }
}
