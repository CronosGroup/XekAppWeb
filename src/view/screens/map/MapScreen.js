import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
//import MapView,{Marker} from 'react-native-maps';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Colors from "../../utils/Colors";
import MapPresenter from "./presenter/MapPresenter";
import Utils from "../../utils/Utils";
import BackButton from "../../components/BackButton";
import languages from "../../utils/languages/AppLocalization";

class MapScreen extends Component{

    constructor(props) {
        super(props);
        this.pressenter = new MapPresenter()
        this.pressenter.setView(this)
        this.state = {
            markers:[],
            region:{
                latitude:0,
                longitude:0,
                latitudeDelta:0,
                longitudeDelta:0
            },
            userLocation:{
                latitude:0,
                longitude:0,
                radius:0
            }
        }
    }

    setRegion(region){
        this.setState({region:region})
    }

    setUserLocation(location){
        this.setState({userLocation:location})
    }

    componentDidMount(){
        this.pressenter.initData().then()
    }

    setMarkers(markers){
        this.setState({markers:markers})
    }

    render(){
        return<View style={styles.container}>

            <BackButton onClick={() => {
                this.props.navigation.goBack()
            }}/>

            <Image
                style={styles.icon}
                source={require('../../../../assets/logo.png')}/>

            <Map google={this.props.google}
                 center={this.state.region}
                 containerStyle={mapStyle}
                 zoom={20}>

                {this.state.markers.map((marker) => {
                    return (
                        (<Marker
                            position={marker}
                        />)
                    )
                })}

            </Map>

            <TouchableOpacity activeOpacity={0.7} style={styles.buttonName}
                              onPress={() => this.props.navigation.push('Home', {showResults: false})}>
                <Text style={styles.buttonNameText}>{languages.getLocalized("map_update_form_action")}</Text>
            </TouchableOpacity>
        </View>
    }
}

/*

<MapView style={styles.mapStyle}
                     initialRegion={this.state.region}
                     region={this.state.region}
                     showsUserLocation={true} >

                {this.state.markers.map((marker) => {
                    return (
                        (<Marker
                            key={marker}
                            coordinate={marker}
                            //title={marker.result}
                            pinColor={marker.level === Utils.Levels.low.valueOf()
                                ? Colors.green
                                : marker.level === Utils.Levels.medium.valueOf()
                                    ? Colors.yellow
                                    : marker.level === Utils.Levels.high.valueOf()
                                        ? Colors.red : Colors.black
                            }
                        />)
                    )
                })}

                <MapView.Circle
                    center={{
                        latitude: this.state.userLocation.latitude,
                        longitude: this.state.userLocation.longitude
                    }}
                    radius={this.state.userLocation.radius}
                    strokeWidth={1}
                    strokeColor={Colors.radiusStroke}
                    fillColor={Colors.radiusFill}/>

            </MapView>


* */

const marginTopIcon = 58
const heightIcon = 55
const marginTopMap = 20
const marginTopButton = 10
const marginBottomButton = 15
const heightButton = 66

const mapStyle = {
    position: 'relative',
    marginTop:marginTopMap,
    width: '100%',
    height: (Dimensions.get('window').height - marginTopIcon - heightIcon - marginTopMap - heightButton - marginBottomButton - marginTopButton)
}

const styles = StyleSheet.create({

    containerStyle: {
        position: 'relative',
        width: '100%',
        height: '50%'
    },

    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.white,
    },

    icon: {
        marginTop: marginTopIcon,
        width: 180,
        height: heightIcon,
    },

    mapStyle: {
        marginTop:marginTopMap,
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
        fontFamily:'Nunito-Bold',
        textAlign: "center",
        fontSize: 20,
        color: Colors.white,
    },
});

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9UJnyOVUbcSCtrldOxkx0XeSxZFF7qIU'
})(MapScreen);

