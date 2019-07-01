import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './Styles/AboutMeStyle'
import { connect } from 'react-redux'
import countries from '../Fixtures/countries.json'
import UserInfoActions from '../Redux/UserInfoRedux'

class AboutMeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersInfo: [],
            countryName: ''
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
        this.props.getUserInfoList()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    onBackButtonPressed = () => {
        Actions.ProfileScreen();
        return true;
    }

    componentWillReceiveProps(newProps) {
        if (Actions.currentScene == 'AboutMeScreen') {
            if (newProps.getUsers) {
                if (newProps.getUsers.fetching == false && newProps.getUsers.error == null && newProps.getUsers.payload.user) {
                    global.userInfo = []
                    global.userInfo.push(newProps.getUsers.payload.user)
                    let listUserInfo = newProps.getUsers.payload.user
                    this.state.usersInfo = []
                    this.state.usersInfo.push(listUserInfo)
                }
            }
        }
    }

    render() {
        if (this.props.fetchingUsers) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='#8E8E93' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                </View>
            )
        }
        return (
            <ScrollView horizontal={false} style={{ backgroundColor: '#fff' }} >
                {this.state.usersInfo.map((item, index) => {
                    return (
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.profilePic}>
                                <Image
                                    source={{ uri: item.photo }}
                                    style={styles.imgProfile} />
                                <Text style={styles.changeAvatar}></Text>
                            </TouchableOpacity>
                            <View style={styles.info}>
                                <Text style={styles.bigText}>{item.first_name + " " + item.last_name}</Text>
                                <Text style={styles.smallText}>Full name</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.bigText}>{item.display_name ? item.display_name : '—'}</Text>
                                <Text style={styles.smallText}>Display name</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.bigText}>{item.email ? item.email : '—'}</Text>
                                <Text style={styles.smallText}>Email</Text>
                            </View>
                            <View style={styles.info}>
                                {
                                    countries.map((con) => {
                                        if (con.countryCode == item.billing_info.country) {
                                            return (
                                                <Text style={styles.bigText}>{con.countryCode != '' ? con.countryName : '—'}</Text>
                                            )
                                        }
                                    })
                                }
                                <Text style={styles.smallText}>Country</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.bigText}>{item.billing_info.address ? item.billing_info.address : '—'}</Text>
                                <Text style={styles.smallText}>Street address</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.bigText}>{item.billing_info.city ? item.billing_info.city : '—'}</Text>
                                <Text style={styles.smallText}>Town / City</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.bigText}>{
                                    item.billing_info.postcode ? item.billing_info.postcode : "—"
                                }</Text>
                                <Text style={styles.smallText}>Postcode / ZIP</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.bigText}>{item.billing_info.phone ? item.billing_info.phone : "—"}</Text>
                                <Text style={styles.smallText}>Phone</Text>
                            </View>

                        </View>
                    )
                })}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getUsers: state.userInfo,
        fetchingUsers: state.userInfo.fetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfoList: () => dispatch(UserInfoActions.userInfoRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutMeScreen)