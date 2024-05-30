export class CodeComplexityEvaluationCriteria{
    isDeficient(codeComplexity){
        return codeComplexity >= 3.5 && codeComplexity <= 4;
    }
}