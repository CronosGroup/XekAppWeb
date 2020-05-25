import UserPersistence from "../../../../data/local/UserPersistence";
import Datasource from "../../../../data/datasource/Datasource";
import languages from "../../../utils/languages/AppLocalization";
import Utils from "../../../utils/Utils";

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
}

export default ResultsPresenter
