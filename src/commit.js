import { AddedTestMetric } from "./project.js";
import { PercentageOfCoverageMetric } from "./percentageOfCoverageMetric.js";
import { ModifiedLinesMetric } from "./modifiedLinesMetric.js";

export class Commit {
    commitDescription = "";
    modifiedLines = 0;
    addedTests = 0;
    percentageOfCoverage = null;
  
    constructor(commitDescription, modifiedLines, addedTests, percentageOfCoverage) {
      this.commitDescription = commitDescription;
      let linesValue = new ModifiedLinesMetric(modifiedLines);
      this.modifiedLines = linesValue;
      this.addedTests = new AddedTestMetric(addedTests, commitDescription)
      this.percentageOfCoverage = new PercentageOfCoverageMetric(percentageOfCoverage);
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
  
    getTotalPoints() {
      return this.modifiedLines.getPoints() + this.addedTests.getPoints() + this.percentageOfCoverage.getPoints();
    }
  }