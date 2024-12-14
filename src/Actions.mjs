import * as fs from 'fs'
import { state, projects, tasks } from './State.mjs'
import ApiConnector from './ApiConnector.js'
import FileConnector from './FileConnector.js'
import MarkdownConnector from './MarkdownConnector.js'

///////////////////////////////////////////////////////////////////////////////

const secrets = JSON.parse(fs.readFileSync('./private/secrets.json'))
const apiConnector = new ApiConnector(secrets.apiToken)
const fileConnector = new FileConnector()
const markdownConnector = new MarkdownConnector()

///////////////////////////////////////////////////////////////////////////////

export const actions = {
    "clear": () => { console.clear() },
    "delete": (answers) =>
    {
        const actions = {
            "delete,all": () => {
                console.log('deleting tasks...')
                apiConnector.deleteAllTasks(tasks)
    
                console.log('deleting projects...')
                apiConnector.deleteAllProjects(projects)

                console.log('done.')
            },
            "delete,project": (id) => { console.log(`deleted project ${id}`) }
        }
        actions[answers.slice(0, 2)](answers[2])
    },
    "exit": () => 
    {
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
        console.log(`parsed ${answers[1]}`)
        state.markdown = true // mock
    },
    "push": () => { console.log('pushed.') },
    "read": () => {state.file = true },
    "write": () => {
        console.log('writing projects...')
        fileConnector.saveProjects(projects)

        console.log('writing tasks...')
        fileConnector.saveTasks(tasks)
        
        console.log('done.')
    }
}