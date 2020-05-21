import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from "../utils/Colors";

class CheckBoxItemView extends Component {

    render() {
        return<View style={styles.container}>
            {<this.props.image  width={this.props.width} height={this.props.height}/>}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
});

export default CheckBoxItemView;
