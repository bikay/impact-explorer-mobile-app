import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity, Image, Slider, Dimensions,BackHandler } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './Styles/SearchMapStyle';
import { ApplicationStyles } from '../Themes';
import { Rating } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import _ from "lodash"
var mapStyle = require('../../mapStyle.json');
export default class UseGPSMapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapData: props.propProvinciesData ? props.propProvinciesData : null,
            userLat: 0,
            userLong: 0,
            slideValue: 0,
            Clicked: false,
            radius: 100000,
            allProjects: {},
            region: {
                latitude: 12.5657,
                longitude: 104.9910,
                latitudeDelta: 3,
                longitudeDelta: 3,
            }
        }
        this.region = null
    }
    onBackButtonPressed = () => {
        Actions.FilterByLocationScreen();
        return true;
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);                
    }
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 3,
                    longitudeDelta: 3,
                }
                this.setState({
                    region,
                    userLat: position.coords.latitude,
                    userLong: position.coords.longitude,
                    error: null,
                });

            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },

        );
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);        
    }
    showProduct = (eachProject) => {
        newData = { ...eachProject }
        let region = {
            latitude: parseFloat(eachProject.lat),
            longitude: parseFloat(eachProject.lng),
            latitudeDelta: this.region ? this.region.latitudeDelta : 3,
            longitudeDelta: this.region ? this.region.longitudeDelta : 3,
        }
        this.setState({
            region,
            isClicked: true,
            allProjects: newData

        })
    }

    handleMarkerLists = (circleKm) => {
        const haversine = require('haversine')
        const currentLatlong = {
            latitude: this.state.userLat,
            longitude: this.state.userLong
        }
        return (
            <View style={{}}>
                {this.state.mapData.map((eachMapData) => {
                    return (
                        eachMapData.project.map((eachProject, indexPro) => {
                            if (eachProject == null) return <View />
                            else {
                                let projectLatlong = {
                                    latitude: parseFloat(eachProject.lat),
                                    longitude: parseFloat(eachProject.lng)
                                }

                                if (parseFloat(circleKm) < haversine(currentLatlong, projectLatlong)) {
                                    projectLatlong.latitude = 0
                                    projectLatlong.longitude = 0
                                }
                                return (
                                    <MapView.Marker
                                        key={indexPro + 1}
                                        coordinate={projectLatlong}
                                        onPress={() => this.showProduct(eachProject)}
                                        title={eachProject.title}
                                    />
                                )
                            }
                        })
                    )
                })}
                <MapView.Circle
                    center={currentLatlong}
                    radius={this.state.radius}
                    strokeWidth={1}
                    strokeColor={'rgba(14, 185, 203, 0.4)'}
                    fillColor={'rgba(14, 185, 203, 0.3)'}
                />
            </View>
        )
    }

    onRegionChange = (region) => {
        this.region = region
    }
    handleOnSubItem = (item) => {
        const { id } = item
        global.homeStaticId = id
        Actions.ProjectScreen({ id: id })
    }
    render() {
        const circleKm = Math.floor(this.state.radius / 1000)
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.container, { justifyContent: 'space-between' }]}>
                    <View style={styles.sliderContainer}>
                        <Text style={[styles.title, { marginLeft: 5 }]}>Choose search radius</Text>
                        <View style={{ width: Dimensions.get('window').width }}>
                            <Slider
                                style={{ 
                                    width: Platform.OS==='android'? Dimensions.get('window').width / 1.85: '94%', 
                                    transform:Platform.OS==='android'?[{scale: 2}]:[{scale: 1}] , 
                                    alignSelf: 'center' }}
                                value={this.state.radius}
                                step={1}
                                maximumValue={200000}
                                onValueChange={(radius) => this.setState({ radius })}
                            />
                        </View>

                        <Text style={{ textAlign: 'center', marginTop: 4 }}>{circleKm} Km</Text>
                    </View>

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        followsUserLocation
                        style={styles.map}
                        onRegionChange={this.onRegionChange}
                        region={this.state.region}
                        customMapStyle={mapStyle}
                    >
                        {
                            this.handleMarkerLists(circleKm)
                        }
                    </MapView>

                    {
                        this.state.isClicked && this.state.allProjects && _.isEmpty(this.state.allProjects) == false ?

                            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', padding: 8, height: 130 }}>
                                <TouchableOpacity style={[ApplicationStyles.articleItem, { marginRight: 8 }]}
                                    onPress={() => this.handleOnSubItem(this.state.allProjects)}
                                >
                                    <Image source={{ uri: this.state.allProjects.image }} style={ApplicationStyles.articleImage} />
                                    <View style={ApplicationStyles.articleText}>
                                        <Text style={ApplicationStyles.articleTitle}>{this.state.allProjects.title}</Text>
                                        {this.state.allProjects.tags.map((eachTag) => {
                                            return (
                                                <Text style={ApplicationStyles.articleDate}>{eachTag.name}</Text>
                                            )
                                        })}
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 3 }}>
                                                <Rating
                                                    type="star"
                                                    fractions={1}
                                                    startingValue={this.state.allProjects.rating}
                                                    imageSize={16}
                                                    readonly
                                                    style={{ alignItems: 'flex-start' }}
                                                />
                                                <Text style={ApplicationStyles.articleDate}>  {this.state.allProjects.rating}/5  </Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center' }}>

                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            :
                            <View />
                    }
                </View>

            </View>
        );
    }
}