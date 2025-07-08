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
                            description: task.description,
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
        const START = 'START'
        const PROJECT = 'PROJECT'
        const TASK = 'TASK'
        const DESCRIPTION = 'DESCRIPTION'
        const SUBTASK = 'SUBTASK'

        let readingState = START
        let currentTask = null

        const project = {
            name: '',
            tasks: []
        }

        const markdownLines = fs.readFileSync(filePath).toString().split('\n')

        markdownLines.forEach(line =>
        {
            // console.log(readingState) // debug
            // console.log(line) // debug
            if(readingState !== DESCRIPTION && line.startsWith('# ')) {
                readingState = PROJECT
                project.name = line.slice(2)
            }
            if(readingState !== DESCRIPTION && line.startsWith('## ')) {
                readingState = TASK
                currentTask = {
                    content: line.slice(3),
                    subtasks: []
                }
                project.tasks.push(currentTask)
            }
            if(line.startsWith('```')) {
                if(readingState === TASK) {
                    readingState = DESCRIPTION
                    currentTask.description = ''
                } else {
                    readingState = TASK
                }
            }
            if(readingState === DESCRIPTION && ! line.startsWith('```')) {
                currentTask.description += line + '\n'
            }
            if(readingState !== DESCRIPTION && line.startsWith('* ')) {
                readingState = SUBTASK
                currentTask.subtasks.push({
                    content: line.slice(2)
                })
            }
            // console.log(readingState) // debug
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
    // console.log(project) // debug
    let output = '# ' + project.name + '\n'
    if(project.tasks.length > 0)
    {
        output += '\n'
        output += project.tasks.map(task =>
        {
            let taskOutput = '## ' + task.content + '\n'
            if(task.description)
            {
                taskOutput += '\n``` text\n' + task.description + '\n```\n'
            }
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
