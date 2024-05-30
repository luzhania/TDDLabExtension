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
            const complexityValueMap = {
                'low': 1,
                'moderate': 2,
                'high': 3,
                'veryHigh': 4
            };

            let totalComplexity = 0;
            for (let commit of this.commitList){
                totalComplexity += complexityValueMap[commit.getCodeComplexity().getValue()];
            }
            return totalComplexity / this.commitList.length;
        }
        return null;
    }

    assignPoints(codeComplexity){
        switch (true){
            case codeComplexity === null:
                this.points = 0;
                break;
            case codeComplexity < 1.5:
                this.points = 8;
                break;
            case codeComplexity < 2.5:
                this.points = 12;
                break;
            case codeComplexity < 3.5:
                this.points = 16;
                break;
        }
    }

    getPoints(){
        return this.points;
    }
}