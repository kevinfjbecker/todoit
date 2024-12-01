export default class ApiConnector
{
    constructor(apiToken)
    {
        this.baseUrl = 'https://api.todoist.com/rest/v2/'

        this.requestHeaders = new Headers()
        this.requestHeaders.append('Authorization', `Bearer ${apiToken}`)
    }

    deleteAllProjects(projects)
    {
        console.log(projects.length)
        projects
        .filter(({is_inbox_project}) => !is_inbox_project)
        .forEach(project => {
            console.log(`Deleting ${project.name}...`)
            this.deleteProject(project.id)
        });
    }

    deleteProject(projectId)
    {
        var requestOptions = {
            method: 'DELETE',
            headers: this.requestHeaders
          }
          
          fetch(`${this.baseUrl}projects/${projectId}`, requestOptions)
            .then(response => console.log('response.status = ', response.status))
            .catch(error => console.log('error', error))
    }

    deleteAllTasks(tasks)
    {
        tasks.forEach(task => {
            console.log(`Deleting ${task.id}...`)
            this.deleteTask(task.id)
        });
    }

    deleteTask(taskId)
    {
        var requestOptions = {
            method: 'DELETE',
            headers: this.requestHeaders
          }
          
          fetch(`${this.baseUrl}tasks/${taskId}`, requestOptions)
            .then(response => console.log('response.status = ', response.status))
            .catch(error => console.log('error', error))
    }

    async fetchProjects()
    {
        var requestOptions = {
            method: 'GET',
            headers: this.requestHeaders
        }
        const response = await fetch(this.baseUrl + 'projects/', requestOptions)
        return response.json()
    }

    async fetchTasks()
    {
        var requestOptions = {
            method: 'GET',
            headers: this.requestHeaders
        }
        
        const response = await fetch(this.baseUrl + 'tasks/', requestOptions)
        return response.json()
    }
}