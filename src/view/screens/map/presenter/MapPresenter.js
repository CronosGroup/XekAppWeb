import UserPersistence from "../../../../data/local/UserPersistence";
import Datasource from "../../../../data/datasource/Datasource";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const radius = 50
const LATITUD_DELTA = 0.0922 / radius
const LONGITUDE_DELTA = 0.0421 / radius

class MapPresenter{

    setView(view){
        this.view = view
    }

    async initData(){
        const permission = await Permissions.askAsync(Permissions.LOCATION)
        if (permission.status === "granted") {
            let location = await Location.getCurrentPositionAsync({})
            this.region = { lat: location.coords.latitude, lng: location.coords.longitude}
            this.view.setRegion(this.region)
        }

        const userPersistence = await UserPersistence.getInstance()
        const dataSource = await Datasource.getInstance()
        let access_token = await userPersistence.getAccessToken()
        dataSource.getArea(access_token).then(value => {
            console.debug(value)
            if(value.code === undefined){
                this.view.setUserLocation({lat: this.region.latitude, lng: this.region.longitude, radius: radius})
                let results = value.results.map(mark => {
                    return {lat : mark.latitude, lng: mark.longitude, level:mark.level}
                })
                this.view.setMarkers(results)
            }
        }).catch(reason => {
            console.debug(reason)
        })
    }
}

export default MapPresenter;
