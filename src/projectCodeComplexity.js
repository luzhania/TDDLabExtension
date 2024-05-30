import { CodeComplexityEvaluationCriteria } from "./CodeComplexityEvaluationCriteria.js";
export class ProjectCodeComplexity{
    points = 0;
    feedbackMessage = "";
    commitList = [];
    constructor(commitList){
        this.commitList = commitList;
        this.evaluationCriteria = new CodeComplexityEvaluationCriteria();
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
            case this.evaluationCriteria.isDeficient(codeComplexity):
                this.feedbackMessage = "Deficient";
                break;
            case this.evaluationCriteria.isRegular(codeComplexity):
                this.feedbackMessage = "Regular";
                break;
            case this.evaluationCriteria.isGood(codeComplexity):
                this.feedbackMessage = "Good";
                break;
            case codeComplexity >= 1:
                this.feedbackMessage = "Excellent";
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
            case this.evaluationCriteria.isDeficient(codeComplexity):
                this.points = 8;
                break;
            case this.evaluationCriteria.isRegular(codeComplexity):
                this.points = 12;
                break;
            case this.evaluationCriteria.isGood(codeComplexity):
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