import { AddedTestMetric } from "./addedTestMetric.js";
import { TestCoverageCommitMetric } from "./percentageOfCoverageMetric.js";
import { ModifiedLinesMetric } from "./modifiedLinesMetric.js";
import { CommitCodeComplexity } from "./codeComplexityMetric/commitCodeComplexity.js";

export class Commit {
    commitDescription = "";
    modifiedLines = 0;
    addedTests = 0;
    percentageOfCoverage = null;
    commitDate = null;
    codeComplexity = null;
  
    constructor(commitDescription, modifiedLines, addedTests, percentageOfCoverage, date, codeComplexity) {
      this.commitDescription = commitDescription;
      let linesValue = new ModifiedLinesMetric(modifiedLines);
      this.modifiedLines = linesValue;
      this.addedTests = new AddedTestMetric(addedTests, commitDescription)
      this.percentageOfCoverage = new TestCoverageCommitMetric(percentageOfCoverage);
      this.commitDate = date;
      this.codeComplexity = new CommitCodeComplexity(codeComplexity);
    }
  
    getCommitDescription() {
      return this.commitDescription;
    }
  
    getModifiedLines() {
      return this.modifiedLines;
    }
  
    getAddedTests() {
      return this.addedTests;
    }
  
    getPercentageOfCoverage() {
      return this.percentageOfCoverage;
    }

    getCommitDate() {
      return this.commitDate;
    }

    getCommitStringDate() {
      return this.commitDate.getDate() + "/" + (this.commitDate.getMonth() + 1) + "/" + this.commitDate.getFullYear();
    }

    getCommitTimeString() {
      return this.commitDate.getHours() + ":" + this.commitDate.getMinutes();
    }

    getCodeComplexity() {
      return this.codeComplexity;
    }
  }
