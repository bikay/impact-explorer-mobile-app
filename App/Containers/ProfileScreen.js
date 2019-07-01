import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './Styles/ProfileStyle'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import UserInfoActions from '../Redux/UserInfoRedux'
import SetAuthTokenActions from '../Redux/SetAuthTokenRedux'
import LoginActions from '../Redux/LoginRedux'

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData:
            {
                id: 1,
                name: 'Alexandra',
                joined_date: 'Member since April 2018',
                img_profile: 'https://i.kinja-img.com/gawker-media/image/upload/s--cHvBEwUB--/c_scale,f_auto,fl_progressive,q_80,w_800/e7fdwhuq09iuhcfa9j1c.png'
            },
            settingMenu: [
                { id: 1, title: 'About me', component: "AboutMeScreen" },
                { id: 2, title: 'My favorites', component: "MyFavoriteScreen" },
                // { id: 3, title: 'Notifications', component: "NotificationScreen" },
                // { id: 4, title: 'Invite friends', component: "InviteFriendScreen" },
                // { id: 5, title: 'Payment details', component: "PaymentDetailScreen" },
                // { id: 6, title: 'Settings', component: "SettingsScreen" },
                // { id: 7, title: 'Get help', component: "GetHelpScreen" },
                // { id: 8, title: 'Terms & Conditions', component: "TermConditionScreen" },
            ],
            usersInfo: [],
            statusLogout: false,
            statusLogin: false,
            inClick: false
        }
        global.screenName = global.screenName ? global.screenName : null;
    }
    componentDidMount() {
        this.props.getUserInfoList()
    }
    componentWillReceiveProps(newProps) {
        AsyncStorage.multiGet(["userToken"]).then(response => {
            const userToken = response[0][1];
            if (userToken != null) {
                if (newProps.getUsers) {
                    if (newProps.getUsers.fetching == false && newProps.getUsers.error == null && newProps.getUsers.payload.user) {
                        let listUserInfo = newProps.getUsers.payload.user
                        this.state.usersInfo = []
                        this.state.usersInfo.push(listUserInfo)
                        this.setState({ statusLogout: false })
                    }
                }
            }
        })

    }
    componentWillMount = () => {
        AsyncStorage.multiGet(["userToken"]).then(response => {
            const userToken = response[0][1];
            if (userToken != null) {
                this.setState({ statusLogin: true })
            } else {
                return Alert.alert(
                    'Please login or register',
                    'Please sign in to access your personal information.',
                    [
                        { text: 'Cancel', onPress: () => Actions.tabbar(), style: 'cancel' },
                        {
                            text: 'Sign in', onPress: () => {
                                global.screenName = "ProfileScreen"
                                Actions.LoginScreen()
                            }
                        },
                    ],
                    { cancelable: false },
                );
            }
        })
    };
    handleToAnotherScreen = (screen, index) => {
        this.setState({ inClick: true })
        Actions[screen.component].call();
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }
    logout = () => {
        this.props.clearUserToken()
        this.props.logout()
        AsyncStorage.removeItem('persist:primary');
        AsyncStorage.multiRemove(['userToken', 'LoginStatus']);
        AsyncStorage.clear()
        this.setState({ statusLogout: true, statusLogin: false })
        setTimeout(() => {
            Actions.reset('LoginScreen')
        }, 2000);
    }
    render() {
        if (this.state.statusLogout) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='#8E8E93' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                {this.state.usersInfo.map((data, index) => {
                    return (
                        <View style={styles.profile}>
                            <Image
                                source={{ uri: data.photo }}
                                style={styles.imgProfile} />
                            <View style={styles.profileInfo}>
                                <Text style={styles.username}>{data.display_name}</Text>
                            </View>
                        </View>
                    )
                })
                }
                <View style={styles.profileMenu}>
                    <ScrollView horizontal={false}>
                        {this.state.settingMenu.map((screen, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => !this.state.inClick ? this.handleToAnotherScreen(screen, index) : null}
                                >
                                    <Text style={styles.menuTitle}>{screen.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                        }
                        {this.state.statusLogin == true ?
                            <TouchableOpacity onPress={this.logout}>
                                <Text style={[styles.menuTitle, { color: 'red' }]}>Logout</Text>
                            </TouchableOpacity>
                            : null
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const props = (state) => {
    return {
        getUsers: state.userInfo,
        logoutClearAuth: state.clearToken
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUserInfoList: () => dispatch(UserInfoActions.userInfoRequest()),
    clearUserToken: () => dispatch(SetAuthTokenActions.clearUserTokenRequest()),
    logout: () => dispatch(LoginActions.logoutRequest()),
})

export default connect(props, mapDispatchToProps)(ProfileScreen)