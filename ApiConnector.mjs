export default class ApiConnector
{
    constructor(apiToken)
    {
        this.baseUrl = 'https://api.todoist.com/rest/v2/'

        this.requestHeaders = new Headers()
        this.requestHeaders.append('Authorization', `Bearer ${apiToken}`)
    }

    async fetchProjects()
    {
        var requestOptions = {
            method: 'GET',
            headers: this.requestHeaders
        }
        const response = await fetch(this.baseUrl + 'projects/', requestOptions)
        return response.text()
    }

    async fetchTasks()
    {
        var requestOptions = {
            method: 'GET',
            headers: this.requestHeaders
        }
        
        const response = await fetch(this.baseUrl + 'tasks/', requestOptions)
        return response.text()
    }
}