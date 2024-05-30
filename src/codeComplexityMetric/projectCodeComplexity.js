export class ProjectCodeComplexity{
    points = 0;
    constructor(codeComplexity){
        this.assignPoints(codeComplexity);
    }
    
    assignPoints(codeComplexity){
        this.points = 0;
    }
    getPoints(){
        return this.points;
    }
}