export class ProjectCodeComplexity{
    points = 0;
    commitList = [];
    constructor(commitList){
        this.commitList = commitList;
        this.codeComplexity = this.getProjectCodeComplexity();
        this.assignPoints(this.codeComplexity);
    }

    isEmptyProject() {
        return this.commitList.length === 0;
    }
    
    getProjectCodeComplexity(){
        if (!this.isEmptyProject()) {
            return this.commitList[0].getCodeComplexity().getValue();
        }
        return null;
    }

    assignPoints(codeComplexity){
        if(codeComplexity === null){
            this.points = 0;
        }
        else{
            this.points = 8;
        }
    }

    getPoints(){
        return this.points;
    }
}