import React, { Component } from 'react'
import { Text, View, TextInput, Keyboard, Alert, BackHandler } from 'react-native'
import { Picker } from 'native-base';
import styles from './Styles/CheckoutScreenStyle'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { Metrics, Fonts, Colors } from '../Themes'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import UserInfoActions from '../Redux/UserInfoRedux'
import UserInfoUpdateActions from '../Redux/UserInfoUpdateRedux'
import { connect } from 'react-redux';
import countries from '../Fixtures/countries.json'

class CheckoutScreen extends Component {
  constructor() {
    super()
    this.state = {
      usersInfo: [],
      fullName: null,
      email: null,
      country: null,
      streetAddress: null,
      townCity: null,
      postcode: null,
      phone: null,
      statusKeyboard: false,
      percentFees: 15,
      countries: countries,
    }
  }
  componentWillMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);
  };
  keyboardDidShow = e => {
    this.setState({ statusKeyboard: true })
  }
  keyboardDidHide = e => {
    this.setState({ statusKeyboard: false })
  }
  handleOnPaymentMethod = () => {
    const { fullName, email, country, streetAddress, townCity, phone, postcode } = this.state
    if (fullName && email && country && streetAddress && townCity) {
      str_full_name = fullName
      res = str_full_name.split(" ")
      first_name = res[0]
      last_name = res[1]
      data = {
        'first_name': first_name,
        'last_name': last_name,
        'user_email': email,
        'billing_address': streetAddress,
        'billing_city': townCity,
        'billing_postcode': postcode,
        'billing_country': country,
        'billing_phone': phone
      }
      this.props.requestUpdateUsersInfo(data)
      Actions.CheckoutCashScreen()
    }
    else {
      if (!fullName) {
        this.setState({ fullName: '' })
      }
      if (!email) {
        this.setState({ email: '' })
      }
      if (!streetAddress) {
        this.setState({ streetAddress: '' })
      }
      if (!townCity) {
        this.setState({ townCity: '' })
      } if (!country) {
        this.setState({ country: '' })
      }
    }
  }
  componentDidMount() {
    this.props.getUserInfoList()
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
  }

  onBackButtonPressed() {
    Actions.pop()
    return true
  }
  componentWillReceiveProps(newProps) {
    if (newProps.getUsers) {
      if (newProps.getUsers.fetching == false && newProps.getUsers.error == null && newProps.getUsers.payload.user) {
        let listUserInfo = newProps.getUsers.payload.user
        this.state.usersInfo = []
        this.state.usersInfo.push(listUserInfo)
        let fullName = listUserInfo.first_name + " " + listUserInfo.last_name
        this.setState({
          fullName: fullName,
          email: listUserInfo.email,
          country: listUserInfo.billing_info.country,
          streetAddress: listUserInfo.billing_info.address,
          townCity: listUserInfo.billing_info.city,
          postcode: listUserInfo.billing_info.postcode,
          phone: listUserInfo.billing_info.phone,
        })
      }
    }
  }

  handleEmail = (text) => {
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
    this.subtotalprice = 0
    this.bookingFeesPrice = 0
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.container}>
          <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 16, paddingRight: 24, }}>
              <View style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 16, fontFamily: Fonts.type.oswaldMedium, color: 'black' }}>Order Info</Text>
              </View>
              <TouchableOpacity>
                <View>
                  <Text style={{ fontSize: 16, fontFamily: Fonts.type.oswaldMedium, color: '#FD7751', marginTop: 8 }}>Total: ${global.totalAllPrice}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {global.selectedProduct.map((eachselectedProduct, index) => {
              this.subtotalprice = Number(this.subtotalprice) + Number(eachselectedProduct.finalPrice)
              this.bookingFeesPrice = this.subtotalprice * this.state.percentFees / 100
              return (
                <View style={[styles.detailStyle, { textAlign: 'center' }]}>
                  <View style={{ width: 300, paddingBottom: 10 }}>
                    <Text style={styles.textStyle}>
                      {eachselectedProduct.title}
                      {'\n'}Booking Date: {moment(eachselectedProduct.tempStartDate).format('MMM, DD')} - {moment(eachselectedProduct.tempEndDate).format('MMM, DD')}{' '}
                      {'\n'}Persons: {eachselectedProduct.personNumber}
                    </Text>
                  </View>
                </View>
              )
            })}
            <View style={{ paddingTop: 18 }}>
              <Text style={{ ontSize: 16, fontFamily: Fonts.type.oswaldMedium, color: 'black' }}>
                Personal info
              </Text>
            </View>
            <View>
              <TextInput
                placeholder={'Full name'}
                autoCorrect={false}
                underlineColorAndroid={'#E0E0E0'}
                style={styles.textInput}
                onChangeText={fullName => this.setState({ fullName })}
                value={this.state.fullName}
              />
              {this.state.fullName == '' ? (
                <View style={{ paddingLeft: 5, marginTop: -5 }}>
                  <Text style={{ color: '#D72E2B', fontSize: 13 }}>
                    Please fill your full name
                  </Text>
                </View>
              ) : null}
            </View>
            <View>
              <TextInput
                placeholder={'Email'}
                autoCorrect={false}
                underlineColorAndroid={'#E0E0E0'}
                style={styles.textInput}
                onChangeText={this.handleEmail}
                value={this.state.email}
              />
            </View>
            <View>
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
              {this.state.country == '' ? (
                <View style={{ paddingLeft: 5, marginTop: -5 }}>
                  <Text style={{ color: '#D72E2B', fontSize: 13 }}>
                    Please fill your Country
                  </Text>
                </View>
              ) : null}
            </View>
            <View>
              <TextInput
                placeholder={'Street address'}
                autoCorrect={false}
                underlineColorAndroid={'#E0E0E0'}
                style={styles.textInput}
                onChangeText={streetAddress => this.setState({ streetAddress })}
                value={this.state.streetAddress}
              />
              {this.state.streetAddress == '' ? (
                <View style={{ paddingLeft: 5, marginTop: -5 }}>
                  <Text style={{ color: '#D72E2B', fontSize: 13 }}>
                    Please fill your Street address
                  </Text>
                </View>
              ) : null}
            </View>
            <View>
              <TextInput
                placeholder={'Town / City'}
                autoCorrect={false}
                underlineColorAndroid={'#E0E0E0'}
                style={styles.textInput}
                onChangeText={townCity => this.setState({ townCity })}
                value={this.state.townCity}
              />
              {this.state.townCity == '' ? (
                <View style={{ paddingLeft: 5, marginTop: -5 }}>
                  <Text style={{ color: '#D72E2B', fontSize: 13 }}>
                    Please fill your Town / City
                  </Text>
                </View>
              ) : null}
            </View>
            <View>
              <TextInput
                placeholder={'Postcode / ZIP (optional)'}
                autoCorrect={false}
                onChangeText={(postcode) => this.setState({ postcode })}
                underlineColorAndroid={'#E0E0E0'}
                style={styles.textInput}
                value={this.state.postcode}
              />
            </View>
            <View>
              <TextInput
                placeholder={'Phone (optional)'}
                autoCorrect={false}
                onChangeText={(phone) => this.setState({ phone })}
                underlineColorAndroid={'#E0E0E0'}
                style={styles.textInput}
                value={this.state.phone}
              />
            </View>
          </ScrollView>
        </View>
        {this.state.statusKeyboard ? <View /> :
          <View style={styles.buttonAddToCard}>
            <TouchableOpacity onPress={this.handleOnPaymentMethod}>
              <Text style={[styles.textButtonAddToCard, { textAlign: 'center' }]}>
                CONTINUE TO PAYMENT METHOD
              </Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    getUsers: state.userInfo,
    userUpdate: state.userUpdate
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserInfoList: () => dispatch(UserInfoActions.userInfoRequest()),
    // clearUserToken: () => dispatch(SetAuthTokenActions.clearUserTokenRequest()),
    requestUpdateUsersInfo: (data) => dispatch(UserInfoUpdateActions.userInfoUpdateRequest(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen)