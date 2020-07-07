import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from "../utils/Colors";
import Modal from 'modal-react-native-web';
import languages from "../utils/languages/AppLocalization";

class InfoDialog extends Component{

    render(){
        return <Modal
            animationType="fade"
            transparent={true}
            visible={true}>
            <View style={styles.modalContainer}>

                <View style={styles.modalContentContainer}>
                    <Text style={styles.modalTitleText}>{this.props.title}</Text>

                    <View style={styles.modalContainerButtons}>

                        <TouchableOpacity style={styles.modalButton}
                                          onPress={() => {
                                              this.props.hide()
                                          }}>
                            <Text style={styles.modalText}>{languages.getLocalized("action_ok")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    }
}

const styles = StyleSheet.create({

    modalContainer: {
        backgroundColor: Colors.radiusFill,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    modalContentContainer: {
        marginLeft:15,
        marginRight:15,
        backgroundColor: Colors.white,
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 20,
    },

    modalContainerButtons: {
        marginTop:10,
        flexDirection: 'row',
        width:'100%'
    },

    modalButton: {
        marginTop: 10,
        width:'100%'
    },

    modalTitleText: {
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
        textAlign: 'center',
    },

    modalText: {
        fontFamily: 'Nunito-Bold',
        textAlign: 'center',
    },
});

export default InfoDialog;
