export class ModifiedLinesEvaluationCriteria{
    isThereNone(modifiedLines){
        return modifiedLines == 0;
    }
    isDeficient(modifiedLines){
        return modifiedLines > 60;
    }
    isRegular(modifiedLines){
        return modifiedLines > 40 && modifiedLines <= 60;
    }
}