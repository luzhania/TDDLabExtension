export class ProjectTestsFeedbackAssigner {
    constructor(percentOfTestInProject){
        this.assignPoints(percentOfTestInProject);
    };
    assignPoints(percentOfTestInProject) {
        if (percentOfTestInProject === null) {
            this.points = 0;
        } else {
            if(Number(percentOfTestInProject) > 0.6){
                this.points = 12;
                if(Number(percentOfTestInProject) >= 0.8){
                    this.points = 16;
                    if(Number(percentOfTestInProject) >= 1){
                        this.points = 20;
                    }
                }
            }
            else
                this.points = 8;
        }
    };
    getPoints() {    
        return this.points;
    };
}
