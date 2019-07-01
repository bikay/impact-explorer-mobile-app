import React, { Component } from 'react'
import styles from './Styles/BlogArticleScreenStyle'
import { Text, View, ScrollView, Image, TouchableOpacity, BackHandler,ActivityIndicator} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Images, Fonts, ApplicationStyles } from '../Themes'
import BlogArticleActions from '../Redux/BlogArticleRedux'
import _ from 'lodash'
import { Icon } from 'native-base';
class BlogArticleScreen extends Component {
  constructor() {
    super()
    this.state = {
      blogArticleData: []
    }
  }
  componentDidMount() {
    this.props.requestBlogArticleData(this.props.id)
    BackHandler.addEventListener('hardwareBackPress', this.handleOnIconBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleOnIconBack);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.getBlogArticle) {
      if (
        newProps.getBlogArticle.fetching == false &&
        newProps.getBlogArticle.error == null &&
        newProps.getBlogArticle.payload
      ) {
        this.setState({ blogArticleData: newProps.getBlogArticle.payload.info })
      }
    }
  }
  handleOnIconBack = () => { 
    Actions.pop()
    return true
  }
  render() {
    if (this.props.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#818791" style={{ alignItems: 'center' }} />
        </View>
      )
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              style={{ height: 218, width: '100%' }}
              source={{ uri: this.props.image }}
            />
          </View>
          {/* menu icon */}
          <View style={styles.menuIconContainer}>
            <View>
              <TouchableOpacity style={{marginTop: 5}} onPress={this.handleOnIconBack}>
                <Icon
                  style={styles.iconWidthHeight}
                  name='arrow-back'
                />
              </TouchableOpacity>
            </View>
          </View>
          <View stlye={styles.containerTextDescription}>
            <View style={styles.subContainerTextDescription}>
              <View>
                <Text style={styles.textDescriptionHeader}>
                  {/* {eachBlogArticleData.title} from API */}
                  {this.props.title}
                </Text>
              </View>
            </View>
          </View>
          {// start article map...
            this.state.blogArticleData.map((eachblogArticleData, indexPage) => {
              // start section map
              return eachblogArticleData.section.map(
                (eachSection, indexSection) => {
                  if (indexSection == 0) {
                    return false
                  }
                  return (
                    // start text block map
                    eachSection.text_block.map(
                      (eachTextBlock, indexTextBlock) => {
                        if(_.isArray(eachTextBlock.paragraph)==false){
                          return false;
                        }
                        const { paragraph, images } = eachTextBlock
                        if (_.isEmpty(paragraph) == true) {
                          return false
                        }
                        const getObjectKey = Object.keys(paragraph)
                        return (
                          <View>
                            {getObjectKey.map((eachObjectKey, index) => {
                              const getSubObjectKey = Object.keys(paragraph[eachObjectKey])[0]
                              const trimValue = paragraph[eachObjectKey][getSubObjectKey].trim()
                              return (
                                <View style={{ padding: trimValue ? 16 : 0, paddingTop: 0 }}>
                                  {trimValue ? (
                                    <Text style={{
                                      fontSize: 15,
                                      color: 'black',
                                      fontFamily:
                                        eachObjectKey == 'subtitle'
                                          ? Fonts.type.oswaldMedium
                                          : Fonts.type.muli,
                                      color:
                                        eachObjectKey == 'subtitle'
                                          ? '#0EB9CB'
                                          : '#000000',
                                      fontWeight:
                                        eachObjectKey == 'subtitle'
                                          ? 'bold'
                                          : 'normal'
                                    }}>

                                      {trimValue.replace(/~{(.*?)}/g, "\n\n")}
                                    </Text>
                                  ) : null}

                                  {getObjectKey.length == index + 1 &&
                                    _.isEmpty(images) == false
                                    ?
                                    images.map(eachImage => {
                                      if (eachImage.url) {
                                        return (
                                          <View style={{ paddingTop: 16 }}>
                                            <Image style={{ width: '100%', height: 220 }} source={{ uri: eachImage.url }} />
                                          </View>
                                        )
                                      }
                                    })
                                    : null}
                                </View>
                              )
                            })}
                          </View>
                        )
                      }
                    )
                  )
                }
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    getBlogArticle: state.blogArticle,
    isFetching:state.blogArticle.fetching
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestBlogArticleData: (id) => dispatch(BlogArticleActions.blogArticleRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogArticleScreen)
