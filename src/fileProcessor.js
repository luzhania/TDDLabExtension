import { Commit } from "./commit";

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

    processFileContent(content) {
        const lines = content.trim().split('\n');
        const dataArray = lines.map(line => {
            const [ID_commit, FechaHora, CantidadPruebas, LineasCodigo, PorcentajeCobertua, Complejidad] = line.split(',').map(item => item.trim());

            const [fecha, hora] = FechaHora.split('-');
            const [dia, mes, anio] = fecha.split('/').map(Number);
            const [horas, minutos] = hora.split(':').map(Number);
            const commitDate = new Date(anio, mes - 1, dia, horas, minutos);

            return new Commit(
                `Commit ${ID_commit}`,
                Number(LineasCodigo),
                Number(CantidadPruebas),
                Number(PorcentajeCobertua),
                commitDate,
                Complejidad
            );
        });
        return dataArray;
    }
}