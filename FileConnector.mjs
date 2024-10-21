import fs from 'fs'

const getDateString = (d) =>
    d.getFullYear() +
    ('' + (d.getMonth()+1)).padStart(2,'0') +
    d.getDate()

export default class FileConnector
{
    constructor()
    {
        this.taskFilePath =
            `./data/tasks_${getDateString(new Date())}.json`
        this.projectFilePath =
            `./data/projects_${getDateString(new Date())}.json`
    }

    saveProjects(projectList)
    {
        fs.writeFileSync(this.projectFilePath, projectList)
    }
}