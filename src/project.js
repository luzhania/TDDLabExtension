import { ProjectCodeComplexity } from "./codeComplexityMetric/projectCodeComplexity.js";
import { Commit } from "./commit.js";
import { ProjectCoverageFeedbackAssigner } from "./ProjectCoverageFeedbackAssigner.js";

export class Project {
  name = "";
  commitList = [];
  testCoverage = null;

  constructor(name) {
    this.name = name;
    this.testCoverage = new ProjectCoverageFeedbackAssigner(null);
    this.codeComplexity = new ProjectCodeComplexity(null);
  }

  getProjectName() {
    return this.name;
  }

  isEmptyProject() {
    return this.commitList.length === 0;
  }

  addCommit(commitDescription, modifiedLines, addedTests, percentageOfCoverage, commitDay, commitMonth, commitYear, hours = 0, minutes = 0, codeComplexity) {
    let date = new Date(commitYear, commitMonth - 1, commitDay, hours, minutes);
    const commit = new Commit(commitDescription, modifiedLines, addedTests, percentageOfCoverage, date, codeComplexity);
    this.commitList.push(commit);
  }

  getTotalPointsPerProject() {
    return this.getTestCoverage().getPoints(); //Incomplete
  }

  getTestCoverage() {
    if (!this.isEmptyProject()) {
      return new ProjectCoverageFeedbackAssigner(this.getPercentageOfCoverageAverage());
    }
    else {
      return this.testCoverage;
    }
  }

  getPercentageOfCoverageAverage() {
    return parseInt(this.commitList.reduce((acc, commit) => acc + parseInt(commit.getPercentageOfCoverage().getValue()), 0) / this.commitList.length);
  }
  
  getCodeComplexity() {
      return this.codeComplexity;
  }
}