import { ProjectCodeComplexity } from "./projectCodeComplexity.js";
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
    return this.getTestCoverage().getPoints(); //Incomplete
  }

  getTestCoverage() {
      return new ProjectCoverageFeedbackAssigner(this.commitList);
  }
  
  getCodeComplexity() {
      return new ProjectCodeComplexity(this.commitList);
  }

  changeName(newName) {
    this.name = newName;
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
    let nonRefactCommits = 0;
    for (const commit of this.commitList){
      if(!this.isRefactoringCommit(commit)) {
        nonRefactCommits++;
        if(commit.getAddedTests().getValue() >= 1) 
          count ++;
      }
    };
    return count/nonRefactCommits;
  }

  isRefactoringCommit(commit){
    const refactor = 'refact:';
    return this.getFirstWordCommit(commit) == refactor ? true : false;
  }
  getFirstWordCommit(commit){
    const index = 0;
    return commit.getCommitDescription().trim().split(' ')[index];
  }
}