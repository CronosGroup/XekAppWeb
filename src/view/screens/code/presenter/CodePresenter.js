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
        this.view.progressLoaderStart(0.25)
        const location = await locationManager.requestLocation()
        if (location.permission === 'granted'){
            this.view.progressLoaderStart(0.60)
            const userPersistence = await UserPersistence.getInstance()
            const dataSource = await Datasource.getInstance()
            let access_token = await userPersistence.getAccessToken()
            dataSource.putUserLocation(location.location, access_token).then(value => {
                console.log("putUserLocation", value)
                this.view.hideProgressBar()
                this.view.navigateToResults()
            }).catch(reason => {
                console.log("putUserLocation_error", reason)
                this.view.hideProgressBar()
                this.view.navigateToResults()
            })
        }else{
            this.view.hideProgressBar()
            this.view.navigateToResults()
        }
    }
}

export default CodePresenter;

