import UserPersistence from "../../../../data/local/UserPersistence";
import Datasource from "../../../../data/datasource/Datasource";
import {Keyboard} from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Utils from "../../../utils/Utils";

class EmailPresenter {

    setView(view) {
        this.view = view
    }

    setEmail(email) {
        if (!Utils.validateEmail(email)) {
            this.view.showErrorEmail()
        } else {
            this.email = email
            this.view.enableSendEmail()
        }
    }

    async sendEmail() {
        Keyboard.dismiss()
        const userPersistence = await UserPersistence.getInstance()
        const dataSource = await Datasource.getInstance()
        let access_token = await userPersistence.getAccessToken()
        /*dataSource.getCodeValidation(this.code, access_token).then(value => {
            console.debug("sendCode", value)
            if (value.code === undefined) {
                this.allowGeoLocation()
            } else {
                this.view.showBackendError()
            }
        }).catch(reason => {
            console.debug(reason)
        })*/
    }
}

export default EmailPresenter;

