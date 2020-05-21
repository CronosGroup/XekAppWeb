import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native'
import Colors from "../../utils/Colors"
import LoginPresenter from "./presenter/LoginPresenter"
import {Snackbar} from 'react-native-paper';
import CheckBoxView from "../../components/CheckBoxView";
import MenActive from '../../../../assets/men_active.svg'
import MenInActive from '../../../../assets/men_inactive.svg'
import WomenActive from '../../../../assets/woman_active.svg'
import WomenInActive from '../../../../assets/woman_inactive.svg'
import languages from "../../utils/languages/AppLocalization";

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.phone = null
        this.presenter = new LoginPresenter()
        this.presenter.setView(this)
        this.state = {
            name: '',
            lastName: '',
            nameError: false,
            lastNameError: false,
            men: false,
            women: false,
            genderError: false,
            errorBackend: false,
            signEnabled: false,
            enableToSend: false,
            phoneError: false
        }
    }

    setName(name) {
        this.setState({name: name, nameError: false})
    }

    setLastName(name) {
        this.setState({lastName: name, lastNameError: false})
    }

    showNameError() {
        this.setState({nameError: true})
    }

    showLastNameError() {
        this.setState({lastNameError: true})
    }

    showGenderError() {
        this.setState({genderError: true})
    }

    gotoForm() {
        this.props.navigation.navigate('Home', {showResults: false})
    }

    showUnknownError() {
        this.setState({errorBackend: true})
    }

    maleChecked() {
        this.setState({men: !this.state.men, women: false, genderError: false})
        this.presenter.setMaleGender(!this.state.men)
    }

    femaleChecked() {
        this.setState({women: !this.state.women, men: false, genderError: false})
        this.presenter.setFemaleGender(!this.state.women)
    }

    gotoRecoveryPassword() {
        this.props.navigation.navigate('RecoverPhone')
    }

    render() {
        return <KeyboardAvoidingView style={styles.containerKeyboard} behavior="padding">

            <View style={styles.container}>
                <Image
                    style={styles.icon}
                    source={require('../../../../assets/logo.png')}/>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.container_scrollView}>

                    <Text style={styles.title}>{languages.getLocalized("login_title")}</Text>

                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor = {Colors.textFormItem}
                        placeholder={languages.getLocalized("login_name_placeholder")}
                        onChangeText={text => this.setName(text)}/>
                    {this.state.nameError ? <Text style={styles.errorName}>Please fill the name field</Text> : null}

                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor = {Colors.textFormItem}
                        placeholder={languages.getLocalized("login_lastName_placeholder")}
                        onChangeText={text => this.setLastName(text)}/>
                    {this.state.lastNameError ?
                        <Text style={styles.errorName}>{languages.getLocalized("login_error_last_name")}</Text> : null}

                    <Text style={styles.subtitle}>{languages.getLocalized("login_select_gender")}</Text>
                    <View style={styles.containerGender}>
                        <CheckBoxView checkedImage={MenActive}
                                      unCheckedImage={MenInActive}
                                      checked={this.state.men}
                                      style={styles.checkbox}
                                      onClick={() => {
                                          this.maleChecked()
                                      }}/>

                        <CheckBoxView checkedImage={WomenActive}
                                      unCheckedImage={WomenInActive}
                                      checked={this.state.women}
                                      style={styles.checkboxWomen} onClick={() => {
                            this.femaleChecked()
                        }}/>
                    </View>
                    {this.state.genderError ?
                        <Text
                            style={[styles.errorName, {textAlign: 'center'}]}>{languages.getLocalized("login_error_gender")}</Text> : null}

                    <TouchableOpacity activeOpacity={0.7} style={styles.buttonRecovery}
                                      onPress={() => this.gotoRecoveryPassword()}>
                        <Text style={styles.buttonRecoveryText}>{languages.getLocalized("login_recover_account")}</Text>
                    </TouchableOpacity>
                </ScrollView>

                <TouchableOpacity activeOpacity={0.7} style={styles.buttonName}
                                  onPress={() => this.presenter.logWithName(this.state.name, this.state.lastName)}>
                    <Text style={styles.buttonNameText}>{languages.getLocalized("login_next")}</Text>
                </TouchableOpacity>
                <Snackbar
                    visible={this.state.errorBackend}
                    onDismiss={() => this.setState({errorBackend: false})}
                    duration={3000}
                    style={{backgroundColor: Colors.red}}>
                    An error did happen please try again later.
                </Snackbar>
            </View>
        </KeyboardAvoidingView>
    }
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.white,
    },

    containerKeyboard: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    scrollView: {
        width: '100%',
    },

    container_scrollView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    icon: {
        marginTop: 58,
        width: 180,
        height: 55,
    },

    title: {
        width: '90%',
        fontSize: 20,
        fontFamily: 'Nunito-Regular',
        marginTop: 120,
    },

    containerGender: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    subtitle: {
        fontFamily: 'Nunito-Regular',
        textAlign: 'center',
        width: "90%",
        marginTop: 30,
        fontSize: 16,
    },

    checkbox: {
        width: 54,
        height: 54,
        backgroundColor: Colors.white,
    },

    checkboxWomen: {
        width: 54,
        height: 54,
        marginLeft: 30,
        backgroundColor: Colors.white,
    },

    textInput: {
        fontFamily: 'Nunito-Regular',
        color: Colors.textFormItem,
        width: "90%",
        height: 40,
        marginTop: 50,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2
    },

    errorName: {
        width: "90%",
        marginTop: 5,
        fontSize: 12,
        color: Colors.red
    },

    buttonName: {
        justifyContent: 'center',
        width: '90%',
        height: 66,
        padding: 10,
        borderRadius: 6,
        backgroundColor: Colors.buttonEnable,
        marginBottom: 15,
        marginTop: 10,
    },

    buttonNameText: {
        fontFamily: 'Nunito-Bold',
        textAlign: "center",
        fontSize: 20,
        color: Colors.white,
    },

    buttonRecovery: {
        backgroundColor: Colors.white,
        width: '90%',
        marginTop: 10,
        marginBottom: 15
    },

    buttonRecoveryText: {
        fontFamily: 'Nunito-Regular',
        textAlign: "center",
        fontSize: 18,
        color: Colors.black,
        textDecorationLine: 'underline'
    },

    button: {
        backgroundColor: Colors.primary,
        width: '90%',
        height: 40,
        padding: 10,
        borderRadius: 6,
        marginBottom: 20
    },

    buttonText: {
        fontWeight: 'bold',
        textAlign: "center",
        fontSize: 18,
        color: Colors.white,
    },
});

export default LoginScreen;
