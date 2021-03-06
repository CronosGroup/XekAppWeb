import UserPersistence from "../../../../data/local/UserPersistence";
import Datasource from "../../../../data/datasource/Datasource";
import {Keyboard} from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

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
            console.debug("sendCode", value)
            if (value.code === undefined) {
                this.allowGeoLocation()
            } else {
                this.view.showBackendError()
            }
        }).catch(reason => {
            console.debug(reason)
        })
    }

    async allowGeoLocation() {
        const permission = await Permissions.askAsync(Permissions.LOCATION)
        if (permission.status === "granted") {
            let location = await Location.getCurrentPositionAsync({})
            let coords = { latitude: location.coords.latitude, longitude: location.coords.longitude }
            let geoLocal = await Location.reverseGeocodeAsync(coords)
            if(geoLocal.length > 0){
                let address = geoLocal[0]
                let city = address.city
                let country = address.country
                let body = { "city": city, "country": country,
                    "latitude": coords.latitude,
                    "longitude": coords.longitude}
                const userPersistence = await UserPersistence.getInstance()
                const dataSource = await Datasource.getInstance()
                let access_token = await userPersistence.getAccessToken()
                dataSource.putUserLocation(body, access_token).then(value => {
                    console.debug("putUserLocation", value)
                    this.view.navigateToResults({
                        longitude: coords.latitude,
                        latitude: coords.longitude
                    })
                }).catch(reason => {
                    console.error(reason)
                })
            }
        }else {
            this.view.navigateToResults({
                longitude: 0,
                latitude: 0
            })
        }
    }
}

export default CodePresenter;

