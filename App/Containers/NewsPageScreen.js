import React, { Component } from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity, Animated, BackHandler } from 'react-native'
import { Images, Fonts, ApplicationStyles } from '../Themes'
import styles from './Styles/NewsArticleScreenStyle'
import stylesNewsPageScreen from './Styles/NewsPageScreenStyle'
import { ScrollView } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'
// import Swiper from 'react-native-swiper'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { connect } from 'react-redux';
import NewsArticlePageActions from '../Redux/NewsArticlePageRedux'
import _ from 'lodash'
import ProductPageScreen from './ProductPageScreen';
import { Icon } from 'native-base';
class NewsPageScreen extends Component {
  constructor() {
    super()
    this.state = {
      scrollY: 0,
      newsArticlePageData: [],
      PARALLAX_HEADER_HEIGHT: Dimensions.get('window').height,
    }

  }
  handleOnIconBack = () => {
    Actions.pop()
    return true
  }

  componentWillMount = () => {
    this.animatedWidth = new Animated.Value(Dimensions.get('window').height)
    this.animatedHeight = new Animated.Value(218)
  }
  componentDidMount() {
    this.props.requestNewsArticlePageData(this.props.id)
    BackHandler.addEventListener('hardwareBackPress', this.handleOnIconBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleOnIconBack);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.getNewsArticlePage) {
      if (newProps.getNewsArticlePage.fetching == false && newProps.getNewsArticlePage.error == null && newProps.getNewsArticlePage.payload) {
        this.setState({ newsArticlePageData: newProps.getNewsArticlePage.payload.info });
      }
    }
  }

  render() {
    return (
      <View style={stylesNewsPageScreen.container}>
        <ParallaxScrollView
          backgroundColor={this.props.color}
          contentBackgroundColor="white"
          stickyHeaderHeight={56}
          parallaxHeaderHeight={this.state.PARALLAX_HEADER_HEIGHT}

          // = = = = = = = = = = = Title = = = = = = = = = = = 
          renderForeground={() => (
            <View>
              <View
                style={[stylesNewsPageScreen.buttonTravelTripContainer, { backgroundColor: this.props.color }]}>
                <TouchableOpacity onPress={this.handleTest}>
                  <Text style={stylesNewsPageScreen.buttonText}>{this.props.subTitle} </Text>
                </TouchableOpacity>
              </View>
              <View style={stylesNewsPageScreen.textDescriptionContainer}>
                <Text style={stylesNewsPageScreen.textDes}>
                  {this.props.title.toUpperCase()}
                </Text>
              </View>
            </View>
          )}

          // = = = = = = = = = = = Background = = = = = = = = = = = 
          renderBackground={() => (
            <View key="background">
              <Image source={{
                uri: this.props.image,
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
                  this.props.title != '' ?
                    this.props.title.length > 25 ?
                      this.props.title.toUpperCase().substr(0, 25) + "..."
                      :
                      this.props.title.toUpperCase()
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
            </View>
          )}
          onScroll={this._onScroll}
        >
          <View style={{ flex: 1, padding: 16 }}>
            {this.state.newsArticlePageData.map((eachNewArticlePage, indexPage) => {
              return (
                eachNewArticlePage.section.map((eachSection, indexSection) => {
                  if (indexSection == 0) {
                    return false;
                  }
                  if (_.isEmpty(eachSection.text_block) == true) {
                    return false;
                  }
                  return (
                    eachSection.text_block.map((eachTextBlock, indexTextBlock) => {
                      const { paragraph } = eachTextBlock
                      if (Array.isArray(paragraph)) {
                        return (
                          paragraph.map((eachpara) => {
                            const getObjectKey = Object.keys(eachpara)[0]
                            return (
                              <View>
                                <Text style={{
                                  fontSize: 15, color: 'black',
                                  paddingBottom: getObjectKey == "subtitle" ? 8 : 5,
                                  paddingTop: getObjectKey == "subtitle" ? 10 : 5,
                                  fontFamily: getObjectKey == "subtitle" ? Fonts.type.oswaldMedium : Fonts.type.muli,
                                  color: getObjectKey == "subtitle" ? this.props.color ? this.props.color : '#ff8566' : '#000',
                                  fontWeight: getObjectKey == "subtitle" ? "bold" : "normal"
                                }}>
                                  {eachpara[getObjectKey].replace(/~{(.*?)}/g, '')}
                                </Text>
                              </View>
                            )
                          })
                          // end paragraph map
                        )
                      } else {
                        // alert(' error')
                        // const getObjectKey = Object.keys(paragraph)[0]
                        // const getSubObjectKey =Object.keys(paragraph[getObjectKey])[0]
                        // return(
                        //     <View>
                        //       <Text style={{fontSize:15,color:'black', fontWeight: getSubObjectKey=="subtitle"?"bold":"normal"}}>{paragraph[getObjectKey][getSubObjectKey]}</Text>
                        //     </View>
                        // )
                      }
                    })
                  )
                })
              )
            })}
          </View>
        </ParallaxScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    getNewsArticlePage: state.newsArticlePage,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    requestNewsArticlePageData: (id) => dispatch(NewsArticlePageActions.newsArticlePageRequest(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPageScreen)
