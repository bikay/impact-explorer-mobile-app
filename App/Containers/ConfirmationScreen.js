import React, { Component } from 'react'
import { Text, View, Image, TextInput, BackHandler,Dimensions,Platform } from 'react-native'
import { Metrics, Fonts, Colors, Images } from '../Themes'
import { Overlay, Button } from 'react-native-elements'
import { Card } from 'native-base'
import moment from 'moment'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux';

export default class ConfirmationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayVisible: true,
     screenHeight : Math.round(Dimensions.get('window').height)
    }
  }
  handleOnBackToMain = () => {
    global.selectedProduct = []
    global.numAddToCart = global.selectedProduct.length;
    Actions.tabbar()
  }
  onBackButtonPressed = () => {
    // global.selectedProduct=[]
    // global.numAddToCart = global.selectedProduct.length;
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
  }
  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
  }
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'column', padding: 16, backgroundColor: 'white' }}>
        <ScrollView>
          <View style={{ paddingTop: 15 }}>
            <Text
              style={{
                fontFamily: Fonts.type.oswaldBold,
                color: '#8CBC12',
                fontSize: 32
              }}
            >
              You are booked!{' '}
            </Text>
          </View>
          {global.selectedProduct.map((eachselectedProduct, index) => {
            this.subtotalprice = Number(this.subtotalprice) + Number(eachselectedProduct.finalPrice)
            this.bookingFeesPrice = this.subtotalprice * this.state.percentFees / 100
            global.totalAllPrice = this.subtotalprice + this.bookingFeesPrice
            return (
              <View style={{ paddingTop: 13 }}>
                <TouchableOpacity>
                  <Card style={{ borderRadius: 4 }}>
                    <View>
                      <Image style={{ width: '100%', height: 160 }}
                        source={{ uri: eachselectedProduct.image }}
                      />
                    </View>
                    <View>
                      <View style={{ padding: 10 }}>
                        <Text style={{ fontFamily: Fonts.type.oswaldMedium, fontSize: 18, color: 'black', paddingTop: 2 }} >
                          {eachselectedProduct.title}
                        </Text>
                        <Text style={{ paddingTop: 6 }}>
                          {moment(eachselectedProduct.tempStartDate).format('MMM, DD')} - {moment(eachselectedProduct.tempEndDate).format('MMM, DD')}     • {eachselectedProduct.personNumber}  Person
                        </Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              </View>
            )
          })}

          {/* end deleted Content create account */}
          <View style={{ flex: 1, paddingTop: 16, alignItems: 'center' }}>
            <TouchableOpacity onPress={this.handleOnBackToMain}>
              <View
                style={{
                  width: 250,
                  height: 50,
                  borderColor: '#FD7751',
                  borderWidth: 1,
                  borderRadius: 4,
                  backgroundColor: '#FD7751'
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: Fonts.type.oswaldMedium,
                    color: 'white',
                    fontSize: 16,
                    paddingTop: 10
                  }}
                >
                  {' '}
                  BACK TO MAIN PAGE
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Overlay
            isVisible={this.state.overlayVisible}
            windowBackgroundColor='rgba(0,0,0,0.4)'
            overlayBackgroundColor='white'
            onBackdropPress={() => this.setState({ overlayVisible: !this.state.overlayVisible })}
            width={Platform.OS=='android'?this.state.screenHeight>=732? "80%":"80%":this.state.screenHeight>=812? "80%":"80%"} height= {Platform.OS=='android'?this.state.screenHeight>=732? "53%":"61%":this.state.screenHeight>=812?"43%":"58%"}   
            borderRadius={5}>
            <View style={{ flex: 1, flexDirection: 'column', padding: 24, paddingTop: this.state.screenHeight>=732? 45:50, width: '100%', height: '100%', position: 'relative' }}  >
              <View style={{
                width: 100, height: 100, backgroundColor: 'white', borderRadius: 50, position: 'absolute',
                zIndex: 99999, top: -60, right: '37%'
              }}>
                <View>
                  <Image
                    style={{ width: 60, height: 60, alignSelf: 'center', marginTop: 20 }}
                    source={Images.like}
                  />
                </View>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontFamily: Fonts.type.oswaldBold, color: '#000000', fontSize: 30 }}>
                  Order Completed!
                  </Text>
              </View>
              <View style={{ paddingTop: 16 }}>
                <Text style={{ fontSize: 16 }}>
                  Thank you very much for your reservation, we will confirm
                    your booking within the next {'\n'}24 hours.{'\n'}
                  {'\n'}
                  Please note that no payment will be taken until the
                  reservation is confirmed.
                  </Text>
              </View>
              <View style={{ paddingTop: 30, alignItems: 'center' }}>
                <Button
                  buttonStyle={{
                    backgroundColor: "white",
                    width: 250,
                    height: 50,
                    borderColor: "#FD7751",
                    borderWidth: 1
                  }}
                  titleStyle={{
                    textAlign: 'center', fontFamily: Fonts.type.oswaldMedium, color: '#FD7751', fontSize: 16,
                  }}
                  title='OK,THANKS'
                  onPress={() => this.setState({ overlayVisible: !this.state.overlayVisible })} />
              </View>
            </View>
          </Overlay>
        </ScrollView>
      </View>
    )
  }
}
