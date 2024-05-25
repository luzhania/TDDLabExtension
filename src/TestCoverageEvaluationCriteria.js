export class TestCoverageEvaluationCriteria{
    
    isDeficient(percentageOfCoverage){
        return percentageOfCoverage < 70;
    }
}