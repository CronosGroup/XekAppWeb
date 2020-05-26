import manifest from "../../../../app.json";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

class LocationManager {

    async requestLocation() {
        const permission = await Permissions.askAsync(Permissions.LOCATION)
        if (permission.status === "granted") {
            Location.setApiKey(manifest.expo.extra.maps.apiKey)
            let location = await Location.getCurrentPositionAsync({})
            let coords = {latitude: location.coords.latitude, longitude: location.coords.longitude}
            let geoLocal = await Location.reverseGeocodeAsync(coords).catch(reason => {
                console.log("reverseGeocodeAsync error", reason)
            })
            if (geoLocal !== undefined && geoLocal.length > 0) {
                let address = geoLocal[0]
                let city = address.city
                let country = address.country
                return { permission: "granted", location: {city: city, country: country,
                    latitude: coords.latitude, longitude: coords.longitude}}
            } else {
                return { permission: "granted",  error: "reverse geocode fail"}
            }
        } else {
            return { permission: "no granted"}
        }
    }
}

const locationManager = new LocationManager()
export default locationManager;
