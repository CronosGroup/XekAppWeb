import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Colors from "../utils/Colors";

class ButtonView extends Component {

    render() {
        let style = this.props.selected ?  styles.shapeSelected : styles.shapeUnSelected
        let textStyle = this.props.selected ?  styles.itemSelected : styles.itemUnSelected
        return <TouchableHighlight activeOpacity={0.7} onPress={() => this.props.childClicked(this.props.item)}
                                   style={style}>
            <View>
                <Text style={textStyle}> {this.props.title} </Text>
            </View>
        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({

    itemSelected: {
        fontFamily:'Nunito-Regular',
        fontSize: 12,
        color: Colors.white,
        marginTop:10,
        marginBottom:10,
        marginRight:10,
        marginLeft:10
    },

    itemUnSelected: {
        fontSize: 12,
        fontFamily:'Nunito-Regular',
        color: Colors.textFormItem,
        marginTop:10,
        marginBottom:10,
        marginRight:10,
        marginLeft:10
    },

    shapeUnSelected: {
        alignItems: "center",
        borderRadius: 0,
        backgroundColor: Colors.white,
        borderBottomWidth:2,
        borderTopWidth:2,
        borderRightWidth:2,
        borderLeftWidth:2,
        borderBottomColor:Colors.primary,
        borderTopColor:Colors.primary,
        borderLeftColor:Colors.primary,
        borderRightColor:Colors.primary
    },

    shapeSelected: {
        alignItems: "center",
        borderRadius: 0,
        backgroundColor: Colors.primary
    },
});

export default ButtonView;
