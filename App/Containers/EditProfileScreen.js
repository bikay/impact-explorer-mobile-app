import React, { Component } from 'react';
import {
    View, Text, ScrollView, TextInput, TouchableOpacity, BackHandler, Alert
} from 'react-native';

import styles from './Styles/EditProfileStyle'
import { ApplicationStyles } from '../Themes'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import UserInfoUpdateActions from '../Redux/UserInfoUpdateRedux'
import countries from '../Fixtures/countries.json'
import {Picker } from 'native-base';

let data;
class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: global.userInfo,
            statusLoading: false,
            countries: countries,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }

    _backHandler = () => {
        Actions.pop()
        return true
    }

    componentWillMount() {
        if (global.userInfo) {
            this.state.userInfo.map((item, index) => {
                this.setState({
                    full_name: item.first_name + ' ' + item.last_name,
                    display_name: item.display_name,
                    email: item.email,
                    country: item.billing_info.country,
                    street_addr: item.billing_info.address,
                    city: item.billing_info.city,
                    postCode: item.billing_info.postcode,
                    phone: item.billing_info.phone,
                    photo: item.photo
                });
            })
        }
    }

    componentWillReceiveProps(newProps) {
        if (Actions.currentScene == 'EditProfileScreen') {
            if (newProps.userUpdate.fetching == false && this.props.userUpdate.fetching == true && newProps.userUpdate.error == null) {
                if (newProps.userUpdate.payload) {
                    Actions.AboutMeScreen()
                }
            }
        }
    }

    // update user information 
    handleSaveUserInfo = () => {
        // str_full_name = this.state.full_name
        const { full_name, email, street_addr, city, postCode, phone, country } = this.state
        res = full_name.split(" ")
        first_name = res[0]
        last_name = res[1]
        data = {
            'first_name': first_name,
            'last_name': last_name,
            'user_email': email,
            'billing_address': street_addr,
            'billing_city': city,
            'billing_postcode': postCode,
            'billing_country': country,
            'billing_phone': phone
        }
        this.props.requestUpdateUsersInfo(data)
    }

    _handleEmail = (text) => {
        if (text) {
            Alert.alert("Sorry! ", 'If you want to modify your email please go to Impact explorer website',
              [
                { text: 'OK', onPress: () => null },
              ],
              { cancelable: false }
            )
          }
    }

    render() {
        return (
            <ScrollView horizontal={false} style={{ backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <View style={styles.editComponent}>
                        <Text style={styles.header}>Full name</Text>
                        <TextInput
                            value={this.state.full_name}
                            onChangeText={(full_name) => this.setState({ full_name })}
                            autoCorrect={false}
                            underlineColorAndroid={'#E0E0E0'}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.editComponent}>
                        <Text style={styles.header}>Email</Text>
                        <TextInput
                            value={this.state.email}
                            onChangeText={this._handleEmail}
                            autoCorrect={false}
                            maxLength={100}
                            underlineColorAndroid={'#E0E0E0'}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.editComponent}>
                        <Text style={styles.header}>Country</Text>
                        {/* <Picker
                            iosHeader="Selecione"
                            selectedValue={this.state.country}
                            onValueChange={(itemValue) => this.setState({ country: itemValue })}
                            mode='dialog'
                        >
                            {this.state.countries.map((item, index) => {
                                return (
                                        <Picker.Item style={styles.pickerText} label={item.countryName} value={item.countryCode} />
                                )
                            })}
                        </Picker> */}
                        <Picker
                            mode='dropdown'
                            selectedValue={this.state.country}
                            onValueChange={(itemValue) => this.setState({ country: itemValue })}>
                            {this.state.countries.map((item, index) => {
                                return (
                                    <Picker.Item style={styles.pickerText} label={item.countryName} value={item.countryCode} />
                                )
                            })}
                        </Picker>
                    </View>

                    <View style={styles.editComponent}>
                        <Text style={styles.header}>Street address</Text>
                        <TextInput
                            value={this.state.street_addr}
                            onChangeText={(street_addr) => this.setState({ street_addr })}
                            autoCorrect={false}
                            underlineColorAndroid={'#E0E0E0'}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.editComponent}>
                        <Text style={styles.header}>Town / City</Text>
                        <TextInput
                            value={this.state.city}
                            onChangeText={(city) => this.setState({ city })}
                            autoCorrect={false}
                            underlineColorAndroid={'#E0E0E0'}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.editComponent}>
                        <TextInput
                            placeholder={'Postcode / ZIP (optional)'}
                            value={this.state.postCode}
                            onChangeText={(postCode) => this.setState({ postCode })}
                            autoCorrect={false}
                            underlineColorAndroid={'#E0E0E0'}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.editComponent}>
                        <TextInput
                            placeholder={'Phone (optional)'}
                            value={this.state.phone}
                            keyboardType='numeric'
                            onChangeText={(phone) => this.setState({ phone })}
                            autoCorrect={false}
                            underlineColorAndroid={'#E0E0E0'}
                            style={styles.textInput}
                        />
                    </View>

                    <TouchableOpacity style={ApplicationStyles.button}
                        onPress={this.handleSaveUserInfo}
                    >
                        <Text style={ApplicationStyles.btnTitle}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userUpdate: state.userUpdate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestUpdateUsersInfo: (data) => dispatch(UserInfoUpdateActions.userInfoUpdateRequest(data)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)  