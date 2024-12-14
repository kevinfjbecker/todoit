import * as fs from 'fs'

export default class MarkdownConnector
{
    PROJECT = 'PROJECT'
    TASK = 'TASK'
    DESCRIPTION = 'DESCRIPTION'
    SUBTASK = 'SUBTASK'

    constructor()
    {
        // todo: use getDateString to make uniform filenames
        // this.taskFilePath =
        //     `./data/tasks_${getDateString(new Date())}.json`
        // this.projectFilePath =
        //     `./data/projects_${getDateString(new Date())}.json`
    }

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

        // fs.writeFileSync('./markdown/Projects.json', JSON.stringify(projects, null, 4))

        projects.forEach(project =>
        {
            fs.writeFileSync(
                './markdown/' + this.getFileName(project.name),
                this.getProjectMarkdown(project)
            )
        })
    }

    getProjectMarkdown(project)
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

    getFileName(projectName)
    {
        return projectName.split(' ')
            .map(s => s[0].toUpperCase()+s.slice(1))
            .join('') +
            '.md'
    }

}

// todo: work the below in to a markdown parser

// let readingState = null
// let currentTask = null

// const project = {
//     name: '',
//     tasks: []
// }

// const markdownLines = fs.readFileSync('./markdown/NextToDo.md').toString().split('\n')

// markdownLines.forEach(line =>
// {
//     if(line.startsWith('# ')) {
//         readingState = PROJECT
//         project.name = line.slice(2)
//     }
//     if(line.startsWith('## ')) {
//         readingState = TASK
//         currentTask = {
//             content: line.slice(3),
//             subtasks: []
//         }
//         project.tasks.push(currentTask)
//     }
//     if(line.startsWith('* ')) {
//         readingState = SUBTASK
//         currentTask.subtasks.push({
//             content: line.slice(2)
//         })
//     }
// })

// // console.log(markdownLines.join('\n'))
// console.log(JSON.stringify(project, null, 4))

