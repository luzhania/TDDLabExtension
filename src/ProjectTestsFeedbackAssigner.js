export class ProjectTestsFeedbackAssigner {
    constructor(amountTestInFirstCommit){
        this.assignPoints(amountTestInFirstCommit);
    };
    assignPoints(amountTestInFirstCommit) {
        if (amountTestInFirstCommit === null) {
            this.points = 0;
        } else {
            if(Number(amountTestInFirstCommit) <= 0)
                this.points = 8;
            else
                this.points = 20;
        }
    };
    getPoints() {    
        return this.points;
    };
}
