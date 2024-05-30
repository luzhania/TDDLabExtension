export class FileProcessor {
    projectsList = null;
    file;

    constructor(projectsList, file) {
        this.projectsList = projectsList;
        this.file = file;
    }

    fileExist() {
        return !!this.file; 
    }
}