import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, BackHandler } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './Styles/SearchMapStyle';
import { Images, ApplicationStyles } from '../Themes';
import { Rating } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import _ from "lodash"
var mapStyle = require('../../mapStyle.json');
export default class SearchMapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapData: props.propData ? props.propData : null,
            slideValue: 0,
            isClicked: false,
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
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    }
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            () => {
                region = {
                    latitude: parseFloat(this.state.mapData.project[0].lat),
                    longitude: parseFloat(this.state.mapData.project[0].lng),
                    latitudeDelta: 3,
                    longitudeDelta: 3,
                }
                this.setState({
                    region,
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
    handleMarkerLists = () => {
        return (
            <View>
                {this.state.mapData.project.map(eachProject => (
                    eachProject == null ? <View /> :
                        <MapView.Marker
                            coordinate={{
                                latitude: parseFloat(eachProject.lat),
                                longitude: parseFloat(eachProject.lng)
                            }}
                            onPress={() => this.showProduct(eachProject)}
                            title={eachProject.title}
                        />
                ))}
            </View>
        )
    }
    onRegionChange = (region) => {
        this.region = region
    }
    handleOnSubItem = (item) => {
        const { id } = item
        global.homeStaticId = id
        Actions.ProjectScreen({ id: id, currentSceneName: Actions.currentScene })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.container, { justifyContent: 'flex-end' }]}>
                    <MapView
                        showsUserLocation={true}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        onRegionChange={this.onRegionChange}
                        region={this.state.region}
                        customMapStyle={mapStyle}
                    >
                        {this.handleMarkerLists()}
                    </MapView>
                    {this.state.isClicked && this.state.allProjects && _.isEmpty(this.state.allProjects) == false ?
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
                    : <View /> }
                </View >
            </View>
        );
    }
}