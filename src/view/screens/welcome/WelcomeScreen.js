import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import WelcomePresenter from "./presenter/WelcomePresenter";
import Colors from "../../utils/Colors";
import languages from "../../utils/languages/AppLocalization.js";

class WelcomeScreen extends Component {

    constructor(props) {
        super(props)
        this.phone = null
        this.presenter = new WelcomePresenter()
        this.presenter.setView(this)
        this.state = {
            enableToNext:false,
        }
    }

    componentDidMount(){
        this.presenter.initData().then()
    }

    enableNextButton(){
        this.setState({enableToNext:true})
    }

    goToResults(){
        this.props.navigation.navigate('Results')
    }

    goToForm(){
        this.props.navigation.navigate('Home', {showResults: true})
    }

    render(){
        let color = this.state.enableToNext ? Colors.buttonEnable : Colors.disable
        return <View style={styles.container}>
            <Image
                style={styles.icon}
                source={require('../../../../assets/logo.png')}/>

            <TouchableOpacity  disabled={!this.state.enableToNext} activeOpacity={0.7} style={[styles.button, {backgroundColor:color}]}
                              onPress={() => this.props.navigation.navigate('Login')
                              }>
                <Text style={styles.buttonText}>{languages.getLocalized("welcome_start")}</Text>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: Colors.white,
    },

    icon:{
        marginTop:20,
        width: 336,
        height: 102,
    },

    button: {
        justifyContent: 'center',
        width: '90%',
        height: 66,
        padding: 10,
        borderRadius: 6,
        backgroundColor:Colors.buttonEnable,
        position: "absolute",
        bottom: 15,
    },

    buttonText: {
        fontWeight: 'bold',
        textAlign: "center",
        fontSize: 18,
        color: Colors.white,
        fontFamily:'Nunito-Bold'
    },
});

export  default  WelcomeScreen
