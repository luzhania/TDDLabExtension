import { ModifiedLinesEvaluationCriteria } from "./ModifiedLinesEvaluationCriteria";
export class ProjectModifiedLines{
    projectFeedback = "";
    projectPoints = 0;
    commitList = [];
    constructor(commitList){
        this.commitList = commitList;
        this.ModifiedLinesEvaluationCriteria = new ModifiedLinesEvaluationCriteria();
        this.ModifiedLines = 10;
        if(this.isEmptyProject())
            this.ModifiedLines = 0;
        this.assignPoints(this.ModifiedLines);
    }
    isEmptyProject() {
        return this.commitList.length === 0;
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
}