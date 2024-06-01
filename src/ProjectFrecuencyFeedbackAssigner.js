export class ProjectFrecuencyFeedbackAssigner {
    constructor(commitList){
        this.assignPoints(commitList);
    };
    assignPoints(commitList) {
        let averageFrecuency = this.getFrecuencyOfCommits(commitList);
        if(averageFrecuency === undefined)
            this.points = 0;
        else{
            this.points = 20;
        }
    };
    getPoints() {    
        return this.points;
    };
    getFrecuencyOfCommits(commitList) {
        if(!commitList.length ==0)
            return "NoEmpty";
    }
}
