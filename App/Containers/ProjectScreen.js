import React, { Component } from 'react';
import {
  Text, StatusBar, View, Dimensions, Image, ActivityIndicator, ScrollView, FlatList,
  TouchableOpacity, Linking, AsyncStorage, Alert, BackHandler
} from 'react-native';
import { ApplicationStyles, Fonts, Images } from '../Themes';
import { Rating } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './Styles/ProjectScreenStyle';
import ProjectActions from '../Redux/ProjectRedux';
import { connect } from 'react-redux';
import { Icon } from 'native-base'
import _ from 'lodash';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Actions } from 'react-native-router-flux';
import SaveFavoriteActions from '../Redux/SaveFavoriteRedux'
var mapStyle = require('../../mapStyle.json');

let data;
class ProjectScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // scrollY: new Animated.Value(0),
      projectData: [],
      tabData: [],
      mapData: null,
      tabContent: [],
      statusBlockDesc: true,
      productData: [],
      reviewData: [],
      newContent: [],
      storeAllTabName: [],
      statusMap: false,
      title: "",
      main_image: "",
      PARALLAX_HEADER_HEIGHT: 300,
      scrollY: 0,
      favStatus: false,
      projectId: props.id,
      projectStatus: [],
      screenName: props.currentSceneName,
      inClick: false
    }
    this.eachTab = null
    this.startInitialDesc = false
    this.isAddedAndRemovedFavoriteClicked = false
    global.screenName = global.screenName ? global.screenName : null;
  }
  handleOnSubProduct = (eachProduct) => {
    this.setState({ inClick: true });
    const { id } = eachProduct
    const { projectId } = this.state
    global.staticId = id
    global.isShow = false
    global.start_date = null
    global.end_date = null
    global.personNumber = null
    Actions.ProductPageScreen({ id: id, projectId: projectId, title: this.props.title, projectListId: this.props.projectListId, screenName: this.state.screenName })
    setTimeout(function () {
      this.setState({ inClick: false });
    }.bind(this), 2000);
  }

  handleEachTab = (getKeyTab, index) => {
    let { productData, reviewData, tabData } = this.state
    var matchDesc = getKeyTab.toLowerCase().match(/descript/g);
    var matchGetting = getKeyTab.toLowerCase().match(/getting/g);
    let statusMap = false
    if (matchGetting) {
      statusMap = true
    } else {
      statusMap = false
    }
    var newContent = []
    var statusBlockDesc = true
    this.eachTab = getKeyTab
    newContent.push(tabData[index])
    if (matchDesc) {
      tabData.map((eachTabData) => {
        var getObjectKey = Object.keys(eachTabData)[0];
        var matchOurStory = getObjectKey.toLowerCase().match(/our/g);
        if (matchOurStory) {
          newContent.push(eachTabData)
        }
      })
      statusBlockDesc = true
    } else {
      statusBlockDesc = false
    }
    if (!statusMap) {
      if (productData && productData.length > 0) {
        newContent.push({ products: productData })
      }
      if (reviewData && reviewData.length > 0) {
        newContent.push({ review: reviewData })
      }
    }
    this.setState({ statusMap, tabData: [...tabData], tabContent: this.state.tabData[index][getKeyTab], statusBlockDesc, newContent });

  }

  renderTabs = ({ item, index }) => {
    var getKeyTab = Object.keys(item)[0]
    if (getKeyTab == "OUR STORY") {
      return false;
    }
    if (this.startInitialDesc == false) {
      this.startInitialDesc = true
      this.handleEachTab(getKeyTab, index);
    }
    return (
      <TouchableOpacity style={[styles.tabItem]}
        onPress={() => this.handleEachTab(getKeyTab, index)}>
        <Text style={[styles.tabText, { paddingBottom: 8 },
        { color: this.eachTab == getKeyTab ? "black" : "#8E8E93" },
        { borderBottomColor: this.eachTab == getKeyTab ? '#8CBC12' : 'white', borderBottomWidth: 4 }]}>
          {getKeyTab}
        </Text>
      </TouchableOpacity>
    )
  }
  componentDidMount() {
    const { projectId } = this.state
    this.props.requestProjectData(projectId)
    BackHandler.addEventListener('hardwareBackPress', this.exit);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.getProject) {
      const { fetching, error, payload } = newProps.getProject
      if (fetching == false && error == null && payload && payload.info && payload.info.length > 0) {
        const { section, main_image, title } = payload.info[0]
        let { tabData, productData, reviewData, storeAllTabName, mapData } = this.state
        // = = = = = validate status add to favorite = = = = =
        if (!this.isAddedAndRemovedFavoriteClicked) {
          payload.info.map((statusItem) => {
            if (statusItem.added_to_favorites) {
              this.setState({ favStatus: true });
            }
          })
        }

        section.map((eachSec) => {
          checkTabsKey = _.has(eachSec, 'tabs')
          checkProductsKey = _.has(eachSec, 'products')
          checkReviewKey = _.has(eachSec, 'review')

          const { tabs, map } = eachSec
          if (checkTabsKey) {
            tabData = tabs
            mapData = map
            storeAllTabName = []
            tabs.map((eachTab) => {
              var getObjectKey = Object.keys(eachTab)[0]
              storeAllTabName.push({ tab_name: getObjectKey });
            })
          }
          if (checkProductsKey) {
            productData = eachSec["products"]
          }
          if (checkReviewKey) {
            reviewData = eachSec["review"]
          }
        })
        this.setState({ main_image, title, mapData, tabData, productData, reviewData, storeAllTabName })
      }
    }
  }

  handleContentTab = () => {
    let { storeAllTabName, newContent, statusBlockDesc } = this.state
    return (
      newContent.map((eachNewContent, indexNew) => {
        const getObjectKey = Object.keys(eachNewContent)[0]
        checkExistingTabName = _.filter(storeAllTabName, { tab_name: getObjectKey })
        if (checkExistingTabName && checkExistingTabName.length > 0) {
          return (
            <View style={{}}>
              {indexNew == 0 ? <Text /> : <Text style={styles.title}>{getObjectKey}</Text>}
              {
                eachNewContent[getObjectKey].map((eachSunNew) => {
                  const getSubObjectKey = Object.keys(eachSunNew)[0]
                  var content = eachSunNew[getSubObjectKey]
                  content = content.split("&nbsp;").join(" ");
                  if (getSubObjectKey == "p") {
                    var regCheckPlink = content.match(/schedule/g);
                    if (regCheckPlink) {
                      return false;
                    }
                    var regCheckLineBreak = content.match(/~{(.*?)}/g)
                    if (regCheckLineBreak) {
                      return <Text style={styles.descText}>{content.replace(/~{(.*?)}/g, "\n")}</Text>
                    }
                  }

                  var countLink = 0
                  if (getSubObjectKey == "link") {
                    countLink = countLink + 1
                    if (countLink > 1) {
                      return false;
                    }
                    if (statusBlockDesc) {
                      return false;
                    }
                  }
                  if (/^[\s]*$/.test(content.toString())) {
                    return false;
                  }
                  return (
                    getSubObjectKey == "link" ?
                      <TouchableOpacity onPress={() => Linking.openURL(content)} style={{ flexDirection: 'row' }}>
                        <Text style={[styles.descText, { color: 'blue' }]}>Bus schedule & booking</Text>
                      </TouchableOpacity>
                      :
                      <View style={{ flexDirection: 'row' }}>
                        {
                          getSubObjectKey == "list_item" ?
                            <Text style={styles.descText}>• </Text>
                            : null
                        }
                        <Text style={styles.descText}> {content}</Text>
                      </View>
                  )
                })
              }
            </View>
          )
        } else {
          return (

            <View style={{}}>
              <Text style={styles.title}>{getObjectKey.toUpperCase()}</Text>
              {
                eachNewContent[getObjectKey].map((eachProduct) => {
                  if (getObjectKey == "products") {
                    return (
                      <TouchableOpacity style={ApplicationStyles.articleItem}
                        onPress={() => !this.state.inClick ? this.handleOnSubProduct(eachProduct) : null}>
                        <Image
                          source={{ uri: eachProduct.image }}
                          style={ApplicationStyles.articleImage} />
                        <View style={ApplicationStyles.articleText}>
                          <Text style={ApplicationStyles.articleTitle}>{eachProduct.title.toUpperCase()}</Text>
                          <Text style={ApplicationStyles.articleDate}>from ${eachProduct.prices.display_cost}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  } else {
                    return (
                      <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, marginTop: 24 }}>
                          <Rating
                            type="star"
                            fractions={1}
                            startingValue={eachProduct.rating}
                            imageSize={16}
                            readonly
                            style={{ alignItems: 'flex-start' }}
                          />
                          <Text style={{ fontFamily: Fonts.type.muli }}>{eachProduct.title}</Text>
                        </View>
                        <Text style={styles.descText}>{eachProduct.comment}</Text>
                        <Text style={{ marginTop: 8 }}>{eachProduct.author}</Text>
                      </View>
                    )
                  }
                })
              }
            </View>
          )
        }
      })
    )
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.exit);
  }

  exit = () => {
    if (this.state.screenName == 'MyFavoriteScreen') {
      Actions.MyFavoriteScreen()
      return true
    } else if (this.props.screenName == '_HomeScreen' || this.state.screenName == '_HomeScreen') {
      Actions.tabbar({ type: "reset" })
      Actions.HomeScreen();
      return true
    } else if (this.state.screenName == 'LoginScreen' || this.props.ScreenName == 'LoginScreen') {
      Actions.ProjectListScreen({ id: this.props.projectListId, title: this.props.title })
      return true
    } else {
      Actions.pop()
      return true
    }
  }
  _onScroll = event => {
    this.setState({ scrollY: event.nativeEvent.contentOffset.y })

    if (this.state.scrollY >= 144) {
      // alert('You reach the destination')
    }
  }

  // is added and removed favorite
  isAddedAndRemovedFavorite = () => {
    this.setState({ inClick: true });
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
        const { projectId } = this.state
        Alert.alert("Please sign in to add to your wishlist.", '',
          [{ text: 'Cancel', onPress: () => null, style: 'cancel' }, {
            text: 'Sign in', onPress: () => {
              global.screenName = "ProjectScreen"
              Actions.LoginScreen({ id: projectId, projectTitle: this.props.title, projectListId: this.props.projectListId, screenName: this.state.screenName })
            }
          }, { cancelable: false }])
      }
    })
    setTimeout(function () {
      this.setState({ inClick: false });
    }.bind(this), 2000);
  }

  render() {
    if (this.props.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ActivityIndicator size="large" color='#8E8E93' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        </View>
      )
    }
    const { mapData, tabData, statusMap, title, main_image } = this.state
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          backgroundColor="#8CBC12"
          contentBackgroundColor="white"
          stickyHeaderHeight={56}
          parallaxHeaderHeight={this.state.PARALLAX_HEADER_HEIGHT}

          // = = = = = = = = = = = Title = = = = = = = = = = = 
          renderForeground={() => (
            <View style={{ height: 200, flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
              {/* <Text style={ApplicationStyles.mainTitle}>{title.toUpperCase()}</Text> */}
              <View style={{ justifyContent: 'center', height: 74, backgroundColor: 'rgba(23, 19, 19, 0.35)', width: '100%' }}>
                <Text style={ApplicationStyles.mainTitle}>{title.toUpperCase()}</Text>
              </View>
            </View>
          )}

          // = = = = = = = = = = = Background = = = = = = = = = = = 
          renderBackground={() => (
            <View key="background">
              <Image source={{
                uri: main_image,
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
                  title != '' ?
                    title.length > 25 ?
                      title.toUpperCase().substr(0, 25) + "..."
                      :
                      title.toUpperCase()
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
                onPress={this.exit}>
                <Icon name='arrow-back' style={{ marginBottom: 4, fontSize: 23, color: '#fff' }} />
              </TouchableOpacity>

              <TouchableOpacity onPress={!this.state.inClick ? this.isAddedAndRemovedFavorite : null} style={{ flex: 1, alignItems: 'flex-end' }}>
                <Image source={this.state.favStatus ? Images.iconHeatWhite : Images.iconHeart} style={ApplicationStyles.icon} />
              </TouchableOpacity>

            </View>
          )}
          onScroll={this._onScroll}
        >
          {/* = = = = = = = = = = = Tab = = = = = = = = = = =  */}
          <View style={{ flex: 1 }}>
            <View style={styles.tabContainer}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={tabData}
                renderItem={this.renderTabs}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            {/* = = = = = = = = = = = Each content of Tabs = = = = = = = = = = =  */}
            {
              <ScrollView style={styles.scrollContainer}>
                {
                  this.handleContentTab()
                }
                {
                  statusMap && mapData ?
                    <View style={styles.mapContainer}>
                      <MapView
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapStyle}
                        style={styles.map}
                        region={{
                          latitude: Number(mapData.lat),
                          longitude: Number(mapData.lng),
                          latitudeDelta: 0.5,
                          longitudeDelta: 0.5,

                        }}>

                        <MapView.Marker
                          coordinate={{
                            latitude: Number(mapData.lat),
                            longitude: Number(mapData.lng)
                          }}
                        />
                      </MapView>
                    </View>
                    :
                    null
                }
              </ScrollView>
            }
          </View>
        </ParallaxScrollView>
      </View >

    );
  }
}

const mapStateToProps = (state) => {
  return {
    getProject: state.project,
    loading: state.project.fetching,
    saveFav: state.saveFav,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestProjectData: (id) => dispatch(ProjectActions.projectRequest(id)),
    requestSavaFavorite: (data) => dispatch(SaveFavoriteActions.saveFavoriteRequest(data)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen)