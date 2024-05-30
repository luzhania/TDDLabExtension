export class ProjectCodeComplexity{
    points = 0;
    commitList = [];
    constructor(commitList){
        this.commitList = commitList;
        this.assignPoints(this.getProjectCodeComplexity());
    }
    
    getProjectCodeComplexity(){
        return null;
    }

    assignPoints(codeComplexity){
        this.points = 0;
    }

    getPoints(){
        return this.points;
    }
}