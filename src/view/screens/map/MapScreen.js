import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {isMobileOnly} from 'react-device-detect';
import {Map, Marker, GoogleApiWrapper, Circle} from 'google-maps-react';
import Colors from "../../utils/Colors";
import MapPresenter from "./presenter/MapPresenter";
import BackButton from "../../components/BackButton";
import languages from "../../utils/languages/AppLocalization";
import Utils from "../../utils/Utils";
import manifest from "../../../../app.json";

class MapScreen extends Component {

    constructor(props) {
        super(props);
        this.pressenter = new MapPresenter()
        this.pressenter.setView(this)
        this.state = {
            markers: [],
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            userLocation: {
                latitude: 0,
                longitude: 0,
                radius: 0
            }
        }
    }

    setRegion(region) {
        this.setState({region: region})
    }

    setUserLocation(location) {
        this.setState({userLocation: location})
    }

    componentDidMount() {
        this.pressenter.initData().then()
    }

    setMarkers(markers) {
        this.setState({markers: markers})
    }

    render() {
        return <View style={styles.mainContainer}>

            <View style={styles.container}>

                <BackButton onClick={() => {
                    this.props.navigation.goBack()
                }}/>

                <Image
                    style={styles.icon}
                    source={require('../../../../assets/logo.png')}/>

                <Map google={this.props.google}
                     center={this.state.region}
                     containerStyle={mapStyle}
                     disableDefaultUI={true}
                     zoomControl={!isMobileOnly}
                     zoom={20}>

                    {this.state.markers.map((marker) => {

                        let icon = marker.level === Utils.Levels.low.valueOf()
                            ? require("../../../../assets/status_green.png")
                            : marker.level === Utils.Levels.medium.valueOf()
                                ? require("../../../../assets/status_yellow.png")
                                : marker.level === Utils.Levels.high.valueOf()
                                    ? require("../../../../assets/status_red.png") : require("../../../../assets/status_black.png")

                        return (<Marker
                            position={marker}
                            icon={{
                                url: icon,
                                anchor: new this.props.google.maps.Point(32, 32),
                                scaledSize: new this.props.google.maps.Size(25, 35)
                            }}/>)
                    })}

                    <Circle
                        radius={this.state.userLocation.radius}
                        center={this.state.region}
                        strokeColor={Colors.radiusStroke}
                        strokeOpacity={1}
                        strokeWeight={2.5}
                        fillColor={Colors.radiusFill}
                        fillOpacity={0.8}/>

                </Map>

                <TouchableOpacity activeOpacity={0.7} style={styles.buttonName}
                                  onPress={() => this.props.navigation.push('Home', {showResults: false})}>
                    <Text style={styles.buttonNameText}>{languages.getLocalized("map_update_form_action")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const marginTopIcon = 40
const heightIcon = 55
const marginTopMap = 20
const marginTopButton = 10
const marginBottomButton = 15
const heightButton = 66

const mapStyle = {
    position: 'relative',
    marginTop: marginTopMap,
    width: '100%',
    height: (Dimensions.get('window').height - marginTopIcon - heightIcon - marginTopMap - heightButton - marginBottomButton - marginTopButton)
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

    containerStyle: {
        position: 'relative',
        width: '100%',
        height: '50%'
    },

    icon: {
        marginTop: marginTopIcon,
        width: 180,
        height: heightIcon,
    },

    mapStyle: {
        marginTop: marginTopMap,
        width: '100%',
        height: (Dimensions.get('window').height - marginTopIcon - heightIcon - marginTopMap - heightButton - marginBottomButton - marginTopButton)
    },

    buttonName: {
        justifyContent: 'center',
        width: '90%',
        height: heightButton,
        padding: 10,
        borderRadius: 6,
        backgroundColor: Colors.buttonEnable,
        marginBottom: marginBottomButton,
        marginTop: marginTopButton,
    },

    buttonNameText: {
        fontFamily: 'Nunito-Bold',
        textAlign: "center",
        fontSize: 20,
        color: Colors.white,
    },
});

const LoadingContainer = (props) => (
    <View style={styles.mainContainer}>
        <View style={styles.container}>
            <BackButton/>
            <Image
                style={styles.icon}
                source={require('../../../../assets/logo.png')}/>
            <View style={mapStyle}/>
            <TouchableOpacity activeOpacity={0.7} style={styles.buttonName}>
                <Text style={styles.buttonNameText}>{languages.getLocalized("map_update_form_action")}</Text>
            </TouchableOpacity>
        </View>
    </View>
)

export default GoogleApiWrapper({
    apiKey: manifest.expo.extra.maps.apiKey,
    LoadingContainer: LoadingContainer
})(MapScreen);

