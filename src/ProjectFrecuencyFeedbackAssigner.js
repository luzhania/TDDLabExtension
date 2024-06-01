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
            else{
                if (averageFrecuency <= 259200000) 
                    this.points = 16;
                else{
                    if (averageFrecuency <= 432000000)
                        this.points = 12;
                    else
                        this.points = 8;
                }
                    
            }
        }
    };
    getPoints() {    
        return this.points;
    };
    getFrecuencyOfCommits(commitList) {
        let averageFrecuencyDifference = 0;
        let summonDifferenceDates = 0;
        let firstDate = 0;
        let secondDate = 0;
        if(!commitList.length ==0){
            if(commitList.length >1){
                for (const commit of commitList){
                    firstDate = commit.getCommitDate();
                    summonDifferenceDates += firstDate - secondDate;
                    secondDate = firstDate;
                }
                averageFrecuencyDifference = (summonDifferenceDates - commitList[0].getCommitDate())/(commitList.length-1);
                return averageFrecuencyDifference;
            }
            return "NoEmpty"
        }
    }
}
