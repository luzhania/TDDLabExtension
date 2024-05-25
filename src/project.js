import { Commit } from "./commit.js";
import { ProjectCoverageFeedbackAssigner } from "./ProjectCoverageFeedbackAssigner.js";

export class Project {
  name = "";
  commitList = [];
  testCoverage = null;

  constructor(name) {
    this.name = name;
    this.testCoverageFeedback = new ProjectCoverageFeedbackAssigner();
  }

  getProjectName() {
    return this.name;
  }

  addCommit(commitDescription, modifiedLines, addedTests, percentageOfCoverage) {
    const commit = new Commit(commitDescription, modifiedLines, addedTests, percentageOfCoverage);
    this.commitList.push(commit);
  }

  getTotalPointsPerProject() {
    return this.commitList.reduce((acc, commit) => acc + commit.getTotalPoints(), 0);
  }

  getTestCoverage() {
    return this.testCoverageFeedback;
  }
}