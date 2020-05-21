import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "../utils/Colors";
import Utils from "../utils/Utils";

class ResultItemView extends Component{

    render() {
        let level = this.props.level
        let style = level === Utils.Levels.low.valueOf() ? styles.low
            : level === Utils.Levels.medium.valueOf() ? styles.medium
                : level === Utils.Levels.high.valueOf() ? styles.high
                    : styles.infected
        return (
            <View
                style={styles.container}>
                <View style={style}/>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        width: "100%",
        backgroundColor: Colors.white,
        flexDirection:"row",
        flex:1
    },

    low:{
        width: 8,
        height: 8,
        backgroundColor: Colors.green,
        borderRadius:4
    },

    medium:{
        width: 8,
        height: 8,
        backgroundColor: Colors.yellow,
        borderRadius:4
    },

    high:{
        width: 8,
        height: 8,
        backgroundColor: Colors.red,
        borderRadius:4
    },

    infected:{
        width: 8,
        height: 8,
        backgroundColor: Colors.black,
        borderRadius:4
    },

    title: {
        fontFamily:'Nunito-Regular',
        fontSize: 18,
        color: Colors.textFormItem,
        marginLeft: 10,
        marginTop:-11
    }
});

export default ResultItemView;
