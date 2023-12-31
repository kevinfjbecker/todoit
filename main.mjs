
import fs from 'fs'

const secrets = JSON.parse(fs.readFileSync('secrets.json'))

const getHeaders = () =>
{
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${secrets.apiToken}`)
  return myHeaders
}

const saveTasks = (taskList) => fs.writeFileSync('./data/tasks.json', taskList)

const openTasks = () => JSON.parse(fs.readFileSync('./data/tasks.json'))

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

// const tasks = openTasks()

// tasks.forEach(element => {
//   deleteTask(element.id)
// });

fetchTasks()