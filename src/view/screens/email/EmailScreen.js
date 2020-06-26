import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import Colors from "../../utils/Colors";
import EmailPresenter from "./presenter/EmailPresenter";
import {Snackbar} from "react-native-paper";
import BackButton from "../../components/BackButton";
import languages from "../../utils/languages/AppLocalization";

class EmailScreen extends Component {

    constructor(props) {
        super(props)
        this.phone = null
        this.presenter = new EmailPresenter()
        this.presenter.setView(this)
        this.state = {
            enableToSendEmail: false,
            emailError: false,
            errorBackend: false,
            snackColor: Colors.red,
            message: '',
        }
    }

    showErrorEmail() {
        this.setState({emailError: true, enableToSendEmail: false})
    }

    enableSendEmail() {
        this.setState({emailError: false, enableToSendEmail: true})
    }

    showBackendError() {
        this.setState({
            errorBackend: true,
            message: ' An error did happen please try again later.',
            snackColor: Colors.red
        })
    }

    render() {
        let colorCode = this.state.enableToSendEmail ? Colors.buttonEnable : Colors.disable
        return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <View style={styles.container}>

                <BackButton onClick={() => {
                    this.props.navigation.goBack()
                }}/>

                <Image
                    style={styles.icon}
                    source={require('../../../../assets/logo.png')}/>

                <Text style={styles.title}>{languages.getLocalized("email_title")}</Text>

                <Text style={styles.message}>{languages.getLocalized("email_message")}</Text>

                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder={languages.getLocalized("email_placeholder")}
                        style={styles.textInput} keyboardType={"email-address"}
                        onChangeText={text => this.presenter.setEmail(text)}/>
                </View>
                {this.state.emailError ? <Text style={styles.error}>{languages.getLocalized("email_error")}</Text> : null}

                <Text style={styles.email_message}>{languages.getLocalized("email_verify_message")}</Text>

                <Text style={styles.message_resend}>{languages.getLocalized("email_no_received_yet")}</Text>

                <TouchableOpacity style={styles.resendContainer}
                                  onPress={() => this.presenter.sendEmail()}>
                        <Text style={styles.resend}>{languages.getLocalized("email_resend_action")}</Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={!this.state.enableToSendEmail} activeOpacity={0.7}
                                  style={[styles.button, {backgroundColor: colorCode}]}
                                  onPress={() => this.presenter.sendEmail()}>
                    <Text style={styles.buttonText}>{languages.getLocalized("email_send_action")}</Text>
                </TouchableOpacity>

                <Snackbar
                    visible={this.state.errorBackend}
                    onDismiss={() => this.setState({errorBackend: false})}
                    duration={3000}
                    style={{backgroundColor: this.state.snackColor}}>
                    {this.state.message}
                </Snackbar>
            </View>
        </TouchableWithoutFeedback>
    }
}

const styles = StyleSheet.create({

    container: {
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

    title: {
        textAlign: "center",
        width: '90%',
        fontSize: 16,
        fontFamily:'Nunito-Bold',
        marginTop: 25,
        color: Colors.buttonEnable
    },

    message: {
        textAlign: "left",
        width: '90%',
        fontSize: 18,
        fontFamily:'Nunito-Regular',
        marginTop: 30,
        color: Colors.buttonEnable
    },

    email_message: {
        textAlign: "left",
        width: '90%',
        fontSize: 14,
        fontFamily:'Nunito-Regular',
        marginTop: 35,
        color: Colors.buttonEnable
    },

    placeHolderContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        position: "absolute",
        right: 0,
        left: 10
    },

    textInputContainer: {
        width: "90%",
        borderBottomWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 4,
        marginTop: 60,
        padding: 10
    },

    textInput: {
        width: "100%",
        height: 35,
        fontSize: 22,
        textAlign: "center",
        fontFamily:'Nunito-Regular',
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
        fontFamily:'Nunito-Bold',
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

    message_resend: {
        fontFamily:'Nunito-Regular',
        textAlign:'center',
        width: "100%",
        marginTop: 40,
        fontSize: 16,
        color: Colors.textFormItem
    },

    resendContainer: {
        width: "100%",
        marginTop: 20,
    },

    resend: {
        textAlign:'center',
        fontFamily:'Nunito-Bold',
        width: "100%",
        fontSize: 16,
        color: Colors.textFormItem
    },
});

export default EmailScreen;
