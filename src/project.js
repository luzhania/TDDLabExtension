import { Commit } from "./commit.js";
import { ProjectCoverageFeedbackAssigner } from "./ProjectCoverageFeedbackAssigner.js";
import { ProjectTestsFeedbackAssigner } from "./ProjectTestsFeedbackAssigner.js";

export class Project {
  name = "";
  commitList = [];
  testCoverage = null;
  addedTests = null;

  constructor(name) {
    this.name = name;
    this.testCoverage = new ProjectCoverageFeedbackAssigner(null);
    this.addedTests = new ProjectTestsFeedbackAssigner(null);
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
    return parseInt(this.commitList.reduce((acc, commit) => acc + parseInt(commit.getPercentageOfCoverage().getValue()), 0) / this.commitList.length);
  }

  getAddedTestsPerCommit(){
    if (!this.isEmptyProject()){
      return new ProjectTestsFeedbackAssigner(this.getPercentageOfCommitsWithTests());
    }
    else{
      return this.addedTests;
    }
  }

  getPercentageOfCommitsWithTests() {
    let count = 0;
    for (const commit of this.commitList){
      if(commit.getAddedTests().getValue() >= 1) count ++;
    };
    return count/this.commitList.length;
  }
}