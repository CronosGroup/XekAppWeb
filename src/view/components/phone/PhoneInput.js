import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import {
    Container,
    Input,
    Icon,
    Item
} from 'native-base'
import Colors from "../../utils/Colors";
import * as Localization from "expo-localization";
import languages from "../../utils/languages/AppLocalization";
import data from './Countries'

class PhoneInput extends Component {

    onChangeText(value) {
        this.props.onChangeText(this.currentCountry.dial_code + value)
    }

    render() {
        let region = this.props.currentCountry !== null ?  this.props.currentCountry : Localization.region
        if(this.props.country !== null){
            this.currentCountry = this.props.country
        }else{
            this.currentCountry = data.filter(
                obj => obj.code === region
            )[0]
        }
        return <View style={styles.container}>
            <Container style={styles.infoContainer}>
                <Item>
                    <Icon
                        onPress={() => this.props.iconPressed()}
                        active
                        name='md-arrow-dropdown'
                        style={styles.iconStyle}
                    />
                    <View><Text>{this.currentCountry.flag}</Text></View>
                    <Input
                        placeholder={languages.getLocalized("recover_phone_phone_placeholder")}
                        placeholderTextColor={Colors.placeholder}
                        keyboardType={'phone-pad'}
                        returnKeyType='done'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={false}
                        onChangeText={(val) => this.onChangeText(val)}
                        style={styles.inputStyle}
                    />
                </Item>
            </Container>
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
        justifyContent: 'left',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },

    iconStyle: {
        color: Colors.primary,
        marginLeft: 0
    },

    inputStyle: {
        flex: 1,
        fontSize: 17,
        color: Colors.textFormItem,
        fontFamily: 'Nunito-Regular',
    },
})

export default PhoneInput;
