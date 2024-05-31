import { ModifiedLinesEvaluationCriteria } from "./ModifiedLinesEvaluationCriteria";
export class ProjectModifiedLines{
    projectFeedback = "";
    projectPoints = 0;
    commitList = [];
    constructor(commitList){
        this.commitList = commitList;
    }
    isEmptyProject() {
        return this.commitList.length === 0;
    }

    getPoints(){
        return this.projectPoints;
    }
}