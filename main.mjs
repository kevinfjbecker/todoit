
import fs from 'fs'

const secrets = JSON.parse(fs.readFileSync('secrets.json'))

const saveTasks = (taskList) => fs.writeFileSync('./data/tasks.json', taskList)

var myHeaders = new Headers()
myHeaders.append("Authorization", "Bearer " + secrets.apiToken)

var requestOptions = {
  method: 'GET',
  headers: myHeaders
}

fetch("https://api.todoist.com/rest/v2/tasks/", requestOptions)
  .then(response => response.text())
  .then(result => saveTasks(result))
  .catch(error => console.log('error', error))

