import Datasource from "../../../../../data/datasource/Datasource";
import {Keyboard} from "react-native";

const ERROR_ACCOUNT_NO_EXIST = "1000"

class RecoverPhonePresenter {

    setView(view) {
        this.view = view
    }

    async savePhone(phone){
        Keyboard.dismiss()
        const dataSource = await Datasource.getInstance()
        let body = {"phone": phone}
        console.log("body", body)
        dataSource.postRecover(body).then(value => {
            console.log("savePhone", value)
            if (value.code === undefined) {
                this.view.navigateToCode()
            } else if(value.type === ERROR_ACCOUNT_NO_EXIST){
                this.view.showModalBackendError()
            }else{
                this.view.showBackendError()
            }
        }).catch(reason => {
            console.log(reason)
        })
    }
}

export default RecoverPhonePresenter;

