import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    BackHandler
} from 'react-native';
import {isMobileOnly} from 'react-device-detect';
import QuestionView from "../../components/QuestionView";
import HomePresenter from "./presenter/HomePresenter";
import Colors from "../../utils/Colors";
import BackButton from "../../components/BackButton";
import languages from "../../utils/languages/AppLocalization";

class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.itemQuestionPressed = this.itemQuestionPressed.bind(this);
        this.presenter = new HomePresenter()
        this.presenter.setView(this)
        const {showResults} = this.props.route.params
        this.state = {
            data: [],
            isLoading: true,
            enableToSend: false,
            showResults: showResults,
        }
    }

    onBackPress = () => {
        return this.state.showResults
    }

    componentDidMount() {
        this.presenter.initData().then()
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    ItemSeparator = () => {
        return (
            <View style={styles.separator}/>
        )
    }

    setItems(items) {
        this.setState({data: items, isLoading: false, enableToSend: false})
    }

    enableButtonToSendPoll() {
        this.setState({enableToSend: true})
    }

    disableButtonToSendPoll() {
        this.setState({enableToSend: false})
    }

    goToPhoneRegistration() {
        this.props.navigation.navigate('Phone')
    }

    goToResults() {
        this.props.navigation.navigate('Results')
    }

    itemQuestionPressed(answer) {
        this.presenter.itemQuestionPressed(answer)
    }

    render() {
        let color = this.state.enableToSend ? Colors.buttonEnable : Colors.disable
        return <View style={styles.mainContainer}>
            <View style={styles.container}>

                {!this.state.showResults ? <BackButton onClick={() => {
                    this.props.navigation.goBack()
                }}/> : null}

                <Image
                    style={styles.icon}
                    source={require('../../../../assets/logo.png')}/>

                <Text style={styles.title}>{languages.getLocalized("home_title")}</Text>

                {this.state.isLoading ? <View style={styles.loading}>
                    <ActivityIndicator/>
                </View> : null}

                <FlatList
                    style={styles.flatList}
                    data={this.state.data}
                    extraData={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    width='100%'
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={this.ItemSeparator}
                    renderItem={({item}) =>
                        <QuestionView title={item.question} items={item.answers} type={item.type}
                                      childClicked={this.itemQuestionPressed}/>
                    }
                />

                <TouchableOpacity activeOpacity={0.7} style={[styles.button, {backgroundColor: color}]}
                                  onPress={() => this.presenter.postAnswers()}>
                    <Text style={styles.buttonText}>{languages.getLocalized("home_get_results")}</Text>
                </TouchableOpacity>
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

    container: {
        width: isMobileOnly ? '100%' : '60%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.white,
    },

    flatList: {
        width: "90%"
    },

    loading: {
        flex: 1,
        paddingTop: 20
    },

    icon: {
        marginTop: 40,
        width: 180,
        height: 55,
    },

    back: {
        position: "absolute",
        top: 63,
        left: 30
    },

    title: {
        textAlign: "center",
        width: '90%',
        fontSize: 16,
        fontFamily: 'Nunito-Bold',
        marginTop: 25,
        marginBottom: 25,
        color: Colors.buttonEnable
    },

    button: {
        justifyContent: 'center',
        width: '90%',
        height: 66,
        padding: 10,
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 15
    },

    buttonText: {
        fontFamily: 'Nunito-Bold',
        textAlign: "center",
        fontSize: 20,
        color: Colors.white,
    },

    separator: {
        height: 40,
        width: "100%",
        backgroundColor: Colors.white,
    },
});

export default HomeScreen;
