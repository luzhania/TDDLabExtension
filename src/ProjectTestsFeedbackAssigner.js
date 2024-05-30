export class ProjectTestsFeedbackAssigner {
    constructor(isThereACommit){
        this.isThereACommit = isThereACommit;
        this.assignPoints();
    };
    assignPoints(){
        if (this.isThereACommit)
            this.points = 20;
        else
            this.points = 0;
    };
    getPoints() {    
        return this.points;
    };
}
