import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView
} from 'react-native';
import {isMobileOnly} from 'react-device-detect';
import Colors from "../../../utils/Colors";
import RecoverCodePresenter from "./presenter/RecoverCodePresenter";
import {Snackbar} from "react-native-paper";
import Numeral from "../../../../../assets/hashtag-01.svg"
import BackButton from "../../../components/BackButton";
import CheckBoxItemView from "../../../components/CheckBoxItemView";
import languages from "../../../utils/languages/AppLocalization";

class RecoverCodeScreen extends Component {

    constructor(props) {
        super(props)
        this.phone = null
        this.presenter = new RecoverCodePresenter()
        this.presenter.setView(this)
        this.state = {
            enableToSendCode: false,
            codeError: false,
            errorBackend: false,
            snackColor: Colors.red,
            message: '',
            showPlaceHolder: true,
        }
    }

    showErrorCode() {
        this.setState({codeError: true, enableToSendCode: false})
    }

    showPlaceHolderView() {
        this.setState({showPlaceHolder: true})
    }

    hidePlaceHolderView() {
        this.setState({showPlaceHolder: false})
    }

    enableSendCode() {
        this.setState({codeError: false, enableToSendCode: true})
    }

    showBackendError() {
        this.setState({
            errorBackend: true,
            message: ' An error did happen please try again later.',
            snackColor: Colors.red
        })
    }

    navigateToResults() {
        this.props.navigation.navigate('Results')
    }

    render() {
        let colorCode = this.state.enableToSendCode ? Colors.buttonEnable : Colors.disable
        return <View style={styles.mainContainer}>

            <View style={styles.container}>

                <BackButton onClick={() => {
                    this.props.navigation.goBack()
                }}/>

                <Image
                    style={styles.icon}
                    source={require('../../../../../assets/logo.png')}/>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.container_scrollView}>

                    <Text style={styles.title}>{languages.getLocalized("recover_code_title")}</Text>

                    <View style={styles.textInputContainer}>
                        {this.state.showPlaceHolder ? <View style={styles.placeHolderContainer} pointerEvents="none">
                                <CheckBoxItemView image={Numeral} height={46} width={46}/>
                                <CheckBoxItemView image={Numeral} height={46} width={46}/>
                                <CheckBoxItemView image={Numeral} height={46} width={46}/>
                                <CheckBoxItemView image={Numeral} height={46} width={46}/>
                                <CheckBoxItemView image={Numeral} height={46} width={46}/>
                                <CheckBoxItemView image={Numeral} height={46} width={46}/>
                            </View>
                            : null}
                        <TextInput
                            style={styles.textInput}
                            maxLength={6}
                            keyboardType={"numeric"}
                            onChangeText={text => this.presenter.setCode(text)}/>
                    </View>
                    {this.state.codeError ?
                        <Text style={styles.error}>{languages.getLocalized("recover_code_error")}</Text> : null}

                    <Text style={styles.message_resend}>{languages.getLocalized("recover_code_resend_message")}</Text>

                    <TouchableOpacity style={styles.resendContainer}
                                      onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.resend}>{languages.getLocalized("recover_code_resend_action")}</Text>
                    </TouchableOpacity>
                </ScrollView>

                <TouchableOpacity disabled={!this.state.enableToSendCode} activeOpacity={0.7}
                                  style={[styles.button, {backgroundColor: colorCode}]}
                                  onPress={() => this.presenter.sendCode()}>
                    <Text style={styles.buttonText}>{languages.getLocalized("recover_code_verify_action")}</Text>
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
        fontFamily: 'Nunito-Regular',
        color: Colors.textFormItem,
        width: "100%",
        height: 50,
        fontSize: 22,
        textAlign: "center",
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

    message_resend: {
        fontFamily: 'Nunito-Regular',
        textAlign: 'center',
        width: "100%",
        marginTop: 20,
        fontSize: 16,
        color: Colors.textFormItem
    },

    resendContainer: {
        width: "100%",
        marginTop: 20,
    },

    resend: {
        textAlign: 'center',
        fontFamily: 'Nunito-Bold',
        width: "100%",
        fontSize: 16,
        color: Colors.textFormItem
    },
});

export default RecoverCodeScreen;
