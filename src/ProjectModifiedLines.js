import { ModifiedLinesEvaluationCriteria } from "./ModifiedLinesEvaluationCriteria";
export class ProjectModifiedLines{
    projectFeedback = "";
    projectPoints = 0;
    commitList = [];
    constructor(commitList){
        this.commitList = commitList;
        this.ModifiedLinesEvaluationCriteria = new ModifiedLinesEvaluationCriteria();
        this.ModifiedLines = this.getProjectAverageLines();
        this.assignPoints(this.ModifiedLines);
        this.assignFeedbackMessage(this.ModifiedLines);
    }

    isEmptyProject() {
        return this.commitList.length === 0;
    }

    getProjectAverageLines() {
        if (!this.isEmptyProject()) {
            return parseInt(this.commitList.reduce((acc, commit) => acc + parseInt(commit.getModifiedLines().getValue()), 0) / this.commitList.length);
        }
        return null;
    }

    assignPoints(ModifiedLines){
        switch (true) {
            case this.ModifiedLinesEvaluationCriteria.isThereNone(ModifiedLines):
                this.projectPoints = 0;
                break;
            case this.ModifiedLinesEvaluationCriteria.isDeficient(ModifiedLines):
                this.projectPoints = 8;
                break;
            case this.ModifiedLinesEvaluationCriteria.isRegular(ModifiedLines):
                this.projectPoints = 12;
                break;
            case this.ModifiedLinesEvaluationCriteria.isGood(ModifiedLines):
                this.projectPoints = 16;
                break;
            case this.ModifiedLinesEvaluationCriteria.isExcelent(ModifiedLines):
            this.projectPoints = 20;
            break;
        }
    }

    getPoints(){
        return this.projectPoints;
    }

    assignFeedbackMessage(ModifiedLines){
        switch(true){
            case ModifiedLines === null:
                this.projectFeedback = "This project has no commits yet.";
                break;
            case ModifiedLines === 0:
                this.projectFeedback = "Bad";
                break;
            case ModifiedLines > 60:
                this.projectFeedback = "Deficient";
                break;
            case ModifiedLines > 40 && ModifiedLines <= 60:
                this.projectFeedback = "Regular";
                break;
            case ModifiedLines > 20 && ModifiedLines <= 40:
                this.projectFeedback = "Good";
                break;
        }
    }

    getFeedbackMessage(){
        return this.projectFeedback;
    }
}