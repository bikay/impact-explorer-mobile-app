import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, FlatList, Alert, ActivityIndicator, AsyncStorage, BackHandler } from 'react-native'
import styles from './Styles/ProductPageStyle'
import { ApplicationStyles, Images, Fonts } from '../Themes'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import 'moment/min/locales'
import moment from 'moment'
import { Icon } from 'native-base'
import ProductPageActions from '../Redux/ProductPageRedux'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import _ from 'lodash'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import SaveFavoriteActions from '../Redux/SaveFavoriteRedux'

import ProductPageCalandarScreen from './ProductPageCalandarScreen';

const XDate = require('xdate');
var mapStyle = require('../../mapStyle.json');

class ProductPageScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booking_duration: 0,
      available: '',
      disable_key_dates: [],
      productPageData: [],
      selectedProduct: [],
      price: 0,
      finalPrice: 0,
      sidebarTitle: '',
      main_image: '',
      personNumber: global.personNumber ? global.personNumber : 1,
      scrollY: 0,
      isShow: global.isShow ? global.isShow : false,
      start_date: global.start_date ? moment(global.start_date).format('MMM,DD,YYYY') : moment().format('MMM,DD,YYYY'),
      end_date: global.end_date ? moment(global.end_date).format('MMM,DD,YYYY') : moment().format('MMM,DD,YYYY'),
      stayNumber: global.isShow ? global.stayNumber : 0,
      displayCalendarFourthDay: [0, 1, 2, 3],
      statusToggle: [false, false, false],
      favStatus: false,
      screenName: props.currentSceneName,
      numStayFromEdit: 0,
      max_persons: 1,
      PARALLAX_HEADER_HEIGHT: 300,
      isEditScreenName: this.props.isEditScreenName ? this.props.isEditScreenName : null
    }
    this.objectSelectedProduct = null
    global.defaultPrice = global.defaultPrice ? global.defaultPrice : 0
    global.localGlobleId = this.props.id ? this.props.id : global.localGlobleId
    global.isClickProcesstoCheckout = false
    global.isAllowToEdit = global.isAllowToEdit ? global.isAllowToEdit : false
    this.finalPrice = 0
    this.isAddedAndRemovedFavoriteClicked = false
    global.screenName = global.screenName ? global.screenName : null;
  }

  handleScroll = event => {
    let scrollY = event.nativeEvent.contentOffset.y
    this.setState({ scrollY })
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleOnIconBack);
  }

  handleOnIconBack = () => {
    if (global.isClickProcesstoCheckout == undefined) {
      Actions.pop()
      return true
    }
    if (global.isClickProcesstoCheckout == true) {
      Actions.pop()
      global.isClickProcesstoCheckout = false
      return true
    }
    if (this.state.isEditScreenName != null) {
      Actions.pop()
    }
    else {
      if (this.state.screenName == 'MyFavoriteScreen') {
        Actions.MyFavoriteScreen()
        return true
      }
      else if (this.state.screenName == 'LoginScreen') {
        Actions.ProjectScreen({ id: this.props.projectId, projectListId: this.props.projectListId, title: this.props.title, currentSceneName: this.props.screenName, ScreenName: this.state.screenName })
        return true
      } else {
        Actions.pop()
        return true
      }
    }
  }

  handleAddAndMinusPerson = (method) => {
    let { personNumber, price, stayNumber, finalPrice, max_persons } = this.state
    var nightStayNumber = 0;
    if (method == "add") {
      if (max_persons <= personNumber) {
        Alert.alert("Sorry, this accomodation is limited to " + max_persons + " person")
      }
      else {
        personNumber = personNumber + 1
      }
    } else {
      personNumber = personNumber - 1
    }

    if (stayNumber <= 1) {
      nightStayNumber = stayNumber + 1
    } else {
      nightStayNumber = stayNumber - 1
    }
    if (personNumber == 0) {
      personNumber = 1
    }
    finalPrice = price * personNumber * nightStayNumber
    this.setState({ finalPrice, personNumber })
  }

  handleOnSelectDay = eachDay => {
    let personNumber = this.state.personNumber
    let totalPrice
    let price = this.state.price
    if (eachDay == 0) {
      totalPrice = personNumber * price
      this.setState({
        finalPrice: totalPrice,
        end_date: moment()
          .add(eachDay, 'days')
          .format('MMM,DD,YYYY'),
        stayNumber: eachDay,
        isShow: true
      })
    }
    else {
      if (eachDay > this.state.booking_duration) {
        Alert.alert('Sorry, you can book only ' + this.state.booking_duration + ' day(s).')
      }
      else {
        totalPrice = personNumber * price * eachDay
        this.setState({
          finalPrice: totalPrice,
          end_date: moment()
            .add(eachDay, 'days')
            .format('MMM,DD,YYYY'),
          stayNumber: eachDay + 1,
          isShow: true
        })
      }
    }
  }

  handleOnCalanderClick = () => {
    if (Actions.currentScene == 'ProductPageScreen') {
      global.personNumber = this.state.personNumber
      Actions.ProductPageCalandarScreen({ productPageData: this.state.productPageData })
    }
  }

  handleToggle = indexDes => {
    let statusToggle = this.state.statusToggle
    statusToggle[indexDes] = !statusToggle[indexDes]
    this.setState({ statusToggle })
  }

  handleOnAddToCart = () => {
    let { personNumber, finalPrice, end_date } = this.state
    let startDateWithCurrenctScreen = moment().format('MMM,DD,YYYY')
    let endDateWithCurrenctScreen = end_date
    let startDate = global.start_date
    let endDate = global.end_date
    let tempStartDate, tempEndDate
    let productId = global.localGlobleId
    let { disable_key_dates } = this.state

    if (startDate == undefined && endDate == undefined) {
      tempStartDate = startDateWithCurrenctScreen
      tempEndDate = endDateWithCurrenctScreen
    }
    else {
      tempStartDate = global.start_date
      tempEndDate = global.end_date
    }
    if (!global.selectedProduct) {
      global.selectedProduct = [];
    }

    // check date that user not select but give by current date if same with date that disable 
    let day = moment(tempStartDate).format("YYYY-MM-DD");
    checkExistingDisDate = _.filter(disable_key_dates, { key: day });
    if (checkExistingDisDate && _.isEmpty(checkExistingDisDate) == false) {
      Alert.alert(" Sorry this date is not available for booking.")
    }
    else {
      finalPrice = this.finalPrice
      this.objectSelectedProduct = { ...this.objectSelectedProduct, finalPrice, personNumber, startDate, endDate, tempStartDate, tempEndDate, productId }
      var isSameId = false
      filterExistingProductId = _.filter(global.selectedProduct, { productId: this.objectSelectedProduct.productId })[0]
      if (filterExistingProductId && _.isEmpty(filterExistingProductId) == false) {
        if (global.isAllowToEdit == false) {
          isSameId = true;
        }
        else if (global.isAllowToEdit == true) {
          isSameId = false;
        }
      }
      else { isSameId = false }
      if (isSameId) { //if isSameId==true
        return Alert.alert(
          '',
          'Sorry, this booking is already in your cart.',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
            { text: 'Back to Cart', onPress: () => Actions.CartScreen() },
            { cancelable: false },
          ],
        );
      }
      else {
        global.selectedProduct.unshift(this.objectSelectedProduct)
        global.selectedProduct = _.uniqBy(global.selectedProduct, 'productId')
        global.numAddToCart = global.selectedProduct.length
        global.isClickProcesstoCheckout = true
        global.isAllowToEdit = false
        if (Actions.currentScene == 'ProductPageScreen') {
        Actions.CartScreen()
        }
      }
    }
  }
  componentDidMount = () => {
    this.props.requestProductPageData(global.localGlobleId)
    BackHandler.addEventListener('hardwareBackPress', this.handleOnIconBack);
    let globalStayNumber = global.globalStayNumber
    let { finalPrice, personNumber, stayNumber, isShow, start_date, end_date, numStayFromEdit } = this.state
    if (globalStayNumber == undefined) {
    }
    else {
      let price = global.defaultPrice
      if (globalStayNumber == 1) {
        finalPrice = personNumber * price * globalStayNumber
      } else {
        temStayNumber = globalStayNumber - 1
        finalPrice = personNumber * price * temStayNumber
      }
    }
    if (this.props.eachselectedProduct) {
      const { tempStartDate, tempEndDate } = this.props.eachselectedProduct
      isShow = true
      start_date = tempStartDate
      end_date = tempEndDate
      let mFromDate = new XDate(start_date)
      let mToDate = new XDate(end_date)
      numStayFromEdit = mFromDate.diffDays(mToDate) + 1
      stayNumber = numStayFromEdit
      personNumber = this.props.eachselectedProduct.personNumber
    }
    this.setState({ finalPrice, stayNumber, personNumber, isShow, start_date, end_date, numStayFromEdit })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.getProductPage) {
      const { fetching, error, payload } = newProps.getProductPage
      if (fetching == false && error == null && payload && payload.products) {
        const { products } = payload
        // = = = = validate click add to favorite = = = =
        if (!this.isAddedAndRemovedFavoriteClicked) {
          products.map((proStatus) => {
            if (proStatus.added_to_favorites) {
              this.setState({ favStatus: true });
            }
          })
        }
        if (products && products.length > 0) {
          const { wc_info, image, title } = products[0]
          this.setState({ sidebarTitle: title, main_image: image })

          if (wc_info && wc_info.length > 0) {
            let disable_key_dates = []
            const { costs, disable_dates, availability, max_persons, availabilities } = wc_info[0]
            // disable_dates.map((eachDisDate) => {
            //   const convertKeyDate = moment(eachDisDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
            //   disable_key_dates.push({ key: convertKeyDate })
            // })

            if (availabilities) {
              availabilities.map((eachDisDate, indexDis) => {
                let [mMarkedDates] = new ProductPageCalandarScreen().setupMarkedDates(eachDisDate.from, eachDisDate.to, {}, false)
                let getObjectKeys = Object.keys(mMarkedDates)
                if (getObjectKeys) {
                  getObjectKeys.map((eachObjKey) => {
                    disable_key_dates.push({ key: eachObjKey })
                  })
                }
              })
            }



            // this.state.price = costs.display_cost
            this.state.finalPrice = costs.display_cost
            this.objectSelectedProduct = {
              image: image,
              title: title,
              price: costs.display_cost,
            }
            this.setState({ productPageData: products, price: costs.display_cost, disable_key_dates, booking_duration: availability._wc_booking_duration, max_persons, available: availability._wc_booking_default_date_availability })
          }
        }
      }
    }
  }

  // is added and removed favorite
  isAddedAndRemovedFavorite = () => {
    AsyncStorage.multiGet(["userToken"]).then(response => {
      const userToken = response[0][1];
      if (userToken) {
        this.isAddedAndRemovedFavoriteClicked = true;
        let { favStatus } = this.state
        if (favStatus) {
          favStatus = false;
        } else {
          favStatus = true;
          Alert.alert("Success! This product has been added to your favorites", '',
            [
              { text: 'Close', onPress: () => null, style: 'cancel' },
              { text: 'Go favorite', onPress: () => Actions.MyFavoriteScreen() },
              { cancelable: true }
            ])
        }
        data = {
          postid: this.props.id,
          status: favStatus ? 'active' : 'inactive'
        }
        this.props.requestSavaFavorite(data)
        this.setState({ statusLogin: userToken, favStatus })
      } else {
        Alert.alert("Please sign in to add this experience to your favorites.", '',
          [
            { text: 'Cancel', onPress: () => null, style: 'cancel' },
            {
              text: 'Sign in', onPress: () => {
                global.screenName = "ProductPageScreen"
                Actions.LoginScreen({ id: global.localGlobleId, projectId: this.props.projectId, projectListId: this.props.projectListId, projectTitle: this.props.title, currentSceneName: this.props.screenName })
              }
            },
            { cancelable: false }
          ])
      }
    })
  }

  render() {
    const { start_date, end_date, disable_key_dates, personNumber, nightStayNumber, price, finalPrice } = this.state
    if (this.props.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FD7751" style={{ alignItems: 'center' }} />
        </View>
      )
    }

    const stayNight = this.state.stayNumber <= 1 ? 1 : this.state.stayNumber - 1
    checkPerson = personNumber && personNumber > 0 ? personNumber : 1

    checkNight = stayNight && stayNight > 0 ? stayNight : 1
    // checkPrice = finalPrice && finalPrice>0?finalPrice:1
    checkPrice = price && price > 0 ? price : 1
    const totalPrice = checkPerson * checkNight * checkPrice;
    this.finalPrice = totalPrice
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          backgroundColor="#FD7751"
          contentBackgroundColor="white"
          stickyHeaderHeight={56}
          parallaxHeaderHeight={this.state.PARALLAX_HEADER_HEIGHT}

          // = = = = = = = = = = = Title = = = = = = = = = = = 
          renderForeground={() => (
            <View style={{ height: 200, flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
              <View style={{ justifyContent: 'center', height: 74, backgroundColor: 'rgba(23, 19, 19, 0.35)', width: '100%' }}>
                <Text style={ApplicationStyles.mainTitle}>{this.state.sidebarTitle.toUpperCase()}</Text>
              </View>
            </View>
          )}

          // = = = = = = = = = = = Background = = = = = = = = = = = 
          renderBackground={() => (
            <View key="background">
              <Image source={{
                uri: this.state.main_image,
                width: window.width,
                height: this.state.PARALLAX_HEADER_HEIGHT
              }} />
              <View style={{
                position: 'absolute',
                top: 0,
                width: window.width,
                backgroundColor: 'rgba(0,0,0,.4)',
                height: this.state.PARALLAX_HEADER_HEIGHT
              }} />
            </View>
          )}
          // = = = = = = = = = = = Stick header title = = = = = = = = = = = 
          renderStickyHeader={() => (
            <View key="sticky-header" style={ApplicationStyles.headerContainer}>
              <Text style={[ApplicationStyles.headerTitle, { paddingLeft: 32 }]}>
                {
                  this.state.sidebarTitle != '' ?
                    this.state.sidebarTitle.length > 25 ?
                      this.state.sidebarTitle.toUpperCase().substr(0, 25) + "..."
                      :
                      this.state.sidebarTitle.toUpperCase()
                    :
                    ''
                }
              </Text>
            </View>
          )}

          // = = = = = = = = = = = Icon (back and fav) = = = = = = = = = = = 
          renderFixedHeader={() => (
            <View key="fixed-header" style={ApplicationStyles.fixedSection}>
              <TouchableOpacity style={{ flex: 1, marginLeft: 32 }}
                onPress={this.handleOnIconBack}>
                <Icon name='arrow-back' style={{ marginBottom: 4, fontSize: 23, color: '#fff' }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={!this.state.inClick ? this.isAddedAndRemovedFavorite : null} style={{ flex: 1, alignItems: 'flex-end' }}>
                <Image source={this.state.favStatus ? Images.iconHeatWhite : Images.iconHeart} style={ApplicationStyles.icon} />
              </TouchableOpacity>

            </View>
          )}
          onScroll={this.handleScroll}
        >
          <View style={{ flex: 1, flexDirection: 'column' }}>
            {/* Content container */}
            <View style={styles.contentcontainer}>
              <View>
                {/* Question container */}
                <Text style={styles.questionStyle}>
                  When would you like to go?
                </Text>
              </View>
              {/* Date Container */}
              {
                !this.state.isShow ? (
                  <View style={styles.calendarContainer}>
                    <View style={styles.boxCalendar}>
                      <TouchableOpacity onPress={this.handleOnCalanderClick}>
                        <View
                          style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                          <Icon name='calendar-blank' type='MaterialCommunityIcons' style={{ color: '#FD7751', width: 34, height: 26, paddingLeft: 5 }} />
                          <Icon name='sort-down' type='FontAwesome' style={{ color: '#FD7751', width: 25, height: 26, marginTop: -10 }} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {this.state.displayCalendarFourthDay.map(eachDay => {
                      // eachDay = eachDay + 4
                      const convertDate = moment().add(eachDay, 'days').format('YYYY-MM-DD')
                      var statusDisDate = false;
                      checkExistingDisDate = _.filter(disable_key_dates, { key: convertDate });
                      if (checkExistingDisDate && _.isEmpty(checkExistingDisDate) == false) {
                        statusDisDate = true;
                      }
                      return (
                        <TouchableOpacity
                          onPress={statusDisDate ? ()=>Alert.alert("Sorry, this date is not available for booking.") : () => this.handleOnSelectDay(eachDay)}>
                          <View style={[styles.boxCalendar, { backgroundColor: statusDisDate ? 'grey' : eachDay == 0 ? '#EBEBEB' : '' }]}>
                            {
                              eachDay == 0 ? (
                                <Icon name='dot-single' type='Entypo' style={{
                                  color: '#FD7751', width: 25, height: 25, position: 'absolute', left: 38, top: -4
                                }} />)
                                : null
                            }
                            <Text style={{ textAlign: 'center',color:statusDisDate?'white':null }}>
                              {moment().add(eachDay, 'days').format('ddd')}{'\n'}{moment().add(eachDay, 'days').format('DD/MM')}
                            </Text>
                          </View>
                        </TouchableOpacity>)
                    })}
                  </View>
                ) :
                  <View style={styles.setDayContainer}>
                    <TouchableOpacity onPress={this.handleOnCalanderClick}>
                      <View>
                        <Icon name='calendar-blank' type='MaterialCommunityIcons' style={{ color: '#FD7751', width: 34, height: 26, paddingLeft: 5 }} />
                      </View>
                    </TouchableOpacity>
                    <View>
                      <Text
                        style={{ textAlign: 'center', paddingTop: 5, paddingLeft: 10 }}  >
                        {moment(start_date).format('MMM, DD')} -{' '}{moment(end_date).format('MMM, DD')}
                      </Text>
                    </View>
                    <View>
                      <Icon name='dot-single' type='Entypo' style={{ color: '##000000', width: 34, height: 26, paddingLeft: 5 }} />
                    </View>
                    <View>
                      <Text style={{ textAlign: 'center', paddingTop: 5 }}>
                        {this.state.stayNumber == 0 ? this.state.numStayFromEdit > 0 ? this.state.numStayFromEdit : 1 : this.state.stayNumber} {this.state.stayNumber > 1 ? "days" : this.state.numStayFromEdit > 1 ? "days" : "day"}
                      </Text>
                    </View>
                    <View>
                      {this.state.stayNumber <= 1 ? this.state.numStayFromEdit > 1 ?
                        <Icon name='dot-single' type='Entypo' style={{ color: '##000000', width: 34, height: 26, paddingLeft: 15 }} />
                        : null
                        : (
                          <Icon name='dot-single' type='Entypo' style={{ color: '##000000', width: 34, height: 26, paddingLeft: 15 }} />)}
                    </View>
                    <View>
                      {this.state.stayNumber <= 1 ?
                        this.state.numStayFromEdit > 1 ?
                          <Text style={{ textAlign: 'center', paddingTop: 5, paddingLeft: 5 }} >
                            {this.state.numStayFromEdit - 1}{this.state.numStayFromEdit - 1 > 1 ? " nights" : " night"}
                          </Text>
                          : null
                        : (
                          <Text style={{ textAlign: 'center', paddingTop: 5, paddingLeft: 5 }} >
                            {stayNight}{stayNight > 1 ? " nights" : " night"}
                          </Text>
                        )}

                    </View>
                  </View>
              }
              {/* End Date Container */}

              {/* End Custome ProductPageScrollStay */}
              {/* custom button Add and Minus */}
              <View style={styles.numberBookingContainer}>
                <View style={styles.personsContainer}>
                  <Icon name='user-friends' type='FontAwesome5' style={{ color: '#FD7751', width: 34, height: 26 }} />
                  <Text style={[styles.textStyle, { left: 16 }]}>
                    Persons :
                  </Text>
                </View>

                <View style={styles.addAndMinusContainer}>
                  <TouchableOpacity style={styles.boxMinus} onPress={() => this.handleAddAndMinusPerson("minus")}>
                    <Icon name='minus' type='AntDesign' style={{ color: '#8E8E93', width: 24, height: 24, alignSelf: 'center' }} />
                  </TouchableOpacity>
                  <View style={styles.boxMinus}>
                    <Text style={[styles.textStyle, { textAlign: 'center' }]}>
                      {this.state.personNumber}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.boxMinus}
                    onPress={() => this.handleAddAndMinusPerson("add")}
                  >
                    <Icon name='plus' type='AntDesign' style={{ color: '#8E8E93', width: 24, height: 24, alignSelf: 'center' }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* End Content Contaitner */}

            {/* Start Togle button */}
            <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
              {this.state.productPageData.map((eachProduct, index) => {
                let map = eachProduct.map;
                return (
                  eachProduct.tabs.map((eachTab, indexTab) => {
                    let mapData = null;
                    const getObjectKey = Object.keys(eachTab)[0]
                    if (getObjectKey == "Getting there") {
                      if (map)
                        mapData = { ...eachTab, ...map }
                    }
                    return (
                      <Collapse onToggle={() => this.handleToggle(indexTab)}
                        isCollapsed={this.state.statusToggle[indexTab]}>
                        <CollapseHeader>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15 }} >
                            <Text style={styles.descriptiontitle}>
                              {getObjectKey}
                            </Text>
                            <Icon style={styles.icon} name={this.state.statusToggle[indexTab] ? 'up' : 'right'} type='AntDesign'
                            />
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          <View>
                            <Text style={styles.descriptionText}>
                              {eachTab[getObjectKey]}
                            </Text>

                            {mapData ?
                              <View style={styles.mapContainer}>
                                <MapView
                                  provider={PROVIDER_GOOGLE}
                                  customMapStyle={mapStyle}
                                  style={styles.map}
                                  region={{
                                    latitude: parseFloat(mapData.lat),
                                    longitude: parseFloat(mapData.lng),
                                    latitudeDelta: 0.5,
                                    longitudeDelta: 0.5,

                                  }}>

                                  <MapView.Marker
                                    coordinate={{
                                      latitude: parseFloat(mapData.lat),
                                      longitude: parseFloat(mapData.lng)
                                    }}
                                  />
                                </MapView>
                              </View> : <View />
                            }
                          </View>
                        </CollapseBody>
                      </Collapse>
                    )
                  })
                )
              })}
            </View>
            <TouchableOpacity onPress={this.handleOnAddToCart} style={styles.buttonAddToCard}>
              <Text style={[styles.textButtonAddToCard, { textAlign: 'center' }]}>
                ADD TO CART ( $ {totalPrice} )
            </Text>
            </TouchableOpacity>
          </View>
        </ParallaxScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    getProductPage: state.productPage,
    isFetching: state.productPage.fetching
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestProductPageData: (id) => dispatch(ProductPageActions.productPageRequest(id)),
    requestSavaFavorite: (data) => dispatch(SaveFavoriteActions.saveFavoriteRequest(data)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductPageScreen)
