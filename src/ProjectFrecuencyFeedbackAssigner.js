export class ProjectFrecuencyFeedbackAssigner {
    constructor(commitList){
        this.assignPoints(commitList);
    };
    assignPoints(commitList) {
        let averageFrecuency = this.getFrecuencyOfCommits(commitList);
        if(averageFrecuency === undefined)
            this.points = 0;
        else{
            if(averageFrecuency <= 172800000 || averageFrecuency === "NoEmpty")
                this.points = 20;
        }
    };
    getPoints() {    
        return this.points;
    };
    getFrecuencyOfCommits(commitList) {
        if(!commitList.length ==0){
            if(commitList.length >1)
                return commitList[1].getCommitDate()-commitList[0].getCommitDate();
            return "NoEmpty"
        }
    }
}
