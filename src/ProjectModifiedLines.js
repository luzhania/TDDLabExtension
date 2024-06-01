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
            case this.ModifiedLinesEvaluationCriteria.isExcelent(ModifiedLines):
                this.projectPoints = 20;
                break;
            case this.ModifiedLinesEvaluationCriteria.isThereNone(ModifiedLines):
                this.projectPoints = 0;
                break;
            case this.ModifiedLinesEvaluationCriteria.isDeficient(ModifiedLines):
                this.projectPoints = 8;
                break;
        }
    }

    getPoints(){
        return this.projectPoints;
    }
}