import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Image, TouchableOpacity, StatusBar, Platform, Alert, Dimensions } from 'react-native';
import OnBoardingScreen from '../Containers/OnBoardingScreen';
import HomeScreen from '../Containers/HomeScreen';
import { Images, Fonts } from '../Themes';
import FilterByLocationScreen from '../Containers/FilterByLocationScreen';
import ActivityListScreen from '../Containers/ActivityListScreen';
import TravelTipScreen from '../Containers/TravelTipScreen';
import TravelTipOpenedScreen from '../Containers/TravelTipOpenedScreen';
import AboutMeScreen from '../Containers/AboutMeScreen';
import EditProfileScreen from '../Containers/EditProfileScreen';
import SearchMapScreen from '../Containers/SearchMapScreen';
import UseGPSMapScreen from '../Containers/UseGPSMapScreen';
import ProjectScreen from '../Containers/ProjectScreen';
import ProjectListScreen from '../Containers/ProjectListScreen';
import ForgetPwdScreen from '../Containers/ForgetPwdScreen'
import styles from './Styles/BottomNavigationStyle'
import BookingScreen from '../Containers/BookingScreen';
import NewsScreen from '../Containers/NewsScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import NewsPageScreen from '../Containers/NewsPageScreen';
import BlogArticleScreen from '../Containers/BlogArticleScreen';

import { Right, Left, Icon } from 'native-base';
import { connect } from 'react-redux';
import HeaderActions from '../Redux/HeaderRedux';

// import { TouchableOpacity } from 'react-native-gesture-handler';
import ProductPageScreen from '../Containers/ProductPageScreen';
import ProductPageCalandarScreen from '../Containers/ProductPageCalandarScreen';
import CartScreen from '../Containers/CartScreen';
import CheckoutScreen from '../Containers/CheckoutScreen';
import CheckoutCashScreen from '../Containers/CheckoutCashScreen';
import ConfirmationScreen from '../Containers/ConfirmationScreen';
import BookingDetail from './../Containers/BookingDetail'
import SearchResult from './../Containers/SearchResult'
import LoginScreen from './../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import MyFavoriteScreen from './../Containers/MyFavoriteScreen'
import RegisterScreen from './../Containers/RegisterScreen'


class NavigationRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        global.firstname = "test"
    }
    onEnter = (status_bar_color) => {
        StatusBar.setBackgroundColor(status_bar_color, true);

    }
    onExit = () => {
        StatusBar.setBackgroundColor('#BDBDBD', true);
    }
    handleOnConfirmDate = () => {
        if (global.start_date && global.end_date) {
            global.isShow = true
            if (Actions.currentScene == 'ProductPageCalandarScreen') {
                // global.isAllowToEdit=true
                Actions.ProductPageScreen()
            }
        }
        else {
            Alert.alert("Invalid Start & End Date");
        }
    }
    renderProductPageRightButton = () => {
        return (
            <Right>
                <TouchableOpacity
                    onPress={this.handleOnConfirmDate}
                    style={{ justifyContent: 'center', alignItems: 'center', height: 50, width: 50 }} underlayColor='transparent'>
                    <Icon name='check' type='AntDesign' style={{ textAlign: 'center', color: 'white' }} />
                </TouchableOpacity>
            </Right>
        )
    }
    handleEditProfile = () => {
        Actions.EditProfileScreen()
    }
    handleBackButton = (scene) => {
        if (scene == "ProfileScreen") {
            Actions[scene].call(); // open new scene (new screen)
        } else {
            if (global.backFromScreen == 'login') {
                global.backFromScreen = undefined
                global.isBackICon = false
                Actions.tabbar();
            }
            else {
                if (scene == "ProductPageScreen") {
                    Actions.pop()
                }
                else if (scene == "tabbar") {
                    global.isBackICon = false
                    Actions.tabbar();
                }
                else if (scene == 'LoginScreen') {
                    Actions.reset('LoginScreen')
                }
                else {
                    Actions.pop(); // close current scene
                }
            }

        }
    }

    renderRightButton = () => {
        return (
            <Right>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 56, width: 56 }} underlayColor='transparent'>
                    <Icon name='edit' type='MaterialIcons' style={{ textAlign: 'center' }} onPress={this.handleEditProfile} />
                </TouchableOpacity>
            </Right>
        )
    }

    renderBackButton = (scene) => {
        return (
            <Left>
                <TouchableOpacity style={{ flex: 1, flexGrow: 1, padding: 15, justifyContent: 'flex-end', elevation: 0 }} underlayColor='transparent'
                    onPress={() => this.handleBackButton(scene)}
                >
                    <Icon name='arrow-back' style={{ fontSize: 23 }} />
                </TouchableOpacity>
            </Left>
        )
    }
    renderBackButtonWithColor = (scene, colorCode) => {
        return (
            <Left>
                <TouchableOpacity style={{ flex: 1, flexGrow: 1, padding: 15, justifyContent: 'flex-end' }} underlayColor='transparent'
                    onPress={() => this.handleBackButton(scene)}
                >
                    <Icon name='arrow-back' style={{ fontSize: 23, color: colorCode }} />
                </TouchableOpacity>
            </Left>
        )
    }

    _handleBooing = () => {
        alert('hello booking')
    }
    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar={true} >
                    {/* Use this statement while developing. */}
                    <Scene initial={true} key="LaunchScreen" component={LaunchScreen} title="LaunchScreen" hideNavBar={true} />
                    <Scene key="LoginScreen"
                        component={LoginScreen}
                        title="Login"
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        hideNavBar={false}
                        renderBackButton={() => this.renderBackButton("tabbar")}
                        navigationBarStyle={[styles.headerByPlatform, { elevation: 2 }]} />

                    <Scene key="RegisterScreen"
                        component={RegisterScreen}
                        title="Register"
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        hideNavBar={false} renderBackButton={() => this.renderBackButton("LoginScreen")}
                        navigationBarStyle={[styles.headerByPlatform, { elevation: 2 }]} />

                    <Scene key="OnBoardingScreen"
                        component={OnBoardingScreen}
                        title="OnBoardingScreen"
                        hideNavBar={true}
                        transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal })} />

                    <Scene key="FilterByLocationScreen"
                        component={FilterByLocationScreen}
                        title="Filter By Location"
                        hideNavBar={false}
                        navigationBarStyle={styles.headerByPlatform}
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        renderBackButton={() => this.renderBackButton("tabbar")}
                    />

                    <Scene
                        key="ActivityListScreen"
                        component={ActivityListScreen}
                        title="Impact Stays & Experience"
                        hideNavBar={false}
                        tintColor='white'
                        navigationBarStyle={[styles.headerByPlatform, { backgroundColor: '#FD7751', fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }]}
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        renderBackButton={() => this.renderBackButtonWithColor('tabbar', 'white')}
                    />

                    {/* Note: This is for default status bar color
                          We don't need to use onEnter() */}
                    <Scene key="TravelTipScreen"
                        component={TravelTipScreen}
                        title='Sustainable travel tips'
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        hideNavBar={false}
                        navigationBarStyle={styles.headerByPlatform}
                        renderBackButton={() => this.renderBackButton("tabbar")}
                    />

                    <Scene
                        key="TravelTipOpenedScreen"
                        component={TravelTipOpenedScreen}
                        title=""
                        hideNavBar={true}
                        tintColor='white'
                    // navigationBarStyle={{ elevation: 0, backgroundColor: global.headerColor }}
                    // titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20}}
                    />

                    <Scene key="AboutMeScreen"
                        component={AboutMeScreen}
                        title='About Me'
                        hideNavBar={false}
                        navigationBarStyle={styles.headerByPlatform}
                        renderRightButton={this.renderRightButton}
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        renderBackButton={() => this.renderBackButton("ProfileScreen")}
                    />

                    <Scene key="MyFavoriteScreen"
                        component={MyFavoriteScreen}
                        title='My favorites'
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        hideNavBar={false}
                        navigationBarStyle={styles.headerByPlatform}
                        renderBackButton={() => this.renderBackButton("ProfileScreen")}
                    />


                    <Scene key="SearchMapScreen"
                        component={SearchMapScreen}
                        title='Search map'
                        hideNavBar={false}
                        navigationBarStyle={styles.headerByPlatform}
                        renderBackButton={() => this.renderBackButton("FilterByLocationScreen")}
                    />
                    <Scene key="UseGPSMapScreen"
                        component={UseGPSMapScreen}
                        title='Search map'
                        hideNavBar={false}
                        navigationBarStyle={styles.headerByPlatform}
                        renderBackButton={() => this.renderBackButton("FilterByLocationScreen")}
                    />
                    <Scene key="BookingDetail"
                        component={BookingDetail}
                        title='Booking Detail'
                        hideNavBar={true}
                        navigationBarStyle={{ elevation: 0 }}
                    />

                    <Scene key="EditProfileScreen"
                        component={EditProfileScreen}
                        title='Edit'
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        hideNavBar={false}
                        navigationBarStyle={styles.headerByPlatform} />
                    <Scene key="ProjectScreen"
                        component={ProjectScreen}
                        title=''
                        hideNavBar={true} />
                    <Scene key="ProjectListScreen"
                        component={ProjectListScreen}
                        title=''
                        hideNavBar={true} />
                    <Scene
                        key="ForgetPwdScreen"
                        component={ForgetPwdScreen}
                        title=''
                        hideNavBar={false}
                        navigationBarStyle={[styles.headerByPlatform, { backgroundColor: 'transparent' }]} />

                    <Scene key="tabbar" tabs={true} tabBarStyle={styles.tabBar} hideNavBar={true} activeTintColor={'#FD7751'} inactiveTintColor={'#B1B1B1'} labelStyle={{ fontSize: 12 }}>
                        <Scene key="HomeScreen" component={HomeScreen} title="Home" hideNavBar={true} icon={({ focused }) => (
                            <Image resizeMode='contain' source={focused ? Images.iconHomeActive : Images.iconHome} style={{ width: 25 }} />
                        )} />
                        <Scene key="BookingScreen" component={BookingScreen} title="Booking" hideNavBar={true} icon={({ focused }) => (
                            <Image resizeMode='contain' source={focused ? Images.iconBookingActive : Images.iconBooking} style={{ width: 25 }} onPress={this._handleBooing} />
                        )} />
                        <Scene key="NewsScreen" component={NewsScreen} title="News" hideNavBar={true} icon={({ focused }) => (
                            <Image resizeMode='contain' source={focused ? Images.iconNewsActive : Images.iconNews} style={{ width: 25 }} />
                        )} />
                        <Scene key="ProfileScreen" component={ProfileScreen} title="Profile" hideNavBar={true} icon={({ focused }) => (
                            <Image resizeMode='contain' source={focused ? Images.iconProfileActive : Images.iconProfile} style={{ width: 25 }} />
                        )} />

                    </Scene>
                    <Scene key="SearchResult" component={SearchResult} hideNavBar={true} />
                    <Scene key="NewsPageScreen" component={NewsPageScreen} hideNavBar={true} />
                    <Scene key="BlogArticleScreen" component={BlogArticleScreen} hideNavBar={true} />
                    <Scene key="ProductPageScreen" component={ProductPageScreen} hideNavBar={true} />
                    <Scene
                        key="ProductPageCalandarScreen" component={ProductPageCalandarScreen}
                        title="Select your dates"
                        hideNavBar={false}
                        tintColor='white'
                        navigationBarStyle={[styles.headerByPlatform, { backgroundColor: '#FD7751' }]}
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        renderRightButton={this.renderProductPageRightButton} />
                    <Scene key="CartScreen"
                        component={CartScreen}
                        title='Cart'
                        tintColor='white'
                        hideNavBar={false}
                        navigationBarStyle={[styles.headerByPlatform, { backgroundColor: '#FD7751' }]}
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        renderBackButton={() => this.renderBackButtonWithColor(global.isBackICon ? "tabbar" : "ProductPageScreen", 'white')}
                    />
                    <Scene key="CheckoutScreen"
                        component={CheckoutScreen}
                        title='Checkout (1/2)'
                        tintColor='white'
                        hideNavBar={false}
                        navigationBarStyle={[styles.headerByPlatform, { backgroundColor: '#FD7751' }]}
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        renderBackButton={() => this.renderBackButtonWithColor("CartScreen", 'white')}
                    />
                    <Scene key="CheckoutCashScreen"
                        component={CheckoutCashScreen}
                        title='Checkout (2/2)'
                        tintColor='white'
                        hideNavBar={false}
                        navigationBarStyle={[styles.headerByPlatform, { backgroundColor: '#FD7751' }]}
                        titleStyle={{ fontFamily: Fonts.type.oswaldBold, fontWeight: 'bold',fontSize: 20 }}
                        renderBackButton={() => this.renderBackButtonWithColor("CheckoutScreen", 'white')}
                    />
                    <Scene key="ConfirmationScreen"
                        component={ConfirmationScreen}
                        hideNavBar={true}
                        navigationBarStyle={{ elevation: 0 }}
                    />
                    <Scene key="ProjectScreen"
                        component={ProjectScreen}
                        hideNavBar={true}
                        navigationBarStyle={{ elevation: 0 }}
                    />
                </Scene>

            </Router>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setHeader: (data) => dispatch(HeaderActions.setHeaderRequest(data))
    }
}

export default connect(null, mapDispatchToProps)(NavigationRouter);
