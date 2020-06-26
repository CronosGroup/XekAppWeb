import UserPersistence from "../../../../data/local/UserPersistence";
import Datasource from "../../../../data/datasource/Datasource";
import languages from "../../../utils/languages/AppLocalization";
import Utils from "../../../utils/Utils";
import locationManager from "../../../utils/location/LocationManager";

class ResultsPresenter {

    setView(view) {
        this.view = view
    }

    setLevel(level){
        let items = []
        if(level === Utils.Levels.low.valueOf()){
            items.push({title:languages.getLocalized("results_low_item_1"), level:1})
            items.push({title:languages.getLocalized("results_low_item_2"), level:1})
            items.push({title:languages.getLocalized("results_low_item_3"), level:1})
            items.push({title:languages.getLocalized("results_low_item_4"), level:1})
            this.view.setLowStatus()
        }else if(level === Utils.Levels.medium.valueOf()) {
            items.push({title:languages.getLocalized("results_medium_item_1"), level:2})
            items.push({title:languages.getLocalized("results_medium_item_2"), level:2})
            items.push({title:languages.getLocalized("results_medium_item_3"), level:2})
            items.push({title:languages.getLocalized("results_medium_item_4"), level:2})
            this.view.setMediumStatus()
        }else if(level === Utils.Levels.high.valueOf()){
            items.push({title:languages.getLocalized("results_high_item_1"), level:3})
            items.push({title:languages.getLocalized("results_high_item_2"), level:3})
            items.push({title:languages.getLocalized("results_high_item_3"), level:3})
            this.view.setHighStatus()
        }else {
            items.push({title:languages.getLocalized("results_infected_item_1"), level:4})
            items.push({title:languages.getLocalized("results_infected_item_2"), level:4})
            items.push({title:languages.getLocalized("results_infected_item_3"), level:4})
            items.push({title:languages.getLocalized("results_infected_item_4"), level:4})
            items.push({title:languages.getLocalized("results_infected_item_5"), level:4})
            items.push({title:languages.getLocalized("results_infected_item_6"), level:4})
            items.push({title:languages.getLocalized("results_infected_item_7"), level:4})
            items.push({title:languages.getLocalized("results_infected_item_8"), level:4})
            this.view.setInfectedStatus()
        }
        this.view.setItems(items)
    }

    async initData() {
        const userPersistence = await UserPersistence.getInstance()
        const dataSource = await Datasource.getInstance()
        let access_token = await userPersistence.getAccessToken()
        dataSource.getResults(access_token).then(value => {
            this.setLevel(value.level)
            }).catch(reason => {
            console.log(reason)
        })
        dataSource.getUser(access_token).then(value => {
            this.view.setName(value.name)
        }).catch(reason => {
            console.log(reason)
        })
    }

    async validateLocation(){
        this.view.setDisableStatusButton(true)
        this.view.progressLoaderStart(0.25)
        const location = await locationManager.requestLocation()
        console.log("location", location)
        if (location.permission === 'granted'){
            this.view.progressLoaderStart(0.60)
            const userPersistence = await UserPersistence.getInstance()
            const dataSource = await Datasource.getInstance()
            let access_token = await userPersistence.getAccessToken()
            dataSource.putUserLocation(location.location, access_token).then(value => {
                console.log("putUserLocation", value)
                this.view.hideProgressBar()
                this.view.setDisableStatusButton(false)
                this.view.navigateToMap()
            }).catch(reason => {
                console.log("putUserLocation_error", reason)
                this.view.hideProgressBar()
                this.view.setDisableStatusButton(false)
                this.view.showLocationError()
            })
        }else{
            this.view.hideProgressBar()
            this.view.setDisableStatusButton(false)
            this.view.showLocationNoAllowError()
        }
    }
}

export default ResultsPresenter
