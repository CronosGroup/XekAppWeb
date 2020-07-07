import UserPersistence from "../../../../data/local/UserPersistence";
import Datasource from "../../../../data/datasource/Datasource";
import {Keyboard} from "react-native";

const ERROR_ACCOUNT_ALREADY_EXIST = "1002"

class PhonePresenter {

    setView(view) {
        this.view = view
    }

    async savePhone(phone){
        console.debug(phone)
        Keyboard.dismiss()
        const userPersistence = await UserPersistence.getInstance()
        const dataSource = await Datasource.getInstance()
        let access_token = await userPersistence.getAccessToken()
        let body = {"phone": phone}
        dataSource.postPhoneNumber(body, access_token).then(value => {
            console.debug("savePhone", value)
            if (value.code === undefined) {
                this.view.navigateToCode()
            } else if(value.type === ERROR_ACCOUNT_ALREADY_EXIST ){
                this.view.showModalBackendError()
            }else{
                this.view.showBackendError()
            }
        }).catch(reason => {
            console.debug(reason)
        })
    }
}

export default PhonePresenter;

