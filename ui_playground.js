import { select, Separator } from '@inquirer/prompts';

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
        actions[answer]()
    }
}

const actions = {
    "clear": () => { console.clear() },
    "delete": () => { console.log('deleted.') },
    "exit": () => 
    {
        console.clear()
        process.exit(0)
    },
    "fetch": () => { state.api = true },
    "markdown": () => { console.log('marked down.')},
    "parse": () => { state.markdown = true },
    "push": () => { console.log('pushed.') },
    "read": () => {state.file = true },
    "write": () => { console.log('written.')}
}

const getChoices = () =>
    [
        {
            "name": "clear",
            "value": "clear",
            "disabled": false,
            "description": "clear the console"
        },
        {
            "name": "delete",
            "value": "delete",
            "disabled": state.api ? false : "- run fetch first",
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
            "disabled": state.api || state.file ? false : "- run fetch|read first",
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
            "disabled": state.markdown ? false : "- run parse first",
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
            "disabled": state.api ? false : "- run fetch|read|parse first",
            "description": "write raw projects and tasks to file"
        }
    ]

const doSelector = async ( ) => select({
  message: 'Select an action',
  choices: getChoices()
});

run()