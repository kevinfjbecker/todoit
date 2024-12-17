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

    async deleteProject(projectId)
    {
        var requestOptions = {
            method: 'DELETE',
            headers: this.requestHeaders
        }

        const response = await fetch(
            `${this.baseUrl}projects/${projectId}`,
            requestOptions
        )

        console.log(response.statusText)
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
            .then(response =>
                console.log('response.status = ', response.status))
            .catch(error => console.log('error', error))
    }

    async fetchProjects()
    {
        var requestOptions = {
            method: 'GET',
            headers: this.requestHeaders
        }
        const response =
            await fetch(this.baseUrl + 'projects/', requestOptions)

        return response.json()
    }

    async fetchTasks()
    {
        const requestOptions = {
            method: 'GET',
            headers: this.requestHeaders
        }
        
        const response = await fetch(this.baseUrl + 'tasks/', requestOptions)
        return response.json()
    }

    async postProject(project)
    {
        
        const postHeaders = new Headers(this.requestHeaders)
        postHeaders.append('Content-Type', 'application/json')

        const body = {
            name: project.name
        }
    
        const response = await fetch(this.baseUrl + 'projects/', {
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify(body)
        })

        return response
    }

    async postTask(task)
    {
        const postHeaders = new Headers(this.requestHeaders)
        postHeaders.append('Content-Type', 'application/json')

        const body = {
            content: task.content,
            project_id: task.project_id
        }
    
        const response = await fetch(this.baseUrl + 'tasks/', {
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify(body)
        })

        return response
    }

    async uploadProject(project)
    {
        const projectResponse = await this.postProject(project)
        const projectResponseJson = await projectResponse.json()

        project.id = projectResponseJson.id

        project.tasks.forEach(async task =>
        {
            task.project_id = project.id

            const taskResponse = await this.postTask(task)
            const taskResponseJson = await taskResponse.json()

            task.id = taskResponseJson.id

            task.subtasks.forEach(async subtask =>
            {
                subtask.project_id = project.id
                subtask.parent_id = task.id

                const subtaskResponse = await this.postTask(subtask)
                console.log(subtaskResponse.statusText)
            })

        })
    }

}
