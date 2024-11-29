import { createInterface } from 'node:readline'
import * as fs from 'fs'
import ApiConnector from './ApiConnector.mjs'
import FileConnector from './FileConnector.mjs'
import MarkdownConnector from './MarkdownConnector.mjs'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'todoit> ',
})

///////////////////////////////////////////////////////////////////////////////

const secrets = JSON.parse(fs.readFileSync('secrets.json'))
const apiConnector = new ApiConnector(secrets.apiToken)
const fileConnector = new FileConnector()
const markdownConnector = new MarkdownConnector()

let projects = null
let tasks = null

///////////////////////////////////////////////////////////////////////////////

rl.prompt()

///////////////////////////////////////////////////////////////////////////////

rl
    .on('line', processCommand)
    .on('close', () => {
        console.log('Bye!')
        process.exit(0)
    })

async function processCommand(line)
{
    switch (line.trim())
    {
        case 'clear':
            console.clear()
        break

        case 'delete':
            console.log('deleting projects...')
            apiConnector.deleteAllProjects(projects)

            console.log('deleting tasks...')
            apiConnector.deleteAllTasks(tasks)
        break

        case 'exit':
            console.clear()
            process.exit(0)

        case 'fetch':
            console.log('fetching projects...')
            projects = await apiConnector.fetchProjects()

            console.log('fetching tasks...')
            tasks = await apiConnector.fetchTasks()

            console.log('done.')
        break

        case 'markdown':
            console.log('generating...')
            markdownConnector.generateProjectSheets(projects, tasks)
            console.log('done.')
        break

        case 'parse':
            console.log('parsing...')
            console.log('done.')
        break

        case 'push':
            console.log('pushing...')
            console.log('done.')
        break

        case 'write':
            console.log('writing projects...')
            fileConnector.saveProjects(projects)

            console.log('writing tasks...')
            fileConnector.saveTasks(tasks)
            
            console.log('done.')
        break

        default:
            console.log(`'${line.trim()}' is unknown`)
            console.log(`Available commands:\n* ${[
                'delete',
                'exit',
                'fetch',
                'markdown',
                'parse',
                'push',
                'write',
            ].join('\n* ')}`)
        break
    }
    rl.prompt()
}