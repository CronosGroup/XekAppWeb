import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native'

import Colors from "../../utils/Colors";
import languages from "../../utils/languages/AppLocalization";
import data from './Countries'

class PhoneInput extends Component {

    onChangeText(value) {
        this.props.onChangeText(this.currentCountry.dial_code + value)
    }

    render() {
        let region = 'US'
        if(this.props.country !== null){
            this.currentCountry = this.props.country
        }else{
            this.currentCountry = data.filter(
                obj => obj.code === region
            )[0]
        }
        return <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity onPress={() =>  this.props.iconPressed()}>
                    <Text>{this.currentCountry.flag}</Text>
                </TouchableOpacity>
                <TextInput
                    placeholder={languages.getLocalized("recover_phone_phone_placeholder")}
                    style={styles.inputStyle}
                    keyboardType={"numeric"}
                    onChangeText={text => this.onChangeText(text)}/>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        flexDirection: 'column'
    },

    infoContainer: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },

    iconStyle: {
        color: Colors.primary,
        marginLeft: 0
    },

    inputStyle: {
        marginLeft: 10,
        flex: 1,
        fontSize: 17,
        color: Colors.textFormItem,
        fontFamily: 'Nunito-Regular',
    },
})

export default PhoneInput;
