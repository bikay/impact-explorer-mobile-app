import React, { Component } from 'react'
import styles from './Styles/BookingDetailStyle'
import { Text, View, Image, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native'
import { Icon } from 'native-base'
import { Images, ApplicationStyles, Fonts } from '../Themes'
import { Actions } from 'react-native-router-flux'
import BookingProductDetailActions from '../Redux/BookingProductDetailRedux'
import { connect } from 'react-redux';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import moment from 'moment';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
var mapStyle = require('../../mapStyle.json');

class BookingDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: 0,
      dataProductDetail: [],
      productDetails: props.item,
      statusToggle: [false, false, false],
      PARALLAX_HEADER_HEIGHT: 300,
      isFetching: true
    }
  }

  closeActivityIndicator = () => setTimeout(() => this.setState({
    isFetching: false
  }), 1000)
  componentDidMount() {
    this.closeActivityIndicator()
    BackHandler.addEventListener('hardwareBackPress', this.handleOnIconBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleOnIconBack);
  }
  handleOnIconBack = () => {
    Actions.pop()
    return true
  }
  handleScroll = event => {
    this.setState({ scrollY: event.nativeEvent.contentOffset.y })
  }
  handleToggle = index => {
    let statusToggle = this.state.statusToggle
    statusToggle[index] = !statusToggle[index]
    this.setState({ statusToggle })
  }
  render() {
    const isFetching = this.state.isFetching
    if (this.state.isFetching) {
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ActivityIndicator animating={isFetching} size="large" color='#8E8E93' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        </View>
      )
    }
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
                <Text style={ApplicationStyles.mainTitle}>{this.state.productDetails.title.toUpperCase()}</Text>
              </View>
            </View>
          )}
          // = = = = = = = = = = = Background = = = = = = = = = = = 
          renderBackground={() => (
            <View key="background">
              <Image source={{
                uri: this.state.productDetails.image,
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
                {this.state.productDetails.title != '' ?
                  this.state.productDetails.title.length > 25 ?
                    this.state.productDetails.title.toUpperCase().substr(0, 25) + "..."
                    :
                    this.state.productDetails.title.toUpperCase()
                  : ''
                }
              </Text>
            </View>
          )}
          // = = = = = = = = = = = Icon (back and fav) = = = = = = = = = = = 
          renderFixedHeader={() => (
            <View key="fixed-header" style={ApplicationStyles.fixedSection}>
              <TouchableOpacity style={{ flex: 1, marginLeft: 32 }}
                onPress={this.handleOnIconBack}>
                <Icon name='arrow-back' style={styles.iconWidthHeight} />
              </TouchableOpacity>
            </View>
          )}
          onScroll={this.handleScroll}
        >
          <View >
            {/* ======= Data and time ========= */}
            <View stlye={styles.containerinformation}>
              <View style={styles.subContainerinformation}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginBottom: 8 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 20, height: 20 }} source={Images.iconCalendar} />
                    <View style={{ paddingLeft: 10 }}>
                      <Text style={{ color: 'black', fontFamily: Fonts.type.muli, fontSize: 14, textAlign: 'center' }}>{moment(this.state.productDetails.date_booking.start_date).format('DD MMM YYYY')}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: -3 }}>
                    <Image style={{ width: 24, height: 24 }} source={Images.iconUsers} />
                    <View style={{ paddingLeft: 10, marginTop: 3 }}>
                      <Text style={{ color: '#000', fontFamily: Fonts.type.muli, fontSize: 14, textAlign: 'center' }}> {this.state.productDetails.number_people}</Text>
                    </View>
                  </View>
                </View>
                {/* ====== short information about booking project ====== */}
                <View>
                  <Text style={styles.textShortInformation}>
                    {this.state.productDetails.short_info}
                  </Text>
                </View>
                {/* =========== collapse information about booking product detail ========= */}
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                  {this.state.productDetails.tabs.map((dataInfo, index) => {
                    const getObjectKey = Object.keys(dataInfo)

                    return (
                      <Collapse
                        onToggle={() => this.handleToggle(index)}
                        isCollapsed={this.state.statusToggle[index]}
                      >
                        <CollapseHeader>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingBottom: 15
                            }}
                          >
                            <Text style={{ fontFamily: Fonts.type.oswaldMedium, fontSize: 20, color: '#000000' }}>
                              {getObjectKey}
                            </Text>
                            <Icon
                              style={{ fontSize: 18 }}
                              name={
                                this.state.statusToggle[index] ? 'ios-arrow-up' : 'ios-arrow-forward'
                              }
                            />
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          <View>
                            <Text style={{ fontFamily: Fonts.type.muli, fontSize: 16, paddingBottom: 20 }}>
                              {dataInfo[getObjectKey].replace(/~{(.*?)}/g, '\n \n')}
                            </Text>
                            {
                              getObjectKey == 'Getting there' ?
                                this.state.productDetails.map != null ?
                                  <View style={{ paddingBottom: 20 }}>
                                    <View style={styles.mapContainer}>
                                      <MapView
                                        provider={PROVIDER_GOOGLE}
                                        style={styles.map}
                                        customMapStyle={mapStyle}
                                        region={{
                                          latitude: parseFloat(this.state.productDetails.map.lat),
                                          longitude: parseFloat(this.state.productDetails.map.lng),
                                          latitudeDelta: 0.0922,
                                          longitudeDelta: 0.0421,
                                        }}>

                                        <MapView.Marker
                                          coordinate={{
                                            latitude: parseFloat(this.state.productDetails.map.lat),
                                            longitude: parseFloat(this.state.productDetails.map.lng)
                                          }}
                                        />
                                      </MapView>
                                    </View>
                                  </View>
                                  : null
                                : <View></View>
                            }
                          </View>

                        </CollapseBody>
                      </Collapse>
                    )
                  })}
                </View>
              </View>
            </View>
          </View>
        </ParallaxScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bookingProductDetails: state.bookingProDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestBookingProductDetailData: (data) => dispatch(BookingProductDetailActions.bookingProductDetailRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetail)