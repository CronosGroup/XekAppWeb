import * as Facebook from 'expo-facebook';
import { Keyboard } from 'react-native'
import Datasource from "../../../../data/datasource/Datasource";
import UserPersistence from "../../../../data/local/UserPersistence";
import Utils from "../../../utils/Utils";

class LoginPresenter {

    constructor() {
        this.gender = -1
    }

    setView(view) {
        this.view = view
    }

    async logInByFacebook() {
        Keyboard.dismiss()
        try {
            await Facebook.initializeAsync("241987760207264");
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            })
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                const name = (await response.json()).name
                console.debug('Facebook user name:', name)
            } else {
                console.debug('Facebook Error')
            }
        } catch ({ message }) {
            console.debug('Facebook Login Error:', message)
        }

        this.view.closeDialog()
    }

    setMaleGender(value){
        this.gender = value ? Utils.Gender.male.valueOf()  : -1
    }

    setFemaleGender(value){
        console.debug("value", value)
        this.gender = value ?  Utils.Gender.female.valueOf() : -1
    }

    async logWithName(name, lastName){
        Keyboard.dismiss()
        console.debug(name, this.gender)
        if(name.length === 0){
            this.view.showNameError()
        }if (lastName.length ===0){
            this.view.showLastNameError()
        } else if(this.gender === -1){
            this.view.showGenderError()
        }else {
            const userPersistence = await UserPersistence.getInstance()
            let body = {"name":name+" "+lastName, "gender":this.gender}
            console.debug(body)
            const dataSource = await Datasource.getInstance()
            dataSource.postUserName(body).then(value => {
                console.debug(value)
                if(value.code === undefined) {
                    userPersistence.saveUserInfo(value)
                    this.view.gotoForm()
                }else {
                   this.view.showUnknownError()
                }
            }).catch(reason => {
                console.debug(reason)
            })
        }
    }
}

export default LoginPresenter;

