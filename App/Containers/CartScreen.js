import React, { Component } from 'react'
import { Images, ApplicationStyles, Fonts } from '../Themes'
import styles from './Styles/CartScreenStyle'
import { Icon } from 'native-base'
import { Alert, Text, View, FlatList, TouchableOpacity, Image, BackHandler, AsyncStorage } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'
import { Overlay, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
export default class CartScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: this.props.selectedProduct,
      inClick: false,
      finalPrice: 0,
      percentFees: 15,
      total: 0,
      personNumber: 1,
      startDate: null,
      endDate: null,
      token: null,
      statusRemove: false,
      overlayVisible: true,
    }
    this.subtotalprice = 0
    this.bookingFees = 0
    this.total = 0
    global.totalAllPrice = 0
    global.screenName = global.screenName ? global.screenName : null
    global.backFromScreen = this.props.backFromScreen ? this.props.backFromScreen : global.backFromScreen
  }

  handleOnProcessToCheckout = () => {
    let personNumber = this.state.personNumber
    let startDate = this.state.startDate
    let endDate = this.state.endDate
    let total = this.state.total
    AsyncStorage.multiGet(["LoginStatus", "userToken"]).then(response => {
      const LoginStatus = response[0][1];
      const userToken = response[1][1];
      if (LoginStatus) {
        if (Actions.currentScene == 'CartScreen') {
          Actions.CheckoutScreen({ personNumber, startDate, endDate, total })
        }
      }
      else {
        return Alert.alert(
          'Please login or register',
          'Please sign in to make a booking.',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
            {
              text: 'Go to Login', onPress: () => {
                global.screenName = "CartScreen"
                Actions.LoginScreen()
              }
            },
            { cancelable: false },
          ],
        );
      }
    })
  }
  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    let { finalPrice, startDate, endDate, startDateWithCurrenctScreen, endDateWithCurrenctScreen, personNumber, percentFees } = this.state
    priceFee = (finalPrice * percentFees) / 100
    let total = Number(priceFee) + Number(finalPrice)
    this.setState({
      personNumber,
      finalPrice,
      priceFee,
      total,
      startDate: startDate == undefined && endDate == undefined ? startDateWithCurrenctScreen : startDate,
      endDate: startDate == undefined && endDate == undefined ? endDateWithCurrenctScreen : endDate
    })
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
  }
  onBackButtonPressed() {
    if (global.backFromScreen == undefined) {
      Actions.pop()
    }
    else {
      global.backFromScreen = undefined
      Actions.reset('ProductPageScreen')
    }
    return true;
  }
  handleOnAddMore = () => {
    global.isBackICon = false
    if (Actions.currentScene == 'CartScreen') {
      Actions.ActivityListScreen()
    }
  }
  hanleOnRemoveItem = (index) => {
    global.selectedProduct.splice(index, 1);
    global.numAddToCart = global.selectedProduct.length
    this.setState({ statusRemove: true });
    if (global.selectedProduct.length == 0) {
      Actions.tabbar()
    }
  }
  handleOnEditProduct = (eachselectedProduct, index) => {
    const { productId } = eachselectedProduct
    global.isAllowToEdit = true
    if (Actions.currentScene == 'CartScreen') {
      Actions.ProductPageScreen({ id: productId, index: index, eachselectedProduct: eachselectedProduct, isEditScreenName: 'cartSreen' })
    }
  }
  render() {
    this.subtotalprice = 0
    this.bookingFeesPrice = 0
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.container}>
          <ScrollView>
            {/* custome overlay but now not  */}
            {/* <Overlay
              isVisible={this.state.overlayVisible}
              windowBackgroundColor='rgba(0,0,0,0.4)'
              overlayBackgroundColor='white'
              onBackdropPress={() => this.setState({ overlayVisible: !this.state.overlayVisible })}
              width="80%" height="65%"
              borderRadius={5}>
              <View style={{ flex: 1, flexDirection: 'column', padding: 20, paddingTop: 70, width: '100%', height: '100%', position: 'relative' }}  >
                
                <View style={{flexDirection: 'row', borderColor: '#B1B1B1', borderRadius: 5, borderWidth: 1, height: 55,padding:5 }}>
                  <View style={{ width: 25, height: 25, paddingTop: 8 }}>
                    <Icon
                      name='facebook'
                      type="FontAwesome5"
                      size={60}
                      style={{ height: 60, width: 60, color: 'blue' }} />
                  </View>
                  <View style={{ height: 40, }}>
                    <Button
                      onPress={() => this.handleFacebookLogin}
                      buttonStyle={{
                        backgroundColor: 'white',
                        width: '100%',
                        flexDirection: 'row',
                      }}
                      titleStyle={{
                        fontFamily: Fonts.type.muli,
                        fontSize: Fonts.size.medium,
                        color: '#000',
                      }}
                      title='Continue with Google' />
                  </View>
                </View>

                <View style={{flexDirection: 'row', borderColor: '#B1B1B1', borderRadius: 5, borderWidth: 1, height: 55,padding:5 }}>
                  <View style={{ width: 25, height: 25, paddingTop: 8 }}>
                    <Icon
                      name='facebook'
                      type="FontAwesome5"
                      size={60}
                      style={{ height: 60, width: 60, color: 'blue' }} />
                  </View>
                  <View style={{ height: 40, }}>
                    <Button
                      onPress={() => this.handleFacebookLogin}
                      buttonStyle={{
                        backgroundColor: 'white',
                        width: '100%',
                        flexDirection: 'row',
                      }}
                      titleStyle={{
                        fontFamily: Fonts.type.muli,
                        fontSize: Fonts.size.medium,
                        color: '#000',
                      }}
                      title='Continue with Google' />
                  </View>
                </View>

                <View style={{flexDirection: 'row', borderColor: '#B1B1B1', borderRadius: 5, borderWidth: 1, height: 55,padding:5 }}>
                  <View style={{ width: 25, height: 25, paddingTop: 8 }}>
                    <Icon
                      name='facebook'
                      type="FontAwesome5"
                      size={60}
                      style={{ height: 60, width: 60, color: 'blue' }} />
                  </View>
                  <View style={{ height: 40, }}>
                    <Button
                      onPress={() => this.handleFacebookLogin}
                      buttonStyle={{
                        backgroundColor: 'white',
                        width: '100%',
                        flexDirection: 'row',
                      }}
                      titleStyle={{
                        fontFamily: Fonts.type.muli,
                        fontSize: Fonts.size.medium,
                        color: '#000',
                      }}
                      title='Continue with Google' />
                  </View>
                </View>
              </View>
            </Overlay> */}
            {/*end  custome overlay but now not  */}
            {global.selectedProduct.map((eachselectedProduct, index) => {
              this.subtotalprice = Number(this.subtotalprice) + Number(eachselectedProduct.finalPrice)
              this.bookingFeesPrice = this.subtotalprice * this.state.percentFees / 100
              global.totalAllPrice = this.subtotalprice + this.bookingFeesPrice
              return (
                <TouchableOpacity style={styles.cardHeader}
                  onPress={() => this.handleOnEditProduct(eachselectedProduct, index)}
                >
                  <Image style={{ width: '30%', height: '90%', borderRadius: 4 }} source={{ uri: eachselectedProduct.image }} />
                  <View style={styles.articleContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, }}>
                      <Text style={styles.articleText}>{eachselectedProduct.title}</Text>
                      <TouchableOpacity onPress={() => this.hanleOnRemoveItem(index)}>
                        <Icon name='remove' type='FontAwesome' style={{ color: '#FD7751', width: 34, height: 26, paddingRight: 13 }} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, }}>
                      <Text style={styles.articleDate}>{moment(eachselectedProduct.tempStartDate).format('MMM, DD')} - {moment(eachselectedProduct.tempEndDate).format('MMM, DD')}</Text>
                      <Text style={styles.articleDate}> {eachselectedProduct.personNumber} pers. </Text>
                      <Text style={styles.articlePriceColor}>${eachselectedProduct.finalPrice}</Text>
                    </View>
                  </View>
                </TouchableOpacity>)
            })}
            <View style={{ flex: 1, paddingTop: 16, alignItems: 'center' }}>
              <TouchableOpacity onPress={this.handleOnAddMore}>
                <View style={styles.btnContainer}>
                  <Text style={[styles.textAddMore, { textAlign: 'center' }]}>ADD MORE</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 33 }}>
              <Text style={styles.articleTotal}>Subtotal: </Text>
              <Text style={styles.articlePrice}>${this.subtotalprice}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 33 }}>
              <Text style={styles.articleTotal}>Booking fees ({this.state.percentFees}%): </Text>
              <Text style={styles.articlePrice}>${this.bookingFeesPrice}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 33 }}>
              <Text style={styles.articleTotal}>Total: </Text>
              <Text style={styles.articlePrice}>${this.bookingFeesPrice + this.subtotalprice}</Text>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity onPress={this.handleOnProcessToCheckout}>
          <View style={styles.btnProceedToCheckoutContainer}>
            <Text style={[styles.textProceedToCheckout, { textAlign: 'center' }]}>PROCEED TO CHECKOUT</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

