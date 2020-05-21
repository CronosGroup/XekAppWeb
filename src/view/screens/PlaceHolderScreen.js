import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import Colors from "../utils/Colors";

class PlaceHolderScreen extends Component {

    render(){
        return <View style={styles.container}>
            <Image
                style={styles.icon}
                source={require('../../../assets/logo.png')}/>
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
});

export  default  PlaceHolderScreen
