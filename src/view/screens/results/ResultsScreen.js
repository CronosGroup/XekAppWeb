import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    BackHandler,
} from 'react-native';
import {Dimensions} from 'react-native';
import {isMobileOnly} from 'react-device-detect';
import {ProgressBar} from 'react-native-paper';
import Colors from "../../utils/Colors";
import ResultsPresenter from "./presenter/ResultsPresenter";
import languages from "../../utils/languages/AppLocalization.js";
import {Snackbar} from 'react-native-paper';
import ResultItemView from "../../components/ResultItemView";
import HeaderView from "../../components/HeaderView";
import StatusGreen from '../../../../assets/status_green.svg'
import StatusRed from '../../../../assets/status_red.svg'
import StatusYellow from '../../../../assets/status_yellow.svg'
import StatusBlack from '../../../../assets/status_black.svg'
import StatusEmpty from '../../../../assets/status.svg'
import Modal from 'modal-react-native-web';

class ResultsScreen extends Component {

    constructor(props) {
        super(props)
        this.presenter = new ResultsPresenter()
        this.presenter.setView(this)
        this.state = {
            items: [],
            isLoading: false,
            colorStatus: '',
            name: '',
            statusText: '',
            descriptionText: '',
            statusImage: StatusEmpty,
            errorBackend: false,
            errorMessage: '',
            progressLoader: 0.0,
            isLoaderVisible: false,
            disabledButton: false,
            modalVisible: false
        }
    }

    setDisableStatusButton(enable) {
        this.setState({disabledButton: enable})
    }

    progressLoaderStart(progress) {
        this.setState({isLoaderVisible: true, progressLoader: progress})
    }

    hideProgressBar() {
        this.setState({isLoaderVisible: false, progressLoader: 0.0})
    }

    onBackPress = () => {
        return true
    }

    componentDidMount() {
        this.presenter.initData().then()
        this.props.navigation.addListener('focus', () => {
            this.didAppear()
        });
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    didAppear() {
        this.presenter.initData().then()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    setItems(items) {
        this.setState({items: items})
    }

    setName(name) {
        this.setState({name: name})
    }

    setLowStatus() {
        this.setState({
            colorStatus: Colors.green,
            statusText: 'results_low_risk',
            descriptionText: 'results_low_title',
            statusImage: StatusGreen
        })
    }

    setMediumStatus() {
        this.setState({
            colorStatus: Colors.yellow,
            statusText: 'results_medium_risk',
            descriptionText: 'results_medium_title',
            statusImage: StatusYellow
        })
    }

    setHighStatus() {
        this.setState({
            colorStatus: Colors.red,
            statusText: 'results_high_risk',
            descriptionText: 'results_high_title',
            statusImage: StatusRed
        })
    }

    setInfectedStatus() {
        this.setState({
            colorStatus: Colors.black,
            statusText: 'results_infected_risk',
            descriptionText: 'results_infected_title',
            statusImage: StatusBlack
        })
    }

    ItemSeparator = () => {
        return (
            <View style={styles.separator}/>
        )
    }

    showLocationError() {
        this.setState({
            errorBackend: true,
            errorMessage: languages.getLocalized("map_location_error_message")
        })
    }

    showLocationNoAllowError() {
        this.setState({
            modalVisible: true,
        })
    }

    navigateToMap() {
        this.props.navigation.navigate('Map')
    }

    _closeModalDialog(){
        this.setState({
            modalVisible: false,
        })
    }

    render() {
        return <View style={styles.mainContainer}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}>
                <View style={styles.modalContainer}>

                    <View style={styles.modalContentContainer}>
                        <Text style={styles.modalTitleText}>{languages.getLocalized("map_location_enable_message")}</Text>

                        <View style={styles.modalContainerButtons}>

                            <TouchableOpacity style={styles.modalButton}
                                onPress={() => {
                                    this._closeModalDialog()
                                }}>
                                <Text style={styles.modalText}>{languages.getLocalized("location_action_cancel")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton}
                                onPress={() => {
                                    this._closeModalDialog()
                                    this.props.navigation.navigate('FaqWeb')
                                }}>
                                <Text style={styles.modalText}>{languages.getLocalized("location_action_enable")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.container}>
                <ProgressBar visible={this.state.isLoaderVisible} progress={this.state.progressLoader}
                             color={Colors.primary} style={styles.loader}/>

                <Image style={styles.icon} source={require('../../../../assets/logo.png')}/>

                <FlatList
                    style={styles.flatList}
                    data={this.state.items}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={<HeaderView name={this.state.name}
                                                     image={this.state.statusImage}
                                                     descriptionText={this.state.descriptionText}
                                                     statusText={this.state.statusText}
                                                     colorStatus={this.state.colorStatus}/>}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={this.ItemSeparator}
                    renderItem={({item}) =>
                        <ResultItemView title={item.title} level={item.level}/>
                    }/>

                <TouchableOpacity activeOpacity={0.7} style={styles.button} disabled={this.state.disabledButton}
                                  onPress={() => this.presenter.validateLocation()}>
                    <Text style={styles.buttonText}>{languages.getLocalized("results_status_action")}</Text>
                </TouchableOpacity>

                <Snackbar
                    visible={this.state.errorBackend}
                    onDismiss={() => this.setState({errorBackend: false})}
                    duration={3000}
                    style={{backgroundColor: Colors.red}}>
                    {this.state.errorMessage}
                </Snackbar>

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

    modalContainer: {
        backgroundColor: Colors.radiusFill,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    modalContentContainer: {
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
        width:'50%'
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

    container: {
        width: isMobileOnly ? '100%' : '60%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.white,
    },

    loader: {
        marginTop: 0,
        width: Dimensions.get('window').width,
        height: 5,
    },

    loading: {
        flex: 1,
        paddingTop: 20
    },

    separator: {
        height: 40,
        width: "100%",
        backgroundColor: Colors.white,
    },

    icon: {
        marginTop: 40,
        width: 180,
        height: 55,
    },

    flatList: {
        marginTop: 15,
        marginBottom: 10,
        width: "90%"
    },

    button: {
        justifyContent: 'center',
        width: '90%',
        height: 66,
        padding: 10,
        borderRadius: 6,
        backgroundColor: Colors.buttonEnable,
        marginBottom: 15,
        marginTop: 10,
    },

    buttonText: {
        fontFamily: 'Nunito-Bold',
        textAlign: "center",
        fontSize: 18,
        color: Colors.white,
    },
});

export default ResultsScreen;
