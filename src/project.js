import { Commit } from "./commit.js";
import { ProjectCoverageFeedbackAssigner } from "./ProjectCoverageFeedbackAssigner.js";

export class Project {
  name = "";
  commitList = [];
  testCoverage = null;

  constructor(name) {
    this.name = name;
    this.testCoverage = new ProjectCoverageFeedbackAssigner(null);
  }

  getProjectName() {
    return this.name;
  }

  isEmptyProject() {
    return this.commitList.length === 0;
  }

  addCommit(commitDescription, modifiedLines, addedTests, percentageOfCoverage) {
    const commit = new Commit(commitDescription, modifiedLines, addedTests, percentageOfCoverage);
    this.commitList.push(commit);
  }

  getTotalPointsPerProject() {
    return this.commitList.reduce((acc, commit) => acc + commit.getTotalPoints(), 0);
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
    return this.commitList[0].getPercentageOfCoverage().getValue();
  }
}