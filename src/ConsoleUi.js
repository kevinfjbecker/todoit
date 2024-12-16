import { select, Separator } from '@inquirer/prompts'
import * as fs from 'fs'

import { actions } from './Actions.mjs'
import { markdown, projects, tasks } from './State.mjs'

export const runUi = async ( ) =>
{
    const answerPath = []
    while(answerPath.join( ) !== 'exit')
    {
        const answer = await doSelector(answerPath)
        answerPath.push(answer)
        if(submenu[answerPath] === undefined)
        {
            await actions[answerPath[0]](answerPath)
            answerPath.length = 0
        }
    }
}

const doSelector = async (selectionPath) => select({
    message: 'What do you want to do',
    pageSize: 9,
    choices: getChoices(selectionPath)
  })

const getChoices = (previousSelections) =>
{
    if(previousSelections.join( ) === '')
    {
        return [
            {
                "name": "clear",
                "value": "clear",
                "disabled": false,
                "description": "clear the console"
            },
            {
                "name": "delete",
                "value": "delete",
                "disabled": isSyncedWithRemote( ) ? false : "(run fetch first)",
                "description": "delete one or all project(s) and tasks"
            },
            {
                "name": "exit",
                "value": "exit",
                "disabled": false,
                "description": "quit application"
            },
            {
                "name": "fetch",
                "value": "fetch",
                "disabled": false,
                "description": "fetch all projects and tasks from todoist API"
            },
            {
                "name": "markdown",
                "value": "markdown",
                "disabled": isSyncedWithRemote( ) > 0 ? false : "(run fetch first)",
                "description": "write a project to markdown"
            },
            {
                "name": "parse",
                "value": "parse",
                "disabled": false,
                "description": "import a project from markdown"
            },
            {
                "name": "push",
                "value": "push",
                "disabled": !! markdown.project ? false : "(run parse first)",
                "description": "push a project and tasks to todoist API"
            },
            {
                "name": "read",
                "value": "read",
                "disabled": false,
                "description": "read raw projects and tasks from file"
            },
            {
                "name": "write",
                "value": "write",
                "disabled": isSyncedWithRemote( ) > 0 ? false : "(run fetch first)",
                "description": "write raw projects and tasks to file"
            }
        ]
    }

    return submenu[previousSelections]( )
}

const isSyncedWithRemote = () => projects.length > 0 && tasks.length

const submenu = {
    "delete": ( ) => [
        {
            "name": "project",
            "value": "project",
            "description": "delete a single project and its tasks"
        },
        {
            "name": "all",
            "value": "all",
            "description": "delete all tasks and projects"
        }
    ],
    "delete,project": ( ) =>
        projects.map(({name, id}) => ({ name, value: id }))
    ,
    "parse": ( ) => fs.readdirSync('./markdown') // explodes if no files
}
