import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, BackHandler, TextInput } from 'react-native';
import { Search } from './../Components/Search';
import { Icon } from 'native-base';
import { ApplicationStyles } from '../Themes';
import styles from './Styles/TravelTipStyle';
import { Actions } from 'react-native-router-flux';
import NewsTravelTipActions from '../Redux/NewsTravelTipRedux'
import { connect } from 'react-redux';
import LoadingComponent from './LoadingComponent';

class TravelTipScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsTravelTipData: []
        }
    }
    handleViewAllItem = (item, categoryTitle, subTitle, color) => {
        let propData = {
            item: item.subData.page,
            categoryTitle: categoryTitle,
            subTitle: subTitle
        }
        Object.assign(propData, { color: color })
        Actions.TravelTipOpenedScreen({ propData: propData });
    }
    handleOnSubItemTravelTrip = (id, subTitle, title, color, image) => {
        Actions.NewsPageScreen({
            id: id,
            subTitle: subTitle,
            title: title,
            color: color,
            image: image
        })
    }
    componentDidMount() {
        // call from dispach
        this.props.requestNewsTravelTipData()
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }

    _backHandler = () => {
        Actions.pop()
        return true
    }
    componentWillReceiveProps(newProps) {
        if (newProps.getNewsTravelTip) {
            if (newProps.getNewsTravelTip.fetching == false && newProps.getNewsTravelTip.error == null && newProps.getNewsTravelTip.payload) {
                this.setState({ newsTravelTipData: newProps.getNewsTravelTip.payload.tips });
            }
        }
    }
    renderTitleItem = ({ item, index }) => {
        const color = index == 0 ? '#0EB9CB' : index == 1 ? '#FD7751' : '#8CBC12'
        const subTitle = index == 0 ? 'TRAVEL TIPS' : index == 1 ? 'COMMUNITY' : 'SUSTAINABLE'
        const categoryTitle = index == 0 ? 'TRAVEL TIPS' : index == 1 ? 'COMMUNITY HOMESTAY TIPS' : 'SUSTAINABLE TOURISM'

        return (
            <View>
                <View style={[ApplicationStyles.headerListItemContainer, { marginTop: 8 }]}>
                    <Text style={ApplicationStyles.headerListItemName}>{categoryTitle}</Text>
                    <TouchableOpacity
                        onPress={() => this.handleViewAllItem(item, categoryTitle, subTitle, color)}
                    >
                        <Text style={ApplicationStyles.buttonViewAll}>View all</Text>
                    </TouchableOpacity>
                </View>
                {item.subData.page.map((subItem, subIndex) => {
                    if (subIndex > 2) {
                        return false;
                    }
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                this.handleOnSubItemTravelTrip(
                                    subItem.id,
                                    subTitle,
                                    subItem.title,
                                    color,
                                    subItem.image
                                )
                            }
                        >
                            <View style={ApplicationStyles.itemContainer}>
                                <View style={ApplicationStyles.imageContainer}>
                                    <Image style={ApplicationStyles.image} source={{ uri: subItem.image }} />
                                </View>
                                <View style={ApplicationStyles.textContainer}>
                                    <Text style={[ApplicationStyles.textTitle,
                                    { color: color }]}>
                                        {subTitle}</Text>
                                    <Text style={ApplicationStyles.textDescription}>{subItem.title.toUpperCase()}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    // =========== search bar =============
    searchBar = () => {
        this.setState({ inClick: true })
        Actions.SearchResult({ travelTripScene: Actions.currentScene })
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.searchSection} onPress={!this.state.inClick ? this.searchBar : null}>
                    <Icon style={styles.searchIcon} name="search1" type="AntDesign" size={20} color="#000" />
                    <Text style={[styles.input, { alignSelf: 'center', color: 'lightgrey' }]} >
                        Search people & places
                    </Text>
                </TouchableOpacity>
                {this.props.isFetching ?
                    <LoadingComponent />
                    :
                    <FlatList
                        data={this.state.newsTravelTipData}
                        renderItem={this.renderTitleItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getNewsTravelTip: state.newsTravelTip,
        isFetching: state.newsTravelTip.fetching
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestNewsTravelTipData: () => dispatch(NewsTravelTipActions.newsTravelTipRequest()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TravelTipScreen)