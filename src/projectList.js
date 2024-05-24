import { Project } from './project.js';

export class ProjectsList {
    constructor() {
      this.projects = [];
    }
  
    getProjectList() {
      return this.projects;
    }
  
    addProject(projectName) {
      const project = new Project(projectName);
      this.projects.push(project);
    }
  
    deleteProject(index) {
      this.projects.splice(index, 1);
    }
  
    getTotalPoints() {
      return this.projects.reduce((acc, project) => acc + project.getTotalPointsPerProject(), 0);
    }
  }