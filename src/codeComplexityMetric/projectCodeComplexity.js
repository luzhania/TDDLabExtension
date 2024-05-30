export class ProjectCodeComplexity{
    points = 0;
    feedbackMessage = "";
    commitList = [];
    constructor(commitList){
        this.commitList = commitList;
        this.codeComplexity = this.getProjectCodeComplexity();
        this.assignPoints(this.codeComplexity);
        this.assignFeedbackMessage(this.codeComplexity);
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
    assignFeedbackMessage(codeComplexity){
        switch (true){
            case codeComplexity === null:
                this.feedbackMessage = "This project has no commits yet.";
                break;
            case codeComplexity >= 3.5:
                this.feedbackMessage = "Deficient";
                break;
        }
    }

    getFeedbackMessage(){
        return this.feedbackMessage;
    }

    assignPoints(codeComplexity){
        switch (true){
            case codeComplexity === null:
                this.points = 0;
                break;
            case codeComplexity >= 3.5:
                this.points = 8;
                break;
            case codeComplexity >= 2.5:
                this.points = 12;
                break;
            case codeComplexity >= 1.5:
                this.points = 16;
                break;
            case codeComplexity >= 1:
                this.points = 20;
                break;
        }
    }

    getPoints(){
        return this.points;
    }
}