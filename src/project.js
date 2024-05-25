import { Commit } from "./commit.js";

export class Project {
  name = "";
  commitList = [];

  constructor(name) {
    this.name = name;
  }

  getProjectName() {
    return this.name;
  }

  addCommit(commitDescription, modifiedLines, addedTests, percentageOfCoverage, commitDay, commitMonth, commitYear) {
    const commit = new Commit(commitDescription, modifiedLines, addedTests, percentageOfCoverage, commitDay, commitMonth, commitYear);
    this.commitList.push(commit);
  }

  getTotalPointsPerProject() {
    return this.commitList.reduce((acc, commit) => acc + commit.getTotalPoints(), 0);
  }
}