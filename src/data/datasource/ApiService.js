import Questions from "../../resources/Questions";
import manifest from "../../../app.json"

class ApiService {

    static base_Url = manifest.expo.extra.urlProd+"/v1/"
    static questionsEndpoint = 'questions'
    static checkEndpoint = 'check'
    static usersEndpoint = 'users'
    static validationEndpoint = 'validation'
    static resultsEndpoint = 'results'
    static recoverEndpoint = 'users/recover'
    static areaEndpoint = 'results/area'

    static _instance;

    static async getInstance() {
        if (!ApiService._instance) {
            ApiService._instance = new ApiService();
        }
        return ApiService._instance;
    }

    getHeaders(language:String, appVersion:String = null, accessToken:String = null): Headers{
        let headers = new Headers({
            'Accept-Language': language,
            'Content-Type': 'application/json',
         })
        if(accessToken !== null){
            headers.append("Authorization", accessToken)
        }
        if(appVersion !== null){
            headers.append('App-Version', appVersion)
        }
      return headers
    }

   async getQuestions() {
        return Questions
    }

    async postCheck(body, language, appVersion) {
        const url = ApiService.base_Url+ApiService.checkEndpoint
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: this.getHeaders(language, appVersion, null),
                body: body});
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async postUserName(body, language) {
        const url = ApiService.base_Url+ApiService.usersEndpoint
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: this.getHeaders(language, null, null),
                body: body});
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async putUserLocation(body, language, accessToken) {
        const url = ApiService.base_Url+ApiService.usersEndpoint
        try {
            const response = await fetch(url, {
                method: 'put',
                headers: this.getHeaders(language, null, accessToken),
                body: body});
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getNewQuestions(language, accessToken) {
        const url = ApiService.base_Url+ApiService.questionsEndpoint
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: this.getHeaders(language, null, accessToken)});
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async postAnswers(body, language, accessToken) {
        const url = ApiService.base_Url+ApiService.questionsEndpoint
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: this.getHeaders(language, null, accessToken),
                body: body});
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async postPhoneNumber(body, language, accessToken) {
        const url = ApiService.base_Url+ApiService.validationEndpoint
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: this.getHeaders(language, null, accessToken),
                body: body});
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getCodeValidation(code, language, accessToken) {
        const url = ApiService.base_Url+ApiService.validationEndpoint+"/"+code
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: this.getHeaders(language, null, accessToken)});
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getResults(language, accessToken) {
        const url = ApiService.base_Url+ApiService.resultsEndpoint
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: this.getHeaders(language, null, accessToken)})
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getUser(language, accessToken) {
        const url = ApiService.base_Url+ApiService.usersEndpoint
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: this.getHeaders(language, null, accessToken)})
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async postRecover(body, language) {
        const url = ApiService.base_Url+ApiService.recoverEndpoint
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: this.getHeaders(language, null, null),
                body: body})
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getRecover(code, language) {
        const url = ApiService.base_Url+ApiService.recoverEndpoint+"/"+code
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: this.getHeaders(language, null, null)})
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getArea(language, accessToken) {
        const url = ApiService.base_Url+ApiService.areaEndpoint
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: this.getHeaders(language, null, accessToken)})
            return response.json()
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export default ApiService;
