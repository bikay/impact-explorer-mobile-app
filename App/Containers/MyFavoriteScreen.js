import React, { Component } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity,
    ActivityIndicator, Image, FlatList, BackHandler, Alert
} from 'react-native';
import styles from './Styles/FavoriteStyle';
import FavoriteItemsActions from '../Redux/FavoriteItemsRedux'
import { connect } from 'react-redux';
import { Images, ApplicationStyles } from '../Themes'
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-elements';


class MyFavoriteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFavorites: [],
        }
    }

    componentDidMount() {
        this.props.requestFavoriteItems()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        Actions.ProfileScreen()
        return true;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.favorites) {
            if (newProps.favorites.fetching == false && newProps.favorites.error == null && newProps.favorites.payload) {
                let favoriteItems = newProps.favorites.payload
                this.setState({ dataFavorites: favoriteItems })
            }
        }
    }

    handleProjectScreen = (id, type) => {
        let screenName = Actions.currentScene
        if (type == 'product') {
            Actions.ProductPageScreen({ id: id, currentSceneName: screenName })
        } else {
            Actions.ProjectScreen({ id: id, currentSceneName: screenName })
        }
    }

    _renderFavoriteItems = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.articleItem} onPress={() => this.handleProjectScreen(item.id, item.type)}>
                <Image source={{ uri: item.image }} style={ApplicationStyles.articleImage} />
                <View style={ApplicationStyles.articleText}>
                    <Text style={ApplicationStyles.articleTitle}>{item.title.toUpperCase()}</Text>
                    {
                        item.tags.map((tagItem) => {
                            return (
                                <Text style={ApplicationStyles.articleDate}>{tagItem.name}</Text>
                            )
                        })
                    }
                    <View style={{ flexDirection: 'row' }}>
                        <Rating
                            type="star"
                            ratingCount={1}
                            fractions={1}
                            startingValue={1}
                            imageSize={15}
                            readonly
                            style={{ alignItems: 'flex-start' }}
                        />
                        <Text style={ApplicationStyles.articleDate}>  {item.rating}</Text>
                    </View>
                </View>
                <View>
                    <Image source={Images.iconHeartRed} style={{ width: 24, height: 24 }} />
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        if (this.props.isFetching) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='#8E8E93' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                </View>
            )
        }

        return (
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, paddingTop: 20, padding: 10 }}>
                    <FlatList
                        data={this.state.dataFavorites}
                        renderItem={this._renderFavoriteItems}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        favorites: state.favoriteItems,
        isFetching: state.favoriteItems.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestFavoriteItems: () => dispatch(FavoriteItemsActions.favoriteItemsRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFavoriteScreen)
