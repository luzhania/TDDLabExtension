import { Project, ProjectsList } from "./project.js";

describe("Add project", () => {
  let project = new Project("Saludador");
  it("should save 'Saludador' as the name of the project", () => {
    expect(project.getProjectName()).toEqual("Saludador");
  });
});

describe("Add projects", () => {
  let projectslist = new ProjectsList();
  projectslist.addProject("Saludador");
  projectslist.addProject("Totalizador");
  it("should save 2 projects with names 'Saludador' and 'Totalizador'", () => {
    const projectNames = projectslist.getProjectList().map(project => project.getProjectName());
    expect(projectNames).toEqual(["Saludador", "Totalizador"]);
  });
});

describe("Delete one project", () => {
  let projectslist = new ProjectsList();
  projectslist.addProject("Saludador");
  projectslist.addProject("Totalizador");
  projectslist.projects.pop();
  it("should delete the last project 'Totalizador'", () => {
    const projectNames = projectslist.getProjectList().map(project => project.getProjectName());
    expect(projectNames).toEqual(["Saludador"]);
  });
});

describe("Delete any project", () => {
  let projectslist = new ProjectsList();
  projectslist.addProject("Saludador");
  projectslist.addProject("Totalizador");
  projectslist.addProject("Calculador");
  projectslist.deleteProject(0);
  it("should delete the first project 'Saludador'", () => {
    const projectNames = projectslist.getProjectList().map(project => project.getProjectName());
    expect(projectNames).toEqual(["Totalizador", "Calculador"]);
  });
});

describe("Add commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method");
  it("should save a commit with the description 'Added the greet method'", () => {
    expect(project.commitList[0].getCommitDescription()).toEqual("Added the greet method");
  });
});

describe("Add modified lines per commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method", 10);

  it("should save 1 commit with description 'Added the greet method' and 10 modified lines", () => {
    const commit = project.commitList[0];
    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
  });
});

describe("Add added tests per commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method", 10, 2);

  it("should save 1 commit with description 'Added the greet method', 10 modified lines, and 2 added tests", () => {
    const commit = project.commitList[0];
    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
    expect(commit.getAddedTests().getValue()).toEqual(2);
  });
});

describe("Add percentage of coverage per commit", () => {
  let project = new Project("Saludador");
  project.addCommit("Added the greet method", 10, 2, 100);

  it("should save 1 commit with description 'Added the greet method', 10 modified lines, and 2 added tests, 100 percentage of coverage", () => {
    const commit = project.commitList[0];
    expect(commit.getCommitDescription()).toEqual("Added the greet method");
    expect(commit.getModifiedLines().getValue()).toEqual(10);
    expect(commit.getAddedTests().value).toEqual(2);
    expect(commit.getPercentageOfCoverage().getValue()).toEqual(100);
  });
});

describe("Assign points for percentage of coverage per commit", () => {
  it("should assign 10 points for the attempt", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getPercentageOfCoverage().getPoints()).toEqual(10);
  });
  it("should assign 70 points if the percentage of coverage is major or equal to 60 and minor to 90", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 75);
    const commit = project.commitList[0];
    expect(commit.getPercentageOfCoverage().getPoints()).toEqual(70);
  });
  it("should assign 100 points if the percentage of coverage is major or equal to 90", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 95);
    const commit = project.commitList[0];
    expect(commit.getPercentageOfCoverage().getPoints()).toEqual(100);
  });
});

describe("Return feedback messages for percentage of coverage per commit", () => {
  it("should return encouraging feedback for the attempt", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getPercentageOfCoverage().getFeedbackMessage()).toEqual("❌ Cobertura de código: ¡Solo el 20% del código está cubierto por pruebas! Es fundamental mejorar drásticamente la cobertura de pruebas para garantizar la calidad y fiabilidad del código. Dedica más tiempo a escribir pruebas exhaustivas antes de escribir el código de producción. ¡Vamos, puedes lograr una cobertura mucho más alta en el siguiente commit!");
  });
  it("should return encouraging feedback for a relatively good percentage of coverage", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 65);
    const commit = project.commitList[0];
    expect(commit.getPercentageOfCoverage().getFeedbackMessage()).toEqual("🤔 Cobertura de código: 65% del código está cubierto por pruebas. Aunque la cobertura de pruebas es relativamente buena, aún hay espacio para mejorar. Recuerda que al aplicar TDD es importante obtener un porcentaje de cobertura más alto. Escribe más pruebas para cubrir todas las funcionalidades y casos de uso de tu código. ¡Ánimo! ¡Tendrás una mayor cobertura en el siguiente commit!");
  });
  it("should return encouraging feedback for a good percentage of coverage", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 10, 2, 94);
    const commit = project.commitList[0];
    expect(commit.getPercentageOfCoverage().getFeedbackMessage()).toEqual("✔ Cobertura de código: ¡94% del código está cubierto por las pruebas! Continúa aplicando este enfoque riguroso para escribir pruebas antes de escribir el código de producción.");
  });
});

describe("Assign points for modified lines per commit", () => {
  it("should assign 0 points for the attempt if the modified lines are equal to 0", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 0, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getPoints()).toEqual(0);
  });
  it("should assign 100 points for the attempt if the modified lines are grater than 0 and lower or equal to 35", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 25, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getPoints()).toEqual(100);
  });
  it("should assign 70 points for the attempt if the modified lines are grater than 35 and lower or equal to 50", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 40, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getPoints()).toEqual(70);
  });
  it("should assign 10 points for the attempt if the modified lines are grater than 50", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 60, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getPoints()).toEqual(10);
  });  
});

describe("Return feedback messages for modified lines per commit", () => {
  it("should return encouraging feedback for the attempt when there was 0 lines modified", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 0, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getFeedbackMessage()).toEqual("❌ Líneas de código modificadas: 0. Debes hacer los cambios necesarios para el ciclo TDD en tu código antes de hacer un commit. No te desanimes. ¡Aplica lo aprendido en la siguiente!");
  });
  it("should return encouraging feedback if the modified lines were grater than 0 and lower or equal to 35", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 15, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getFeedbackMessage()).toEqual("✔ Líneas de código modificadas: 15. El código sufrió pocos cambios. ¡Buen trabajo! ¡Sigue así!");
  });
  it("should return encouraging feedback if the modified lines were grater than 35 and lower or equal to 50", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 45, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getFeedbackMessage()).toEqual("🤔 Líneas de código modificadas: 45. Muchas líneas de código modificadas para ser un ciclo TDD, debes reducir los cambios que realizas al código en cada ciclo ¡Lo harás mejor en el siguiente commit!");
  });
  it("should return encouraging feedback if the modified lines were grater than 50", () => {
    let project = new Project("Saludador");
    project.addCommit("Added the greet method", 55, 2, 20);
    const commit = project.commitList[0];
    expect(commit.getModifiedLines().getFeedbackMessage()).toEqual("❌ Líneas de código modificadas: 55. Demasiadas líneas de código añadidas. Debes hacer solo los cambios necesarios en cada ciclo de TDD. ¡Vamos, puedes hacerlo mejor y tendrás más puntos!");
  });

  describe("Assign points for added tests", () => {
    it("should assign 100 points for the attempt", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: changing names of variables", 0, 0, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(100);
    });
    it("should assign 100 points for the attempt if the added tests are equal to 0 when message of commit is 'refact: [rest of message]'", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: changing names of variables", 0, 0, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(100);
    });
    it("should assign 0 points for the attempt if the added tests are equal to 1 when message of commit is 'refact: [rest of message]'", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: changing names of variables", 0, 1, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(0);
    });
    it("should assign 0 points for the attempt if the added tests are more than 0 when message of commit is 'refact: [rest of message]'", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: changing names of variables", 0, 2, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(0);
    });
    it("should assign 0 points for the attempt if the added tests are equal to 0 when commit isn't for refactoring", () => {
      let project = new Project("Saludador");
      project.addCommit("new function destroyHelloWorld implemented", 0, 0, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(0);
    });
    it("should assign 100 points for the attempt if the added tests are equal to 1 when commit isn't for refactoring", () => {
      let project = new Project("Saludador");
      project.addCommit("new function destroyHelloWorld implemented", 0, 1, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(100);
    });
    it("should assign 10 points for the attempt if the added tests are more than 1 when commit isn't for refactoring", () => {
      let project = new Project("Saludador");
      project.addCommit("new function destroyHelloWorld implemented", 0, 2, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getPoints()).toEqual(10);
    });
  });

  describe("Return feedback messages for modified lines per commit", () => {
    it("should return encouraging feedback when is a refactoring commit and the number of addedTests is equal to 0", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: adding functions for best coder reading", 0, 0, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getFeedbackMessage()).toEqual("☑️Buen trabajo, no se añaden pruebas cuando el código solo es modificado para 'refactoring' 👍");
    });
    it("should return encouraging feedback when is a refactoring commit and the number of addedTests is 1", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: adding functions for best coder reading", 0, 1, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getFeedbackMessage()).toEqual("❌Recuerda, no se añaden pruebas cuando el código solo es modificado para 'refactoring'⚠️");
    });
    it("should return encouraging feedback when is a refactoring commit and there are tests added", () => {
      let project = new Project("Saludador");
      project.addCommit("refact: adding functions for best coder reading", 0, 2, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getFeedbackMessage()).toEqual("❌Recuerda, no se añaden pruebas cuando el código solo es modificado para 'refactoring'⚠️");
    });
    it("should return encouraging feedback when is not a refactoring commit and there are not tests added", () => {
      let project = new Project("Saludador");
      project.addCommit("function to destroy 'HelloWorld' added", 0, 0, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getFeedbackMessage()).toEqual("❌Para escribir código con TDD no olvides hacer primero las pruebas!!!😨");
    });
    it("should return encouraging feedback when is not a refactoring commit and there is 1 tests added", () => {
      let project = new Project("Saludador");
      project.addCommit("function to destroy 'HelloWorld' added", 0, 1, 20);
      const commit = project.commitList[0];
      expect(commit.getAddedTests().getFeedbackMessage()).toEqual("☑️Excelente! No olvides que las pruebas son el alma del TDD 😎");
    });
  });
});