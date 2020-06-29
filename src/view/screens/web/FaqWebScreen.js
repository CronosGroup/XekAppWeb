import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from "../../utils/Colors";
import Iframe from 'react-iframe'
import {Button, Icon} from 'native-base';

class FaqWebScreen extends Component {

    render() {
        const uri = 'https://xekapp.com/faq-items/porque-no-puedo-acceder-al-mapa/'
        return <View style={styles.container}>

            <Iframe url={uri}
                    frameBorder={0}
                    width="80%"
                    height="100%"
                    id="myId"
                    loading={"eager"}
                    className="myClassname"
                    display="initial"
                    position="relative"/>

            <Button style={styles.back} onPress={() => this.props.navigation.goBack()}>
                <Icon name='close' />
            </Button>

        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.white,
    },

    back:{
        justifyContent: 'center',
        alignItems: 'center',
        height:50,
        width:50,
        elevation: 10,
        borderRadius: 25,
        backgroundColor: Colors.black,
        position: "absolute",
        top:25,
        left:25,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})

export default FaqWebScreen
