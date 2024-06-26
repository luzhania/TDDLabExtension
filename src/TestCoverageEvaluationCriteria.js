export class TestCoverageEvaluationCriteria{
    
    isDeficient(percentageOfCoverage){
        return percentageOfCoverage < 70;
    }

    isRegular(percentageOfCoverage){
        return percentageOfCoverage >= 70 && percentageOfCoverage <= 79;
    }

    isGood(percentageOfCoverage){
        return percentageOfCoverage >= 80 && percentageOfCoverage <= 90;
    }
    
    isExcellent(percentageOfCoverage){
        return percentageOfCoverage >= 91 && percentageOfCoverage <= 100;
    }
}