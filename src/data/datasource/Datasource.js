
import QuestionsResponse from "./model/QuestionsResponse"
import manifest from "../../../app";
import * as Localization from 'expo-localization';
import ApiService from "./ApiService";

class Datasource {

    static _instance;

    static async getInstance() {
        if (!Datasource._instance) {
            Datasource._instance = new Datasource();
        }
        return Datasource._instance;
    }

    async getQuestions() {
        const apiService = await ApiService.getInstance();
        const serviceResponse = await apiService.getQuestions()
        return new QuestionsResponse(serviceResponse)
    }

    async postCheck(body) {
        let language = Localization.locale
        let appVersion = manifest.expo.version
        let jsonBody = JSON.stringify(body)
        const apiService = await ApiService.getInstance();
        return await apiService.postCheck(jsonBody, language, appVersion)
    }

    async postUserName(body) {
        let language = Localization.locale
        let jsonBody = JSON.stringify(body)
        const apiService = await ApiService.getInstance();
        return await apiService.postUserName(jsonBody, language)
    }

    async putUserLocation(body,  accessToken) {
        let language = Localization.locale
        let jsonBody = JSON.stringify(body)
        const apiService = await ApiService.getInstance();
        return await apiService.putUserLocation(jsonBody, language, accessToken)
    }

    async getNewQuestions(accessToken) {
        let language = Localization.locale
        const apiService = await ApiService.getInstance();
        const serviceResponse = await apiService.getNewQuestions(language, accessToken)
        return new QuestionsResponse(serviceResponse)
    }

    async postAnswers(body, accessToken) {
        let language = Localization.locale
        let jsonBody = JSON.stringify(body)
        const apiService = await ApiService.getInstance();
        return await apiService.postAnswers(jsonBody, language, accessToken)
    }

    async postPhoneNumber(body, accessToken) {
        let language = Localization.locale
        let jsonBody = JSON.stringify(body)
        const apiService = await ApiService.getInstance();
        return await apiService.postPhoneNumber(jsonBody, language, accessToken)
    }

    async getCodeValidation(code, accessToken) {
        let language = Localization.locale
        const apiService = await ApiService.getInstance();
        return await apiService.getCodeValidation(code, language, accessToken)
    }

    async getResults(accessToken) {
        let language = Localization.locale
        const apiService = await ApiService.getInstance();
        return await apiService.getResults(language, accessToken)
    }

    async getUser(accessToken) {
        let language = Localization.locale
        const apiService = await ApiService.getInstance();
        return await apiService.getUser(language, accessToken)
    }

    async postRecover(body) {
        let language = Localization.locale
        let jsonBody = JSON.stringify(body)
        const apiService = await ApiService.getInstance();
        return await apiService.postRecover(jsonBody, language)
    }

    async getRecover(code) {
        let language = Localization.locale
        const apiService = await ApiService.getInstance();
        return await apiService.getRecover(code, language)
    }

    async getArea(accessToken) {
        let language = Localization.locale
        const apiService = await ApiService.getInstance();
        return await apiService.getArea(language, accessToken)
    }
}

export default Datasource;
