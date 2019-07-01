import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, TextInput, Dimensions,BackHandler } from 'react-native';
import styles from './Styles/FilterByLocationStyles';
import { Search } from './../Components/Search';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Icon } from 'native-base';
import ProvinciesActions from '../Redux/ProvinciesRedux';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LoadingComponent from "./LoadingComponent";
let provinces;
class FilterByLocationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinciesData: [],
            searchField: '',
            provinceNameAfterSearch: [],
            suggestion: [],
            valueTextSearch: ''
        }
    }
    onBackButtonPressed = () => {
        Actions.HomeScreen();
        return true;
    }
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);        
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
        this.props.requestProvinciesData()
    }
    componentWillReceiveProps(newProps) {
        if (newProps.getProvincies) {
            if (newProps.getProvincies.fetching == false && newProps.getProvincies.error == null && newProps.getProvincies.payload) {
                const { points } = newProps.getProvincies.payload.map[0]
                let storeTags = []
                points.map((eachPoint) => {
                    if (eachPoint.tags == null) {
                        return true;
                    } else {
                        eachPoint.tags.map((eachTag) => {
                            storeTags.push(
                                {
                                    province_name: eachTag.name,
                                    project: eachPoint.project
                                });
                        })
                    }
                })
                getUnitProvinceName = _.uniqBy(storeTags, 'province_name');
                let all_province_with_project = []
                getUnitProvinceName.map((eachUniqueProvince) => {
                    checkExistingProvince = _.filter(storeTags, { province_name: eachUniqueProvince.province_name })
                    if (checkExistingProvince && checkExistingProvince.length > 0) {
                        let project = []
                        checkExistingProvince.map((eachExistingPro) => {
                            project.push(eachExistingPro.project);
                        })
                        all_province_with_project.push(
                            {
                                province_name: eachUniqueProvince.province_name,
                                project: project
                            }
                        )

                    }
                })
                this.setState({ provinciesData: all_province_with_project });
            }
        }
    }
    handleOpenSearchMapScreen = (provinciesData) => {
        if (provinciesData.project.lat == "" || provinciesData.project.lng == "") {
            alert("Location not found!")
        } else {
            if (Actions.currentScene == "FilterByLocationScreen") {
                Actions.SearchMapScreen({ propData: provinciesData });
            }
        }
    }
    handleOpenUseGPSMapScreen = () => {
        const { provinciesData } = this.state
        if (Actions.currentScene == "FilterByLocationScreen") {
            Actions.UseGPSMapScreen({ propProvinciesData: provinciesData })
        }
    }
    renderProvincies = ({ item, index }) => {
        return (
            <View>
                {item.province_name == "" ? null :
                    <TouchableOpacity style={styles.checkBoxContainer}
                        onPress={() => this.handleOpenSearchMapScreen(item)}
                    >
                        <Text style={styles.text}>{item.province_name}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
    handleSearch = (text) => {
        let { provinciesData, provinceNameAfterSearch } = this.state
        var provinceName = provinciesData.filter(function (data) {
            if (data.province_name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                return data.province_name;
            }
            else {
                return "";
            }
        });
        this.setState({ provinceNameAfterSearch: [...provinceName], valueTextSearch: text });
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={{ paddingBottom: 16, paddingTop: 8 }}>
                        <View style={styles.searchContainer}>
                            <View style={styles.searchSection}>
                                <Icon style={styles.searchIcon} name="search1" type="AntDesign" size={20} color="#000" />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Search for province'
                                    underlineColorAndroid="transparent"
                                    value={this.state.valueTextSearch}
                                    onChangeText={(text) => this.handleSearch(text)}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button}
                            onPress={this.handleOpenUseGPSMapScreen}
                        >
                            <Text style={styles.textBtn}>Use my GPS</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }} >
                        <ScrollView horizontal={false} >
                            <View style={{ flex: 1, paddingTop: 16 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.txtHeader}>Provinces</Text>
                                </View>
                                {this.props.isFetching ?
                                    <View style={{ marginTop: Dimensions.get('window').height / 5 }}>
                                        <LoadingComponent />
                                    </View>
                                :
                                    <FlatList
                                        data={this.state.provinceNameAfterSearch && this.state.valueTextSearch ? this.state.provinceNameAfterSearch : this.state.provinciesData}
                                        renderItem={this.renderProvincies}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        getProvincies: state.province,
        isFetching: state.province.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestProvinciesData: () => dispatch(ProvinciesActions.provinciesRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterByLocationScreen)