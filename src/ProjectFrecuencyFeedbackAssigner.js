export class ProjectFrecuencyFeedbackAssigner {
    constructor(commitList){
        this.assignPoints(commitList);
    };
    assignPoints(commitList) {
        let averageFrecuency = this.getFrecuencyOfCommits(commitList);
        if(averageFrecuency === undefined){
            this.points = 0;
            this.feedback = "This project has no commits yet.";
        }
        else{
            if(averageFrecuency <= 172800000 || averageFrecuency === "NoEmpty"){
                this.points = 20;
                this.feedback = "Excellent";
            }
            else{
                if (averageFrecuency <= 259200000){
                    this.points = 16;
                    this.feedback = "Good";
                }
                else{
                    if (averageFrecuency <= 432000000){
                        this.points = 12;
                        this.feedback = "Regular";
                    }
                    else{
                        this.points = 8;
                        this.feedback = "Deficient";
                    }
                }
                    
            }
        }
    };
    getPoints() {    
        return this.points;
    };
    getFeedbackMessage() {    
        return this.feedback;
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
