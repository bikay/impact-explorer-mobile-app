import React, { Component } from 'react';
import {
    View, Text, FlatList, Image,
    TouchableOpacity, ActivityIndicator, Dimensions, BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import NewsArticlePageActions from '../Redux/NewsArticlePageRedux'
import { ApplicationStyles, Images } from '../Themes';
import { Rating } from 'react-native-elements';
import { Icon } from 'native-base'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';
import styles from './Styles/ProjectListStyle'
import LoadingComponent from './LoadingComponent'
class ProjectListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsArticlePageData: [],
            per_page: 10,
            current_post_data: [],
            next_post_data: [],
            isLoadingMore: false
        }
    }
    componentDidMount() {
        this.props.requestNewsArticlePageData(this.props.id)
        BackHandler.addEventListener('hardwareBackPress', this.handleOnIconBack);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.getNewsArticlePage) {
            const { fetching, error, payload } = newProps.getNewsArticlePage
            if (fetching == false && error == null && payload && payload.info && payload.info.length > 0) {
                const { section } = payload.info[0]
                section.map((eachSec, index) => {
                    checkPostKey = _.has(eachSec, 'posts')
                    if (checkPostKey) {
                        this.handleGetDataPerPage(eachSec["posts"])
                    }
                })
            }
        }
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleOnIconBack);
    }
    handleProjectScreen = (id) => {
        Actions.ProjectScreen({ id: id, title: this.props.title, projectListId: this.props.id })
    }
    handleOnIconBack = () => {
        Actions.ActivityListScreen()
        return true
    }
    handleGetDataPerPage = (postData) => {
        let { per_page, current_post_data, next_post_data, newsArticlePageData, isLoadingMore } = this.state
        next_post_data = []
        current_post_data = []
        if (postData && postData.length - 1 > per_page) {
            postData.map((eachPost, indexPost) => {
                indexPost = indexPost + 1
                if (indexPost > per_page) {
                    next_post_data.push(eachPost)
                } else {
                    current_post_data.push(eachPost)
                }
            })
        } else {
            current_post_data = postData
        }
        this.setState({ isLoadingMore: false, next_post_data, current_post_data, newsArticlePageData: [...newsArticlePageData, ...current_post_data] });
    }
    loadMore = () => {
        let { next_post_data } = this.state
        if (next_post_data.length > 0) {
            this.setState({ isLoadingMore: true });
            setTimeout(function () {
                this.handleGetDataPerPage(next_post_data);
            }.bind(this), 500)
        }
    }
    renderItems = ({ item, index }) => {
        return (
            <TouchableOpacity style={[ApplicationStyles.articleItem, { height: 130 }]} onPress={() => this.handleProjectScreen(item.id)}>
                <Image source={{ uri: item.image }} style={[ApplicationStyles.articleImage, { width: '31%' }]} />
                <View style={[ApplicationStyles.articleText, { justifyContent: 'space-evenly' }]}>
                    <View>
                        <Text style={[ApplicationStyles.articleTitle, { marginTop: 2 }]}>{item.title.toUpperCase()}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                        {item.tags.list ?
                            <Text style={ApplicationStyles.articleDate}>{item.tags.list[0].name}</Text> //18 strings max
                            :
                            false
                        }
                        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                            <Rating
                                type="star"
                                fractions={1}
                                startingValue={item.total_rating}
                                imageSize={16}
                                readonly
                                style={{ alignItems: 'flex-start' }}
                            />
                            <Text style={ApplicationStyles.articleDate}>  {item.total_rating}/5</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', width: '100%', position: 'absolute' }}>
                            <TouchableOpacity
                                style={[styles.button]}
                                onPress={() => this.handleProjectScreen(item.id)}>
                                <Text style={styles.buttonText}>BOOK NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={[styles.container, { height: '100%' }]}>
                <View style={[ApplicationStyles.headerContainer, { backgroundColor: '#FD7751' }]}>
                    <TouchableOpacity onPress={this.handleOnIconBack}>
                        <Icon name='arrow-back' style={{ color: '#fff', fontSize: 23, marginLeft: 16 }} />
                    </TouchableOpacity>
                    <Text style={ApplicationStyles.headerTitle}>{this.props.title}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 60 }}>
                    {this.props.isFetching ?
                        <View style={{ marginTop: 40 }}>
                            <LoadingComponent />
                        </View>
                        :
                        <FlatList
                            data={this.state.newsArticlePageData}
                            renderItem={this.renderItems}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.loadMore}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={() => {
                                return (
                                    this.state.isLoadingMore ?
                                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 56 }}>
                                            <ActivityIndicator size="large" color='blue' />
                                        </View>
                                    :  <View />
                                )
                            }}
                        />
                    }
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        getNewsArticlePage: state.newsArticlePage,
        isFetching: state.newsArticlePage.fetching,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestNewsArticlePageData: (id) => dispatch(NewsArticlePageActions.newsArticlePageRequest(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListScreen)