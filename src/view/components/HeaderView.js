import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "../utils/Colors";
import languages from "../utils/languages/AppLocalization";
import CheckBoxItemView from "./CheckBoxItemView";

class HeaderView extends Component {

    render() {
        let status = ''
        if (this.props.statusText.length !== 0) {
            status = languages.getLocalized(this.props.statusText)
        }
        let description = ''
        if (this.props.descriptionText.length !== 0) {
            description = languages.getLocalized(this.props.descriptionText)
        }
        let statusColor = this.props.colorStatus
        return<View style={styles.header}>

                <Text style={styles.name}>{languages.getLocalized("results_hi_user", {name: this.props.name})}</Text>

                <Text style={[styles.result_status, {color: statusColor}]}>{languages.getLocalized("results_your_result")}</Text>

                <CheckBoxItemView style={styles.itemStatus} height={54} width={68} image={this.props.image}/>

                <Text style={[styles.status, {color: statusColor}]}>{status}</Text>

                <Text style={styles.description_status}>{description}</Text>

            </View>
    }
}

const styles = StyleSheet.create({

    header:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.white,
    },

    name: {
        fontFamily:'Nunito-Bold',
        textAlign: "center",
        fontSize: 24,
        color: Colors.buttonEnable,
        marginTop: 35,
    },

    result_status: {
        fontFamily:'Nunito-Bold',
        textAlign: "center",
        fontSize: 21,
        color: Colors.black,
        marginTop: 35,
    },

    status: {
        fontFamily:'Nunito-Bold',
        textAlign: "center",
        fontSize: 36,
        color: Colors.black,
        marginTop: 5,
    },

    description_status: {
        width: "90%",
        fontFamily:'Nunito-Regular',
        textAlign: "left",
        fontSize: 21,
        color: Colors.textFormItem,
        marginTop: 25,
        marginBottom:20
    },

    itemStatus: {
        marginTop: 30,
    },

});

export default HeaderView;
