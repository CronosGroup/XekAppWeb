import UserPersistence from "../../../../data/local/UserPersistence";
import Datasource from "../../../../data/datasource/Datasource";

const INVALID_TOKEN_ERROR= "1004"

class WelcomePresenter {

    setView(view) {
        this.view = view
    }

    async initData() {
        const userPersistence = await UserPersistence.getInstance()
        await userPersistence.clear()

        let hasSession = await userPersistence.hasSession()
        if (hasSession) {
            const dataSource = await Datasource.getInstance()
            let access_token = await userPersistence.getAccessToken()
            let body = {"access_token": access_token}
            dataSource.postCheck(body).then(value => {
                console.debug("postCheck", value)
                if (value.type === undefined) {
                    if (value.access_token !== 'valid') {
                        userPersistence.setToken(value.access_token)
                    }
                    if (value.user_status.completed_questions) {
                        this.view.goToResults()
                    }else{
                        this.view.enableNextButton()
                    }
                }else if (value.type !== INVALID_TOKEN_ERROR) {
                    this.view.goToForm()
                }else{
                    this.view.enableNextButton()
                }
            }).catch(reason => {
                console.debug(reason)
            })
        }else{
            this.view.enableNextButton()
        }
    }
}

export default WelcomePresenter
