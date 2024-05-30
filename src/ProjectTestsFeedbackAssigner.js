export class ProjectTestsFeedbackAssigner {
    constructor(percentOfTestInProject){
        this.assignPoints(percentOfTestInProject);
    };
    assignPoints(percentOfTestInProject) {
        if (percentOfTestInProject === null) {
            this.points = 0;
        } else {
            if(Number(percentOfTestInProject) < 0.6)
                this.points = 8;
            else
                this.points = 20;
        }
    };
    getPoints() {    
        return this.points;
    };
}
