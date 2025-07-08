export default class ApiConnector
{
    constructor(apiToken)
    {
        this.baseUrl = 'https://api.todoist.com/rest/v2/'

        this.requestHeaders = new Headers()
        this.requestHeaders.append('Authorization', `Bearer ${apiToken}`)

    }

    async deleteAllProjects(projects)
    {
        console.log(projects.length)
        const projectsToDelete = projects.filter(project =>
            ! project.is_inbox_project
        )
            
        for(const project of projectsToDelete)
        {
            console.log(`Deleting ${project.name}...`)
            await this.deleteProject(project.id)
        }
    }

    async deleteProject(projectId)
    {
        const requestOptions = {
            method: 'DELETE',
            headers: this.requestHeaders
        }

        const response = await fetch(
            `${this.baseUrl}projects/${projectId}`,
            requestOptions
        )

        console.log(response.statusText)
    }

    async deleteAllTasks(tasks)
    {
        for(const task of tasks)
        {
            console.log(`Deleting ${task.id}...`)
            await this.deleteTask(task.id)
        }
    }

    async deleteTask(taskId)
    {
        const requestOptions = {
            method: 'DELETE',
            headers: this.requestHeaders
        }

        const response = await fetch(
            `${this.baseUrl}tasks/${taskId}`,
            requestOptions
        )

        console.log('response.status = ', response.status)
    }

    async fetchProjects()
    {
        const requestOptions = {
            method: 'GET',
            headers: this.requestHeaders
        }

        const response = await fetch(
            this.baseUrl + 'projects/',
            requestOptions
        )

        return response.json()
    }

    async fetchTasks()
    {
        const requestOptions = {
            method: 'GET',
            headers: this.requestHeaders
        }
        
        const response = await fetch(
            this.baseUrl + 'tasks/',
            requestOptions
        )

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
            description: task.description,
            project_id: task.project_id,
            parent_id: task.parent_id
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

        for(const task of project.tasks)
        {
            task.project_id = project.id

            const taskResponse = await this.postTask(task)
            const taskResponseJson = await taskResponse.json()

            task.id = taskResponseJson.id

            for(const subtask of task.subtasks)
            {
                subtask.project_id = project.id
                subtask.parent_id = task.id

                const subtaskResponse = await this.postTask(subtask)
                console.log(subtaskResponse.statusText)
            }

        }
    }

}
