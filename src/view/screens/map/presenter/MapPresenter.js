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
            this.region = { latitude: location.coords.latitude, longitude: location.coords.longitude,
                latitudeDelta : LATITUD_DELTA, longitudeDelta: LONGITUDE_DELTA}
            this.view.setRegion(this.region)
        }

        //Only for test
        //this.view.setRegion({lat: 37.762391, lng: -122.439192})
        //this.view.setMarkers([{lat: 37.762391, lng: -122.439192}, {lat: 37.759703, lng: -122.428093}])

        const userPersistence = await UserPersistence.getInstance()
        const dataSource = await Datasource.getInstance()
        let access_token = await userPersistence.getAccessToken()
        dataSource.getArea(access_token).then(value => {
            console.debug(value)
            if(value.code === undefined){
                this.view.setUserLocation({latitude: this.region.latitude, longitude: this.region.longitude, radius: radius})
                this.view.setMarkers(value.results)
            }
        }).catch(reason => {
            console.debug(reason)
        })
    }
}

export default MapPresenter;
