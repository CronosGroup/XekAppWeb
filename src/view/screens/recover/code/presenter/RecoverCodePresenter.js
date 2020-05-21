import UserPersistence from "../../../../../data/local/UserPersistence";
import Datasource from "../../../../../data/datasource/Datasource";
import {Keyboard} from "react-native";

class RecoverCodePresenter {

    setView(view) {
        this.view = view
    }

    setCode(code) {
        if (code.length === 0 || code.length < 6 || isNaN(code)) {
            this.view.showErrorCode()
            if(code.length > 0){
                this.view.hidePlaceHolderView()
            }else if (code.length === 0){
                this.view.showPlaceHolderView()
            }
        } else {
            this.code = code
            this.view.hidePlaceHolderView()
            this.view.enableSendCode()
        }
    }

    async sendCode() {
        Keyboard.dismiss()
        const userPersistence = await UserPersistence.getInstance()
        const dataSource = await Datasource.getInstance()
        dataSource.getRecover(this.code).then(value => {
            console.debug(value)
            if (value.code === undefined) {
                userPersistence.saveUserInfo(value)
                this.view.navigateToResults()
            } else {
                this.view.showBackendError()
            }
        }).catch(reason => {
            console.debug(reason)
        })
    }
}

export default RecoverCodePresenter;

