import {Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AsyncStorage } from 'react-native';

class UserPersistence{

    static accessTokenKey = "access_token"
    static userIdKey = "user_id"
    static userInfoKey = "user_info"

    static _instance;

    static async getInstance() {
        if (!UserPersistence._instance) {
            UserPersistence._instance = new UserPersistence();
        }
        return UserPersistence._instance;
    }

    async clear(){
        if (Platform.OS === 'web') {
            await AsyncStorage.removeItem(UserPersistence.userInfoKey)
        }else{
            await SecureStore.deleteItemAsync(UserPersistence.userInfoKey)
        }
    }

    async saveUserInfo(data){
        let jsonString = JSON.stringify(data)
        if (Platform.OS === 'web') {
            await AsyncStorage.setItem(UserPersistence.userInfoKey, jsonString)
        }else{
            await SecureStore.setItemAsync(UserPersistence.userInfoKey, jsonString)
        }
    }

    async setToken(token){
        let data;
        if (Platform.OS === 'web') {
            data = await AsyncStorage.getItem(UserPersistence.userInfoKey)
        }else{
            data = await SecureStore.getItemAsync(UserPersistence.userInfoKey)
        }
        let jsonData = JSON.parse(data)
        jsonData.access_token = token
        this.saveUserInfo(jsonData)
    }

    async getAccessToken():string{
        let data;
        if (Platform.OS === 'web') {
            data = await AsyncStorage.getItem(UserPersistence.userInfoKey)
        }else{
            data = await SecureStore.getItemAsync(UserPersistence.userInfoKey)
        }
        return  data == null ? "" : JSON.parse(data).access_token
    }

   async hasSession():boolean{
       let data;
       if (Platform.OS === 'web') {
           data = await AsyncStorage.getItem(UserPersistence.userInfoKey)
       }else{
           data = await SecureStore.getItemAsync(UserPersistence.userInfoKey)
       }
      return  data !== null
    }
}

export default UserPersistence;
