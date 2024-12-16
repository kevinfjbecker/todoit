import fs from 'fs'

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
        fs.writeFileSync(this.projectFilePath, JSON.stringify(projectList, null, 4))
    }

    saveTasks(taskList)
    {
        fs.writeFileSync(this.taskFilePath, JSON.stringify(taskList, null, 4))
    }
}

const getDateString = (d) =>
    d.getFullYear() +
    ('' + (d.getMonth()+1)).padStart(2,'0') +
    d.getDate()