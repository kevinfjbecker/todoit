
import fs from 'fs'

const getDateString = (d) =>
    d.getFullYear() +
    ('' + (d.getMonth()+1)).padStart(2,'0') +
    d.getDate()

const todaysTaskFilePath = `./data/tasks_${getDateString(new Date())}.json`
const todaysProjectFilePath = `./data/projects_${getDateString(new Date())}.json`

const secrets = JSON.parse(fs.readFileSync('secrets.json'))

const getHeaders = () =>
{
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${secrets.apiToken}`)
  return myHeaders
}

const saveTasks = (taskList) => fs.writeFileSync(todaysTaskFilePath, taskList)
const saveProjects = (projectList) => fs.writeFileSync(todaysProjectFilePath, projectList)

const openTasks = (path) => JSON.parse(fs.readFileSync(path || todaysTaskFilePath))

const openProjects = (path) => JSON.parse(fs.readFileSync(path || todaysProjectFilePath))

const deleteTask = (taskId) =>
{
  var requestOptions = {
    method: 'DELETE',
    headers: getHeaders()
  }
  
  fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}`, requestOptions)
    .then(response => console.log('response.status = ', response.status))
    .catch(error => console.log('error', error))
}

const fetchTasks = () =>
{
  var requestOptions = {
    method: 'GET',
    headers: getHeaders()
  }
  
  fetch('https://api.todoist.com/rest/v2/tasks/', requestOptions)
    .then(response => response.text())
    .then(result => saveTasks(result))
    .catch(error => console.log('error', error))
}

const fetchProjects = () =>
{
  var requestOptions = {
    method: 'GET',
    headers: getHeaders()
  }
  
  fetch('https://api.todoist.com/rest/v2/projects/', requestOptions)
    .then(response => response.text())
    .then(result => saveProjects(result))
    .catch(error => console.log('error', error))
}

/**
 * Delete all of the tasks from today's fetch
 */
// const tasks = openTasks()
// tasks.forEach(element => {
//   deleteTask(element.id)
// });

/**
 * Get all of the Tasks from Todoist
 */
// fetchTasks()

/**
 * Get all of the Projects
 */
// fetchProjects()

const projects = openProjects()
console.table(projects)
// todo: topologically sort the projects
// todo: loop the deletion

console.log('(⌐■_■)')
