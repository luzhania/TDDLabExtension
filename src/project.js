import { ProjectCodeComplexity } from "./projectCodeComplexity.js";
import { Commit } from "./commit.js";
import { ProjectCoverageFeedbackAssigner } from "./ProjectCoverageFeedbackAssigner.js";
import { ProjectModifiedLines } from "./ProjectModifiedLines.js";

export class Project {
  name = "";
  commitList = [];
  testCoverage = null;

  constructor(name) {
    this.name = name;
  }

  getProjectName() {
    return this.name;
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
    return new ProjectCoverageFeedbackAssigner(this.commitList);
  }
  
  getCodeComplexity() {
    return new ProjectCodeComplexity(this.commitList);
  }

  getModifiedLines(){
    return new ProjectModifiedLines(this.commitList);
  }

  changeName(newName) {
    this.name = newName;
  }
}