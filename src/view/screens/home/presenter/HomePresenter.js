import Datasource from "../../../../data/datasource/Datasource";
import Utils from "../../../utils/Utils";
import UserPersistence from "../../../../data/local/UserPersistence";

class HomePresenter {

    constructor() {
        this.data = []
        this.itemsFilled = []
    }

    setView(view) {
        this.view = view
    }

    async initData() {
        const userPersistence = await UserPersistence.getInstance()
        let access_token = await userPersistence.getAccessToken()
        console.log("getQuestions", "accessToken = ", access_token)
        const dataSource = await Datasource.getInstance()
        dataSource.getNewQuestions(access_token).then(value => {
            this.data = value.rows
            this.view.setItems(this.data)
        }).catch(reason => {
            console.log(reason)
        })
    }

    async postAnswers() {
        if (this.itemsFilled.length !== this.data.length) {
            return
        }
        let answersToSend = this.itemsFilled.map(question => {
            question.answers = question.answers.filter(answer => {
                return answer.selected
            })
            return question
        })
        let body = {"answers": answersToSend}
        const userPersistence = await UserPersistence.getInstance()
        let access_token = await userPersistence.getAccessToken()
        const dataSource = await Datasource.getInstance()
        dataSource.postAnswers(body, access_token).then(value => {
            if (value.successful === true && value.first_submit) {
                this.view.goToPhoneRegistration()
            }else if (value.successful === true && !value.first_submit){
                this.view.goToResults()
            }
        }).catch(reason => {
            console.log(reason)
        })
    }

    itemQuestionPressed(answer) {
        let index = this.data.findIndex(obj => obj.id === answer.idParent)
        let question = this.data[index]
        let answers = question.answers
        if (question.type === Utils.TypesEnum.SELECT || question.type === Utils.TypesEnum.YES_NO) {
            answers = answers.map(item => {
                item.selected = false
                return item
            })
        }
        let indexAnswer = answers.findIndex(obj => obj.id === answer.id)
        let answerToChange = answers[indexAnswer]
        answerToChange.selected = !answerToChange.selected
        answers[indexAnswer] = answerToChange
        question.answers = answers
        let hasAnyItemSelected = question.answers.find(item => item.selected)
        if (typeof hasAnyItemSelected === undefined) {
            let indexQuestion = this.itemsFilled.findIndex(obj => obj.id === question.id)
            if (indexQuestion !== -1) {
                this.itemsFilled.splice(indexQuestion, 1);
            }
        } else {
            let indexQuestion = this.itemsFilled.findIndex(obj => obj.id === question.id)
            if (indexQuestion === -1) {
                this.itemsFilled.push(question)
            } else {
                this.itemsFilled[indexQuestion] = question
            }
        }
        if (this.itemsFilled.length === this.data.length) {
            this.view.enableButtonToSendPoll()
        } else {
            this.view.disableButtonToSendPoll()
        }
    }
}

export default HomePresenter;
