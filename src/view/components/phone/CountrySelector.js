import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    TouchableWithoutFeedback,
} from 'react-native'
import {isMobileOnly} from 'react-device-detect';
import Colors from "../../utils/Colors";
import data from './Countries'
import BackButton from "../BackButton";

class CountrySelector extends Component {

    selectCountry(country) {
        this.props.route.params.callback(country)
        this.props.navigation.goBack()
    }

    render() {
        const countryData = data
        return <View style={styles.mainContainer}>

            <View style={styles.container}>

                <BackButton onClick={() => {
                    this.props.navigation.goBack()
                }}/>

                <Image
                    style={styles.icon}
                    source={require('../../../../assets/logo.png')}/>

                <FlatList
                    style={styles.flatList}
                    data={countryData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={
                        ({item}) =>
                            <TouchableWithoutFeedback onPress={() => this.selectCountry(item)}>
                                <View style={styles.countryStyle}>
                                    <Text>
                                        {item.flag} {item.name} ({item.dial_code})
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                    }
                />
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

    countryStyle: {
        flex: 1,
        borderColor: 'black',
        borderTopWidth: 1,
        padding: 12,
    },

    icon: {
        marginTop: 40,
        marginBottom: 20,
        width: 180,
        height: 55,
    },

    flatList: {
        width: "90%"
    },
})

export default CountrySelector;
