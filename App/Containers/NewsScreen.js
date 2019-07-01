import React, { Component } from 'react'
import { Text, View, ScrollView, Button, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, BackHandler } from 'react-native'
import { Images, Fonts, ApplicationStyles } from '../Themes'
import styles from './Styles/NewsScreenStyle'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import NewsTravelTipActions from '../Redux/NewsTravelTipRedux'
import NewsBlogActions from '../Redux/NewsBlogRedux'
class NewsScreen extends Component {
  constructor() {
    super()
    this.state = {
      newsTravelTipData: [],
      newsBlogData: [],
      menuTitle: [
        {
          title: 'Blog'
        },
        {
          title: 'Travel Tips'
        }
      ],
      titleName: 'Blog',
      statusSelectedBg: [true, false],
      inClick: false
    }
  }
  componentDidMount() {
    // call from dispach
    this.props.requestNewsTravelTipData()
    this.props.requestNewsBlogData()
    BackHandler.addEventListener('hardwareBackPress', this.handleOnIconBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleOnIconBack);
  }

  handleOnIconBack = () => {
    return true
  }

  componentWillReceiveProps(newProps) {
    if (newProps.getNewsTravelTip) {
      if (
        newProps.getNewsTravelTip.fetching == false &&
        newProps.getNewsTravelTip.error == null &&
        newProps.getNewsTravelTip.payload
      ) {
        this.setState({
          newsTravelTipData: newProps.getNewsTravelTip.payload.tips
        })
      }
    }
    if (newProps.getNewsBlog) {
      if (
        newProps.getNewsBlog.fetching == false &&
        newProps.getNewsBlog.error == null &&
        newProps.getNewsBlog.payload
      ) {
        this.setState({ newsBlogData: newProps.getNewsBlog.payload.news })
      }
    }
  }
  handleOnTravelTrip = (menuTitle, indexTitle) => {
    this.state.statusSelectedBg.map((eachStatus, indexStatus) => {
      if (indexTitle == indexStatus) {
        this.state.statusSelectedBg[indexStatus] = true
      } else {
        this.state.statusSelectedBg[indexStatus] = false
      }
    })
    this.setState({
      statusSelectedBg: this.state.statusSelectedBg,
      titleName: menuTitle.title
    })
  }
  handleOnSubItemTravelTrip = (id, subTitle, title, color, image) => {
    this.setState({ inClick: true })
    Actions.NewsPageScreen({ id: id, subTitle: subTitle, title: title, color: color, image: image })
    setTimeout(function () {
      this.setState({ inClick: false });
    }.bind(this), 2000);
  }
  handleOnSubItemBlog = (id, title, image, created, author) => {
    this.setState({ inClick: true })
    Actions.BlogArticleScreen({ id: id, title: title, image: image, created: created, author })
    setTimeout(function () {
      this.setState({ inClick: false });
    }.bind(this), 2000);
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={ApplicationStyles.articleItemFull}
        onPress={() => !this.state.inClick ? this.handleOnSubItemBlog(item.id, item.title, item.image, item.created, item.author) : null}>
        <View style={ApplicationStyles.imageFullContainer}>
          <Image
            source={{ uri: item.image }}
            style={ApplicationStyles.articleImageFull}
          />
        </View>
        <View style={ApplicationStyles.articleTextFull}>
          <View>
            <Text style={ApplicationStyles.articleTitleFull}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  handleViewAllItem = (item, categoryTitle, subTitle, color) => {
    let propData = {
      item: item.subData.page,
      categoryTitle: categoryTitle,
      subTitle: subTitle
    }
    Object.assign(propData, { color: color })
    Actions.TravelTipOpenedScreen({ propData: propData });
  }
  renderItemTravelTrip = ({ item, index }) => {
    const color = index == 0 ? '#0EB9CB' : index == 1 ? '#FD7751' : '#8CBC12'
    const subTitle = index == 0 ? 'TRAVEL TIPS' : index == 1 ? 'COMMUNITY' : 'SUSTAINABLE'
    const categoryTitle = index == 0 ? 'TRAVEL TIPS' : index == 1 ? 'COMMUNITY HOMESTAY TIPS' : 'SUSTAINABLE TOURISM'

    return (
      <View>
        <View style={[ApplicationStyles.headerListItemContainer, { marginTop: 8 }]}>
          <Text style={ApplicationStyles.headerListItemName}>{categoryTitle}</Text>
          <TouchableOpacity
            onPress={() => this.handleViewAllItem(item, categoryTitle, subTitle, color)}
          >
            <Text style={ApplicationStyles.buttonViewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        {
          item.subData.page.map((subItem, subIndex) => {
            if (subIndex > 2) {
              return false;
            }
            return (
              <TouchableOpacity
                onPress={() => !this.state.inClick ? this.handleOnSubItemTravelTrip( subItem.id, subTitle, subItem.title, color, subItem.image ): null}>
                <View style={ApplicationStyles.itemContainer}>
                  <View style={ApplicationStyles.imageContainer}>
                    <Image style={ApplicationStyles.image} source={{ uri: subItem.image }} />
                  </View>
                  <View style={ApplicationStyles.textContainer}>
                    <Text style={[ApplicationStyles.textTitle,
                    { color: color }]}>
                      {subTitle}</Text>
                    <Text style={ApplicationStyles.textDescription}>{subItem.title.toUpperCase()}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  render() {
    const { container, headerContainer, headerTitle, menuContainer } = styles
    return (
      <ScrollView horizontal={false}>
        <View style={container}>
          <View style={headerContainer}>
            <Text style={headerTitle}>IMPACT TRAVEL GUIDE</Text>
          </View>
          {/* Menu Design */}
          <View style={menuContainer}>
            {this.state.menuTitle.map((menuTitle, indexTitle) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.handleOnTravelTrip(menuTitle, indexTitle)
                    }
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        paddingRight: 10,
                        paddingLeft: 10,
                        paddingTop: 10,
                        paddingBottom: 5,
                        marginLeft: 5,
                        marginRight: 16,
                        fontFamily: Fonts.type.oswaldMedium,
                        color: this.state.statusSelectedBg[indexTitle]
                          ? '#090909'
                          : '#8E8E93',
                        borderBottomWidth: this.state.statusSelectedBg[
                          indexTitle
                        ]
                          ? 2.5
                          : 0,
                        borderBottomColor: this.state.statusSelectedBg[
                          indexTitle
                        ]
                          ? '#FD7751'
                          : null
                      }}
                    >
                      {menuTitle.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>
          {this.props.isNewsBlogFetching == true ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: Dimensions.get('window').width / 2 }}>
              <ActivityIndicator size="large" color="#FD7751" style={{ alignItems: 'center' }} />
            </View>
            : null}
          <FlatList
            style={{ width: '100%' }}
            data={
              this.state.titleName == 'Blog'
                ? this.state.newsBlogData
                : this.state.newsTravelTipData
            }
            renderItem={
              this.state.titleName == 'Blog'
                ? this.renderItem
                : this.renderItemTravelTrip
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    )
  }
}
const mapStateToProps = state => {
  return {
    getNewsTravelTip: state.newsTravelTip,
    getNewsBlog: state.newsBlog,
    isNewsBlogFetching: state.newsBlog.fetching,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestNewsTravelTipData: () =>
      dispatch(NewsTravelTipActions.newsTravelTipRequest()),
    requestNewsBlogData: () => dispatch(NewsBlogActions.newsBlogRequest())
  }
}
export default connect( mapStateToProps, mapDispatchToProps )(NewsScreen)
