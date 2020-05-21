import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CheckBoxItemView from "./CheckBoxItemView";
import Back from "../../../assets/back-08.svg";
import Colors from "../utils/Colors";

class BackButton extends Component{

    render(){
        return <TouchableOpacity activeOpacity={0.7}  style={styles.back}
                                  onPress={() => this.props.onClick()}>
            <CheckBoxItemView  height={22} width={26} image={Back} />
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({

    back:{
        backgroundColor: Colors.white,
        position: "absolute",
        top:63,
        left:30
    },
});

export default BackButton;
