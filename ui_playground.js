import { select, Separator } from '@inquirer/prompts';
// Or
// import select, { Separator } from '@inquirer/select';

const state = {
    file: false,
    api: false,
    markdown: false
}

const run = async ( ) =>
{
    let answer = null
    while(answer !== 'exit')
    {
        answer = await doSelector()
    }
}

const doSelector = async ( ) => select({
  message: 'Select an action',
  choices: [
    {
        "name": "clear",
        "value": "clear",
        "disabled": false,
        "description": "clear the console"
    },
    {
        "name": "delete",
        "value": "delete",
        "disabled": "- run fetch first",
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
        "disabled": "- run fetch|read first",
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
        "disabled": "- run parse first",
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
        "disabled": "- run fetch|read|parse first",
        "description": "write raw projects and tasks to file"
    }
]});

run()