export class TestCoverageEvaluationCriteria{
    
    isDeficient(percentageOfCoverage){
        return percentageOfCoverage < 70;
    }

    isRegular(percentageOfCoverage){
        return percentageOfCoverage >= 70 && percentageOfCoverage <= 79;
    }
}