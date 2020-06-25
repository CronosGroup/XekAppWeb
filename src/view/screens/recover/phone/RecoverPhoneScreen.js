import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import {isMobileOnly} from 'react-device-detect';
import Colors from "../../../utils/Colors";
import {isValidPhoneNumber} from 'react-phone-number-input'
import {Snackbar} from "react-native-paper";
import BackButton from "../../../components/BackButton";
import RecoverPhonePresenter from "./presenter/RecoverPhonePresenter";
import languages from "../../../utils/languages/AppLocalization";
import CustomPhoneInput from '../../../components/phone/PhoneInput'

class RecoverPhoneScreen extends Component {

    constructor(props) {
        super(props)
        this.presenter = new RecoverPhonePresenter()
        this.presenter.setView(this)
        this.state = {
            enableToSend: false,
            phoneError: false,
            errorBackend: false,
            snackColor: Colors.red,
            message: '',
            phone: '',
            country: null,
        }
    }

    showBackendError() {
        this.setState({
            errorBackend: true,
            message: ' An error did happen please try again later.',
            snackColor: Colors.red
        })
    }

    navigateToCode() {
        this.props.navigation.navigate('RecoverCode')
    }

    _onCallBack(country) {
        this.setState({country: country})
    }

    render() {
        let color = this.state.enableToSend ? Colors.buttonEnable : Colors.disable
        return <View style={styles.mainContainer}>

                <View style={styles.container}>
                    <BackButton onClick={() => {
                        this.props.navigation.goBack()
                    }}/>

                    <Image
                        style={styles.icon}
                        source={require('../../../../../assets/logo.png')}/>

                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container_scrollView}>

                        <Text style={styles.title}>{languages.getLocalized("recover_phone_title")}</Text>

                        <Text style={styles.subTitle}>{languages.getLocalized("recover_phone_subtitle")}</Text>

                        <View style={styles.textInputContainer}>
                            <CustomPhoneInput country={this.state.country}
                                              onChangeText={(phone => {
                                this.setState({
                                    phoneError: !isValidPhoneNumber(phone),
                                    enableToSend: isValidPhoneNumber(phone),
                                    phone: phone
                                })
                            })}
                                              iconPressed={() => this.props.navigation.navigate('CountrySelector', {callback: this._onCallBack.bind(this)})}
                            />
                        </View>
                        {this.state.phoneError ?
                            <Text style={styles.error}>{languages.getLocalized("recover_phone_error")}</Text> : null}

                        <Text style={styles.message}>{languages.getLocalized("recover_phone_secure_message")}</Text>
                    </ScrollView>

                    <TouchableOpacity disabled={!this.state.enableToSend} activeOpacity={0.7}
                                      style={[styles.button, {backgroundColor: color}]}
                                      onPress={() => this.presenter.savePhone(this.state.phone)}>
                        <Text style={styles.buttonText}>{languages.getLocalized("recover_phone_send_code")}</Text>
                    </TouchableOpacity>
                    <Snackbar
                        visible={this.state.errorBackend}
                        onDismiss={() => this.setState({errorBackend: false})}
                        duration={3000}
                        style={{backgroundColor: this.state.snackColor}}>
                        {this.state.message}
                    </Snackbar>
                </View>
            </View>
    }
}

const styles = StyleSheet.create({

    mainContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.white,
    },

    container: {
        width: isMobileOnly ? '100%' : '60%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.white,
    },

    icon: {
        marginTop: 40,
        width: 180,
        height: 55,
    },

    scrollView: {
        width: '100%',
    },

    container_scrollView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    title: {
        textAlign: "center",
        width: '90%',
        fontSize: 16,
        fontFamily: 'Nunito-Bold',
        marginTop: 25,
        color: Colors.buttonEnable
    },

    subTitle: {
        textAlign: "left",
        width: '90%',
        fontSize: 18,
        fontFamily: 'Nunito-Regular',
        marginTop: 30,
        color: Colors.buttonEnable
    },

    message: {
        textAlign: "left",
        width: '90%',
        fontSize: 14,
        fontFamily: 'Nunito-Regular',
        marginTop: 80,
        color: Colors.buttonEnable
    },

    textInputContainer: {
        width: "90%",
        borderBottomWidth: 2,
        borderColor: Colors.primary,
        marginTop: 60,
        padding: 5
    },

    textInput: {
        width: "100%",
        height: 35,
    },

    errorPhone: {
        width: "90%",
        marginTop: 5,
        fontSize: 12,
        color: Colors.red
    },

    button: {
        justifyContent: 'center',
        width: '90%',
        height: 66,
        padding: 10,
        borderRadius: 6,
        backgroundColor: Colors.buttonEnable,
        position: "absolute",
        bottom: 15,
    },

    buttonText: {
        fontFamily: 'Nunito-Bold',
        textAlign: "center",
        fontSize: 18,
        color: Colors.white,
    },

    error: {
        width: "90%",
        marginTop: 5,
        fontSize: 12,
        color: Colors.red
    },
});

export default RecoverPhoneScreen;
