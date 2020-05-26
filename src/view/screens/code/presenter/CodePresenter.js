import UserPersistence from "../../../../data/local/UserPersistence";
import Datasource from "../../../../data/datasource/Datasource";
import {Keyboard} from "react-native";
import locationManager from "../../../utils/location/LocationManager";

class CodePresenter {

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
        let access_token = await userPersistence.getAccessToken()
        dataSource.getCodeValidation(this.code, access_token).then(value => {
            console.log("sendCode", value)
            if (value.code === undefined) {
                this.allowGeoLocation()
            } else {
                this.view.showBackendError()
            }
        }).catch(reason => {
            console.log(reason)
        })
    }

    async allowGeoLocation(){
        const location = await locationManager.requestLocation()
        if (location.permission === 'granted'){
            if (location.error === undefined){
                const userPersistence = await UserPersistence.getInstance()
                const dataSource = await Datasource.getInstance()
                let access_token = await userPersistence.getAccessToken()
                dataSource.putUserLocation(location.location, access_token).then(value => {
                    this.view.navigateToResults()
                }).catch(reason => {
                    this.view.navigateToResults()
                })
            }else{
                this.view.navigateToResults()
            }
        }else{
            this.view.navigateToResults()
        }
    }
}

export default CodePresenter;

