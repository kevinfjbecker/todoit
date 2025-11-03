import * as fs from 'fs'
import { markdown, projects, tasks, } from './State.js'
import ApiConnector from './ApiConnector.js'
import FileConnector from './FileConnector.js'
import MarkdownConnector from './MarkdownConnector.js'
import ProgressBar from 'progress'

///////////////////////////////////////////////////////////////////////////////

const secrets = JSON.parse(fs.readFileSync('./private/secrets.json'))
const apiConnector = new ApiConnector(secrets.apiToken)
const fileConnector = new FileConnector()
const markdownConnector = new MarkdownConnector()

///////////////////////////////////////////////////////////////////////////////

export const actions = {
    "clear": () => { console.clear() },
    "delete": async (answers) => {
        const actions = {
            "delete,all": async () => {

                console.clear()

                await new Promise(r => setTimeout(r, 500))

                const total = tasks.length + projects.length + 3 // hard-coded ticks

                const progressBar = new ProgressBar(
                    '    [:bar] [:status] :current/:total :percent :etas',
                    {
                        complete: '=',
                        incomplete: ' ',
                        total,
                        width: 30
                    }
                )
                progressBar.tick({ status: 'deleting tasks...' })
                await apiConnector.deleteAllTasks(tasks, progressBar)

                progressBar.tick({ status: 'deleting projects...' })
                await apiConnector.deleteAllProjects(projects, progressBar)

                progressBar.tick({ status: 'done.' })
            },
            "delete,project": async (projetId) => {

                console.clear()

                await new Promise(r => setTimeout(r, 500))

                const projectTasks = tasks.filter(task => {
                    return task.project_id === projetId
                })

                const total = projectTasks.length + 3 // hard-coded ticks

                const progressBar = new ProgressBar(
                    '    [:bar] [:status] :current/:total :percent :etas',
                    {
                        complete: '=',
                        incomplete: ' ',
                        total,
                        width: 30
                    }
                )

                progressBar.tick({ status: 'deleting tasks...' })
                await apiConnector.deleteAllTasks(projectTasks, progressBar);

                const projectToDelete = projects.find(project =>
                    project.id === projetId)

                if (projectToDelete.is_inbox_project) {
                    progressBar.tick({ status: 'Skipping Inbox' })
                }
                else {
                    progressBar.tick({status: 'deleting project...'})
                    await apiConnector.deleteProject(projetId, progressBar)
                }

                progressBar.tick({status: 'done.'})
            }
        }
        actions[answers.slice(0, 2)](answers[2])
    },
    "exit": () => {
        console.clear()
        process.exit(0)
    },
    "fetch": async () => {
        projects.length = 0
        tasks.length = 0

        console.log('fetching projects...')
        projects.push(... await apiConnector.fetchProjects())

        console.log('fetching tasks...')
        tasks.push(... await apiConnector.fetchTasks())

        console.log('done.')
    },
    "markdown": () => {
        console.log('generating...')
        markdownConnector.generateProjectSheets(projects, tasks)
        console.log('done.')
    },
    "parse": (answers) => {
        markdown.project =
            markdownConnector.parseMarkdown(`./markdown/${answers[1]}`)
        console.log(`Parsed ${markdown.project.name}.`)
    },
    "push": async () => {
        await apiConnector.uploadProject(markdown.project)
        console.log('uploaded.')
    },
    "read": () => { console.log('Not implemented.') },
    "write": () => {
        console.log('writing projects...')
        fileConnector.saveProjects(projects)

        console.log('writing tasks...')
        fileConnector.saveTasks(tasks)

        console.log('done.')
    }
}