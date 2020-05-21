import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Animated} from 'react-native';
import CheckBoxItemView from "./CheckBoxItemView";

class CheckBoxView extends Component {

    constructor(props) {
        super(props);
        this.handlePressIn = this.handlePressIn.bind(this);
        this.handlePressOut = this.handlePressOut.bind(this);
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(1);
    }

    handlePressIn() {
        Animated.spring(this.animatedValue, {
            toValue: .5
        }).start()
    }
    handlePressOut() {
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 3,
            tension: 40
        }).start()
    }

    render() {
        const animatedStyle = {
            transform: [{ scale: this.animatedValue}]
        }
        return<TouchableOpacity activeOpacity={0.7} onPress={() => this.props.onClick()}
                                onPressIn={this.handlePressIn}
                                onPressOut={this.handlePressOut}>
            <Animated.View style={[styles.button, animatedStyle]}>
                <View style={this.props.style}>
                    {this.props.checked ? <CheckBoxItemView  height={this.props.style.height} width={this.props.style.width} image={this.props.checkedImage} style={styles.item}/> : null}
                    {!this.props.checked ? <CheckBoxItemView height={this.props.style.height} width={this.props.style.width}  image={this.props.unCheckedImage} style={styles.item}/> : null}
                </View>
            </Animated.View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    item:{
        position: "absolute",
        top:0,
    }
});

export default CheckBoxView;
