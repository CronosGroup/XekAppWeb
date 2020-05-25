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
import Colors from "../../utils/Colors";
import ResultsPresenter from "./presenter/ResultsPresenter";
import languages from "../../utils/languages/AppLocalization.js";
import ResultItemView from "../../components/ResultItemView";
import HeaderView from "../../components/HeaderView";
import StatusGreen from '../../../../assets/status_green.svg'
import StatusRed from '../../../../assets/status_red.svg'
import StatusYellow from '../../../../assets/status_yellow.svg'
import StatusBlack from '../../../../assets/status_black.svg'
import StatusEmpty from '../../../../assets/status.svg'

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
            statusImage:StatusEmpty
        }
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

    didAppear(){
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
        this.setState({colorStatus: Colors.green,
            statusText: 'results_low_risk',
            descriptionText: 'results_low_title',
            statusImage:StatusGreen})
    }

    setMediumStatus() {
        this.setState({colorStatus: Colors.yellow,
            statusText: 'results_medium_risk',
            descriptionText: 'results_medium_title',
            statusImage:StatusYellow})
    }

    setHighStatus() {
        this.setState({colorStatus: Colors.red,
            statusText: 'results_high_risk',
            descriptionText: 'results_high_title',
            statusImage:StatusRed})
    }

    setInfectedStatus() {
        this.setState({colorStatus: Colors.black,
            statusText: 'results_infected_risk',
            descriptionText: 'results_infected_title',
            statusImage:StatusBlack})
    }

    ItemSeparator = () => {
        return (
            <View style={styles.separator}/>
        )
    }

    render() {
        return <View style={styles.container}>

            <Image style={styles.icon} source={require('../../../../assets/logo.png')}/>

            <FlatList
                style={styles.flatList}
                data={this.state.items}
                ListHeaderComponent = { <HeaderView name={this.state.name}
                                                    image={this.state.statusImage}
                                                     descriptionText={this.state.descriptionText}
                                                     statusText={this.state.statusText}
                                                     colorStatus={this.state.colorStatus} /> }
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.ItemSeparator}
                renderItem={({item}) =>
                    <ResultItemView title={item.title} level={item.level}/>
                }
            />

            <TouchableOpacity activeOpacity={0.7} style={styles.button}
                              onPress={() => this.props.navigation.navigate('Map')
                              }>
                <Text style={styles.buttonText}>{languages.getLocalized("results_status_action")}</Text>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.white,
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
        marginTop: 58,
        width: 180,
        height: 55,
    },

    flatList: {
        marginTop: 15,
        marginBottom:10,
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
        fontFamily:'Nunito-Bold',
        textAlign: "center",
        fontSize: 18,
        color: Colors.white,
    },
});

export default ResultsScreen;
