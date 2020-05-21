import React, {Component} from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import ButtonView from "./ButtonView";
import Utils from "../utils/Utils";
import Colors from "../utils/Colors";
import GridList from 'react-native-grid-list';

class QuestionView extends Component {

    constructor(props) {
        super(props);
        this.itemQuestionPressed = this.itemQuestionPressed.bind(this);
        this.state = {
            data: this.props.items,
            selected: new Map(),
        }
    }

    ItemSeparator = () => {
        return (
            <View style={styles.separator}/>
        );
    }

    itemQuestionPressed(item){
        this.props.childClicked(item)
        this.setState((state) => {
            let type = this.props.type
            if (type === Utils.TypesEnum.SELECT || type === Utils.TypesEnum.YES_NO) {
                this.state.selected.clear()
            }
            const selected = new Map(state.selected);
            this.state.selected.has(item.id) ? selected.delete(item.id, !selected.get(item.id)) : selected.set(item.id, !selected.get(item.id));
            return {selected};
        });
    }

    isSelected(item): boolean {
        return !!this.state.selected.has(item.id)
    }

    render() {
        return <View>
            <Text style={styles.text}> {this.props.title} </Text>
            <GridList
                itemStyle={styles.item}
                style={styles.list}
                data={this.state.data}
                numColumns={3}
                showSeparator
                separatorBorderWidth={10}
                renderItem={({item}) =>
                    <ButtonView item={item} title={item.answer} selected={this.isSelected(item)} childClicked = {this.itemQuestionPressed}/>
                }
            />
        </View>
    }
}

const styles = StyleSheet.create({

    item:{
        width: '100%',
        height: '100%'
    },

    list:{
        marginTop: 10,
        marginLeft: -10,
    },

    text: {
        fontFamily:'Nunito-Regular',
        color: Colors.textFormItem,
        fontSize: 16,
        textAlign: 'left',
    },

    separator: {
        height:"100%",
        width: 10,
        backgroundColor: Colors.white,
    },
});

export default QuestionView;
