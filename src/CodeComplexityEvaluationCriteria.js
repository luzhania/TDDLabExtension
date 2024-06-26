export class CodeComplexityEvaluationCriteria{
    isDeficient(codeComplexity){
        return codeComplexity >= 3.5 && codeComplexity <= 4;
    }
    isRegular(codeComplexity){
        return codeComplexity >= 2.5 && codeComplexity < 3.5;
    }
    isGood(codeComplexity){
        return codeComplexity >= 1.5 && codeComplexity < 2.5;
    }
    isExcellent(codeComplexity){
        return codeComplexity >= 1 && codeComplexity < 1.5;
    }
}