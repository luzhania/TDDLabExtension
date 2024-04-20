import Project from "./project.js";

describe("Add project", () => {
  let project = new Project("Saludador");
  it("save 'Saludador' as the name of the project", () => {
    expect(project.name).toEqual("Saludador");
  });
});
