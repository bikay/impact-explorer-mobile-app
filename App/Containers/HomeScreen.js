/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    TextInput,
    AsyncStorage,
    BackHandler,
    StatusBar,
    Alert
} from 'react-native';
import { Images, ApplicationStyles } from '../Themes';
import styles from './Styles/HomeScreenStyles';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-elements';
import ProductListActions from '../Redux/ProductListRedux';
import TravelGuideActions from '../Redux/TravelGuideRedux';
import { connect } from 'react-redux';
import moment from 'moment'
import SetAuthTokenActions from '../Redux/SetAuthTokenRedux'
import LoadingComponent from './LoadingComponent';

class HomeScreen extends Component {


    constructor() {
        super()
        this.state = {
            productListData: [],
            travelGuideData: [],
        }
        global.homeStaticId = 0;
        global.isBackICon = global.isBackICon ? global.isBackICon : false

    }

    componentDidMount() {
        this.props.requestProductListData()
        this.props.requestTravelGuideData()
        BackHandler.addEventListener('hardwareBackPress', this.handleOnIconBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleOnIconBack);
    }

    handleOnIconBack = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
                cancelable: false
            }
        )
        return true;
    }
    componentWillReceiveProps(newProps) {
        if (newProps.getProductList) {
            if (newProps.getProductList.fetching == false && newProps.getProductList.error == null && newProps.getProductList.payload) {
                this.setState({ productListData: newProps.getProductList.payload });
            }
        }
        if (newProps.getTravelGuide) {
            if (newProps.getTravelGuide.fetching == false && newProps.getTravelGuide.error == null && newProps.getTravelGuide.payload) {
                this.setState({ travelGuideData: newProps.getTravelGuide.payload.posts });
            }
        }
    }

    componentWillMount() {
        AsyncStorage.setItem("is_on_board", "true");
        AsyncStorage.multiGet(["LoginStatus", "userToken"]).then(response => {
            const LoginStatus = response[0][1];
            const userToken = response[1][1];
            if (LoginStatus == "true") {
                this.props.setAuthToken(userToken);
            }
        })
    }

    handleOpenFilterLocationScreen = () => {
        this.setState({ inClick: true })
        Actions.FilterByLocationScreen();
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }

    handleActivityListScreen = () => {
        this.setState({ inClick: true })
        Actions.ActivityListScreen();
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }
    handleTravelTipScreen = () => {
        this.setState({ inClick: true })
        Actions.TravelTipScreen();
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }
    handleOnSubItem = (item) => {
        this.setState({inClick: true});
        const { id } = item
        global.homeStaticId = id
        Actions.ProjectScreen({ id: id, currentSceneName: Actions.currentScene })
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }
    handleOnSubItemBlog = (id, title, image, created, author) => {
        this.setState({inClick: true});
        Actions.BlogArticleScreen({ id: id, title: title, image: image, created: created, author })
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={[ApplicationStyles.articleItem]}
                onPress={() =>!this.state.inClick ? this.handleOnSubItem(item) : null}
            >
                <Image source={{ uri: item.image }} style={ApplicationStyles.articleImage} />
                <View style={ApplicationStyles.articleText}>
                    <Text style={ApplicationStyles.articleTitle}>{item.title.toUpperCase()}</Text>
                    {item.tags.map((eachTag) => {
                        return (
                            <Text style={ApplicationStyles.articleDate}>{eachTag.name}</Text>
                        )
                    })}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 3 }}>
                            <Rating
                                type="star"
                                fractions={1}
                                startingValue={item.rating}
                                imageSize={16}
                                readonly
                                style={{ alignItems: 'flex-start' }}
                            />
                            <Text style={ApplicationStyles.articleDate}>  {item.rating}/5  </Text>
                            <Icon type="FontAwesome" name="commenting-o" style={{ color: 'grey', fontSize: 16 }} />
                            <Text style={{ fontSize: 13, color: 'grey', marginRight: 16 }}> {item.nb_comments}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center' }}>

                        </View>
                    </View>
                </View>
            </TouchableOpacity> 
        )
    }
    renderItemFullScreen = ({ item, index }) => {
        return (
            <TouchableOpacity style={ApplicationStyles.articleItemFull}
                onPress={() =>
                  !this.state.inClick ? this.handleOnSubItemBlog( item.id, item.title, item.image, item.created, item.author ) : null
                }
            >
                <View style={ApplicationStyles.imageFullContainer}>
                    <Image source={{ uri: item.image }} style={ApplicationStyles.articleImageFull} />
                </View>
                <View style={ApplicationStyles.articleTextFull}>
                    <View>
                        <Text style={ApplicationStyles.articleTitleFull}>{item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    // =========== search bar =============
    searchBar = () => {
        this.setState({ inClick: true })
        Actions.SearchResult()
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }
    handleOnNotificationNum = () => {
        if (global.selectedProduct == undefined) {
            return false;
        }
        if (global.numAddToCart == 0) {
            return false;
        }
        this.setState({ inClick: true })
        global.isBackICon = true
        Actions.CartScreen()
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                {/* ============Search Section -Input text search===========*/}
                <View>
                    <View style={styles.searchContainer}>
                        <TouchableOpacity style={styles.searchSection} onPress={!this.state.inClick ? this.searchBar : null}>
                            <Icon style={styles.searchIcon} name="search1" type="AntDesign" size={20} color="#000" />
                            <Text
                                style={[styles.input,{alignSelf: 'center', color: 'lightgrey'}]}
                            >
                                Search people & places
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.imageIcon}
                            onPress={!this.state.inClick ? this.handleOnNotificationNum : null}>
                            <Image source={Images.iconCart} style={styles.imageCart} />
                            {global.numAddToCart != undefined ?
                                global.numAddToCart == 0 ? null :
                                    <View style={{ position: 'absolute', top: 5, right: 5, padding: 2, width: 20, backgroundColor: 'red', borderRadius: 50 }}>
                                        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>{global.numAddToCart}</Text>
                                    </View>
                                : null}
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal={false}>
                        {/* ===================== Main Menu ======================*/}
                        <View style={{ flex: 1, borderBottomColor: '#FED4C8',borderBottomWidth: 1, paddingTop: 10, paddingBottom: 15}}>
                            <TouchableOpacity style={[styles.listItem, styles.green]}
                                onPress={!this.state.inClick ? this.handleOpenFilterLocationScreen : null}
                            >
                                <View style={styles.titleCotainer}>
                                    <Text style={styles.menuTitle}>SEARCH{"\n"}BY LOCATION</Text>
                                </View>
                                <View style={styles.imageContainer}>
                                    <Image resizeMode="contain" source={Images.mapTransparent} style={styles.menuImage} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.listItem, styles.orange]}
                                onPress={!this.state.inClick ? this.handleActivityListScreen : null}>
                                <View style={styles.titleCotainer}>
                                    <Text style={styles.menuTitle}>VIEW ALL{"\n"}EXPERIENCES</Text>
                                </View>
                                <View style={styles.imageContainer}>
                                    <Image resizeMode="contain" source={Images.list} style={styles.menuImage} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.listItem, styles.blue]}
                                onPress={!this.state.inClick ? this.handleTravelTipScreen : null }>
                                <View style={styles.titleCotainer}>
                                    <Text style={styles.menuTitle}>LOCAL{"\n"}TRAVEL TIPS</Text>
                                </View>
                                <View style={styles.imageContainer}>
                                    <Image resizeMode="contain" source={Images.speechBubble} style={styles.menuImage} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/*======================= Contents​ 1 ===================*/}
                        <View style={{ flex: 1, borderBottomColor: '#0EA5B5',borderBottomWidth: 1,paddingTop: 10, paddingBottom: 12}}>
                            <Text style={styles.categoryTitle}>POPULAR TRIPS AND EXPERIENCES</Text>
                            {
                                this.props.isProductsFetching ?
                                    <LoadingComponent />
                                    :
                                    <FlatList
                                        data={this.state.productListData}
                                        renderItem={this.renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                            }
                        </View>
                        {/*======================= Contents 2 ====================*/}
                        <View style={{ flex: 1, paddingTop: 5 }}>
                            <Text style={styles.categoryTitle1}>OUR BLOG AND STORIES</Text>
                            {
                                this.props.isProductsFetching ?
                                    <LoadingComponent />
                                :
                                <FlatList
                                    data={this.state.travelGuideData}
                                    renderItem={this.renderItemFullScreen}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        getProductList: state.productList,
        getTravelGuide: state.travelGuide,
        isProductsFetching: state.productList.fetching,
        isTravelGuideFetching: state.travelGuide.fetching,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestProductListData: () => dispatch(ProductListActions.productListRequest()),
        requestTravelGuideData: () => dispatch(TravelGuideActions.travelGuideRequest()),
        setAuthToken: (token) => dispatch(SetAuthTokenActions.setAuthTokenRequest(token))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

