import React, { Component } from 'react'
import styles from './Styles/CheckoutCashScreenStyle'
import { Images, ApplicationStyles } from '../Themes'
import { Text, View, StatusBar, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native'
import { Metrics, Fonts, Colors } from '../Themes'
import { CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux';
import CheckoutActions from '../Redux/CheckoutRedux'
import { connect } from 'react-redux';
import moment from 'moment'
import stripe from 'tipsi-stripe';



class CheckoutCashScreen extends Component {
  constructor() {
    super()
    this.state = {
      valueTest: 'ValueTest',
      isPayWithCreditCard: false,
      checked: false,
      // inset data to booking
      persons: null,
      start_date: null,
      bookable_product_id: null,
      status: null,
      numberIsNull: false,
      expMonthIsNull: false,
      expYearIsNull: false,
      cvcIsNull: false,
      number: null,
      expMonth: null,
      expYear: null,
      cvc: null,
      payment_token: ''
    }
  }
  onSelectPaymentWithCreditCard = () => {
    this.setState({ isPayWithCreditCard: true })
  }
  onSelectPayWithCashAtDestination = () => {
    this.setState({ isPayWithCreditCard: false })
  }
  handleOnPlaceOrder = () => {
    stripe.setOptions({
      // publishableKey: 'pk_test_X2cKi2GUiwJHn4VQ831RRpfc',
      publishableKey: 'pk_live_cmk8xdisP1oHOOuz9c63dt6r',
      // merchantId: 'MERCHANT_ID', // Optional
      androidPayMode: 'test', // Android only
    });
    let { number, expMonth, expYear, cvv, numberIsNull, expMonthIsNull, expYearIsNull, cvcIsNull } = this.state
    let productData = []
    products = []
    if (this.state.checked == true) {
      if (this.state.isPayWithCreditCard == true) {
        if (number && expMonth && expYear && cvv) {
          stripe.createTokenWithCard({
            number: number,
            expMonth: parseInt(expMonth),
            expYear: parseInt(expYear),
            cvc: cvv,
            currency: 'usd',
          }).then((result) => {
            global.selectedProduct.map((eachselectedProduct, index) => {
              let data = {
                start_date: moment(eachselectedProduct.tempStartDate).format('YYYY-MM-DD'),
                end_date: moment(eachselectedProduct.tempEndDate).format('YYYY-MM-DD'),
                persons: eachselectedProduct.personNumber,
                bookable_product_id: eachselectedProduct.productId,
                status: "completed"
              }
              productData.push(data)

              this.props.requestCheckoutData({ products: productData, "payment_token": result.tokenId, "payment_method": "stripe" })
            })
          }).catch(err => alert(err))
        }
        else {
          if (!number) {
            this.setState({ numberIsNull: true });
          }
          if (!expMonth) {
            this.setState({ expMonthIsNull: true });
          }
          if (!expYear) {
            this.setState({ expYearIsNull: true });
          }
          if (!cvv) {
            this.setState({ cvcIsNull: true });
          }
        }
      }
      else {
        global.selectedProduct.map((eachselectedProduct, index) => {
          let data = {
            start_date: moment(eachselectedProduct.tempStartDate).format('YYYY-MM-DD'),
            end_date: moment(eachselectedProduct.tempEndDate).format('YYYY-MM-DD'),
            persons: eachselectedProduct.personNumber,
            bookable_product_id: eachselectedProduct.productId,
            status: "pending-payment"
          }
          productData.push(data)
          this.props.requestCheckoutData({ products: productData, "payment_method": "cash" })
        })
      }
    }
    else {
      return Alert.alert(
        '',
        'Please accept our T&C and policy first.',
        [
          {
            text: 'OK', onPress: () => {
            }
          },
        ],
        { cancelable: false },
      );
    }
  }
  componentWillReceiveProps(newProps) {
    const { fetching, error, payload } = newProps.postCheckoutData
    if (fetching == false && this.props.postCheckoutData.fetching == true && error == null) {
      if (payload.message == "Your Payment was Successful" || payload.message == "Success booking") {
        Actions.ConfirmationScreen()
      }
    }
    else if (fetching == false && error == true) {
      return Alert.alert(
        '',
        payload.message,
        [
          {
            text: 'OK', onPress: () => {
            }
          },
        ],
        { cancelable: false },
      );
    }
  }
  requestPayment = () => {
    return stripe.paymentRequestWithCardForm()
      .then(token_payment => {
        this.setState({ token_payment })
      })
      .catch(error => {
        Alert.alert("Cancel payment.")
        console.warn('Cancel failed', { error });
      });
  };
  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  }
  render() {
    const { numberIsNull, expMonthIsNull, expYearIsNull, cvcIsNull } = this.state
    if (this.props.fetching) {
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ActivityIndicator size="large" color='#99A3A4' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        </View>
      )
    }
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.container}>
          <ScrollView>
            <View style={[styles.paymentMethodContainer, { height: this.state.isPayWithCreditCard ? 300 : 170 }]}>
              <View>
                <Text style={styles.textStyle}>Payment method</Text>
              </View>
              <View style={{ paddingTop: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={this.onSelectPaymentWithCreditCard}
                >
                  <View style={{
                    borderRadius: 100, width: 20, height: 20, borderColor: this.state.isPayWithCreditCard ? '#E56642' : '#8E8E93',
                    borderWidth: 2.5, alignItems: 'center', justifyContent: 'center'
                  }}>
                    {this.state.isPayWithCreditCard ?
                      <View style={{
                        borderRadius: 100, width: 10, height: 10, borderColor: '#E56642',
                        borderWidth: 1, backgroundColor: '#E56642'
                      }}>
                      </View> : null
                    }
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onSelectPaymentWithCreditCard} >
                  <Text style={{ color: 'black', paddingLeft: 5 }}>
                    Pay with credit card
                </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  paddingTop: 15,
                  flexDirection: 'row',
                  paddingLeft: 40,
                  justifyContent: 'space-between'
                }}
              >
                <Image
                  style={{ width: 52, height: 31, borderColor: '#f2e1dc' }}
                  source={Images.american}
                />

                <Image
                  style={{ width: 52, height: 31, borderColor: '#f2e1dc' }}
                  source={Images.visa}
                />

                <Image
                  style={{ width: 52, height: 31, borderColor: '#f2e1dc' }}
                  source={Images.master}
                />

                <Image
                  style={{ width: 52, height: 31, borderColor: '#f2e1dc' }}
                  source={Images.discovery}
                />

                <Image
                  style={{ width: 52, height: 31, borderColor: '#f2e1dc' }}
                  source={Images.jcb}
                />
              </View>
              {this.state.isPayWithCreditCard ?
                <View style={{ paddingTop: Platform.OS == 'ios' ? 10 : null }}>
                  <View style={{ paddingTop: 8 }}>
                    <TextInput
                      onChangeText={number => {
                        this.setState({ number })
                        if (number && number.length == 16) {
                          this.refs.expMonth.focus();
                        }
                      }}
                      placeholder={'Card number'}
                      autoCorrect={false}
                      maxLength={16}
                      placeholderTextColor={numberIsNull ? 'red' : ''}
                      underlineColorAndroid={'#dbc7c7'}
                      onSubmitEditing={() => this.focusNextField('2')}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: Platform.OS == 'ios' ? 16 : 8, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', width: '50%' }}>
                      <View style={{ width: '35%', alignSelf: 'center' }}>
                        <TextInput
                          onChangeText={expMonth => {
                            this.setState({ expMonth })
                            if (expMonth && expMonth.length == 2) {
                              this.refs.expYear.focus();
                            }
                          }}
                          placeholder={'MM'}
                          maxLength={2}
                          ref="expMonth"
                          placeholderTextColor={expMonthIsNull ? 'red' : ''}
                          autoCorrect={false}
                          underlineColorAndroid={'#dbc7c7'}
                          onSubmitEditing={() => this.focusNextField('3')}
                        />
                      </View>
                      <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 24, color: 'lightgrey' }}>/</Text>
                      </View>
                      <View style={{ width: '35%', marginLeft: 8, alignSelf: 'center' }}>
                        <TextInput
                          onChangeText={expYear => {
                            this.setState({ expYear })
                            if (expYear && expYear.length == 4) {
                              this.refs.cvv.focus();
                            }
                          }}
                          placeholder={'YYYY'}
                          autoCorrect={false}
                          maxLength={4}
                          ref="expYear"
                          onSubmitEditing={() => this.focusNextField('4')}
                          placeholderTextColor={expYearIsNull ? 'red' : ''}
                          underlineColorAndroid={'#dbc7c7'}
                        />
                      </View>
                    </View>
                    <View style={{ width: '50%', alignSelf: 'center' }}>
                      <TextInput
                        onChangeText={(cvv) => this.setState({ cvv })}
                        placeholder={'CVV'}
                        maxLength={3}
                        ref="cvv"
                        placeholderTextColor={cvcIsNull ? 'red' : ''}
                        autoCorrect={false}
                        underlineColorAndroid={'#dbc7c7'}
                      />
                    </View>
                  </View>
                </View>
                : null}
              <View style={{ paddingTop: 20, flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.onSelectPayWithCashAtDestination}>
                  <View style={{
                    borderRadius: 100, width: 20, height: 20, borderColor: !this.state.isPayWithCreditCard ? '#E56642' : '#8E8E93',
                    borderWidth: 2.5, alignItems: 'center', justifyContent: 'center'
                  }}>
                    {!this.state.isPayWithCreditCard ?
                      <View style={{
                        borderRadius: 100, width: 10, height: 10, borderColor: '#E56642',
                        borderWidth: 1, backgroundColor: '#E56642'
                      }}>
                      </View> : null
                    }
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onSelectPayWithCashAtDestination} >
                  <Text style={{ color: 'black', paddingLeft: 5 }}>
                    Pay with cash at destination
                </Text>
                </TouchableOpacity>

              </View>
            </View>
            <View style={{ paddingTop: 24, paddingBottom: 8 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.type.oswaldMedium,
                  color: 'black'
                }}
              >
                Additional info
            </Text>
            </View>
            <View>
              <TextInput
                placeholder={'Order notes (optional)'}
                autoCorrect={false}
                underlineColorAndroid={'#E0E0E0'}
                style={styles.textInput}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.setState({ checked: !this.state.checked })}
              style={{ flex: 1, flexDirection: 'row', paddingTop: -15 }}>
              <View style={{ width: '12%', marginRight: 2, marginLeft: -12 }}>
                <CheckBox
                  checkedColor={'#FD7751'}
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
              </View>
              <View style={{ width: '90%' }}>
                <Text style={{ fontSize: 17, color: 'black', fontFamily: Fonts.type.muli, paddingTop: 10, paddingLeft: 7 }}>
                  I confirm I have read and understood the terms and conditions and Cancellation policy*
              </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View>
          <TouchableOpacity
            onPress={this.handleOnPlaceOrder}
          >
            <View style={styles.btnPlaceOrderContainer}>
              <Text style={[styles.textPlaceOrder, { textAlign: 'center' }]}>PLACE ORDER</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    postCheckoutData: state.checkout,
    fetching: state.checkout.fetching
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestCheckoutData: (data) => dispatch(CheckoutActions.checkoutRequest(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutCashScreen)