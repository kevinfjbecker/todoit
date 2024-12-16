import * as fs from 'fs'

export default class MarkdownConnector
{
    generateProjectSheets(projectList, taskList)
    {
        const projects = projectList.map(project =>
        {
            return {
                name: project.name,
                tasks: taskList
                    .filter(task =>
                    {
                        return task.project_id === project.id &&
                            task.parent_id === null
                    })
                    .map(task =>
                    {
                        return {
                            content: task.content,
                            subtasks: taskList
                                .filter(subtask => {
                                    return subtask.parent_id === task.id
                                })
                                .map(({content}) => ({content}))
                        }
                    })
            }
        })

        projects.forEach(project =>
        {
            fs.writeFileSync(
                './markdown/' + getFileName(project.name),
                getProjectMarkdown(project)
            )
        })
    }

    parseMarkdown(filePath)
    {
        const PROJECT = 'PROJECT'
        const TASK = 'TASK'
        const DESCRIPTION = 'DESCRIPTION' // todo: add for top level tasks
        const SUBTASK = 'SUBTASK'

        let readingState = null
        let currentTask = null

        const project = {
            name: '',
            tasks: []
        }

        const markdownLines = fs.readFileSync(filePath).toString().split('\n')

        markdownLines.forEach(line =>
        {
            if(line.startsWith('# ')) {
                readingState = PROJECT
                project.name = line.slice(2)
            }
            if(line.startsWith('## ')) {
                readingState = TASK
                currentTask = {
                    content: line.slice(3),
                    subtasks: []
                }
                project.tasks.push(currentTask)
            }
            if(line.startsWith('* ')) {
                readingState = SUBTASK
                currentTask.subtasks.push({
                    content: line.slice(2)
                })
            }
        })

        return project
    }
}

const getFileName = (projectName) =>
{
    return projectName.split(' ')
        .map(s => s[0].toUpperCase()+s.slice(1))
        .join('') +
        '.md'
}

const getProjectMarkdown = (project) =>
{
    let output = '# ' + project.name + '\n'
    if(project.tasks.length > 0)
    {
        output += '\n'
        output += project.tasks.map(task =>
        {
            let taskOutput = '## ' + task.content + '\n'
            if(task.subtasks.length > 0)
            {
                taskOutput += '\n'
                taskOutput += task.subtasks.map(subtask =>
                    '* ' + subtask.content
                )
                .join('\n') +
                '\n'
            }
            return taskOutput
        })
        .join('\n')
    }
    return output
}
