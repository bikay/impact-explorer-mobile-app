import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator, TextInput, BackHandler } from 'react-native';
import styles from './Styles/HomeScreenStyles';
import searchStyle from './Styles/SearchResultStyle'
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SearchResultActions from '../Redux/SearchResultRedux'
import { connect } from 'react-redux';
let dataAfterFilter;

class SearchResult extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            listBtnSearch: [
                { text: 'Activities', listType: 'project' },
                { text: 'Tours', listType: 'product' },
                { text: 'News', listType: 'post' },
                { text: 'Travel tips', listType: 'page' }
            ],
            statusBtnSearch: [true, false, false, false],
            statusBtnSearchTravel: [false, false, true, false],
            searchData: [],
            filterSearch: [],
            numColumns: 2,
            inClick: false,
            travelTripScene: props.travelTripScene
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.searchBack);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.searchBack);
    }
    componentWillReceiveProps(newProps) {
        //===== search result =====
        if (newProps.searchResult) {
            if (newProps.searchResult.fetching == false && newProps.searchResult.error == null && newProps.searchResult.payload.results) {
                let searchData = newProps.searchResult.payload.results
                this.state.searchData = []
                this.state.searchData.push(searchData)

                if (this.state.search != '') {
                    this.handleSearch(this.props)
                }

                var searchFilter = this.state.searchData
                // search condition for search from TravelTipScreen
                if (this.state.travelTripScene) {
                    this.state.statusBtnSearchTravel.map((con, index) => {
                        if (this.state.statusBtnSearchTravel[index]) {
                            this.state.listBtnSearch.map((data, btnIndex) => {
                                if (index == btnIndex) {
                                    searchFilter.map((eachData, index) => {
                                        dataAfterFilter = eachData.filter(function (dataSearch) {
                                            return dataSearch.type == data.listType
                                        });
                                        this.setState({ filterSearch: dataAfterFilter })
                                    })
                                }
                            })
                        }
                    })
                } else {
                    // search condition for search from HomeScreen
                    this.state.statusBtnSearch.map((con, index) => {
                        if (this.state.statusBtnSearch[index]) {
                            this.state.listBtnSearch.map((data, btnIndex) => {
                                if (index == btnIndex) {
                                    searchFilter.map((eachData, index) => {
                                        dataAfterFilter = eachData.filter(function (dataSearch) {
                                            return dataSearch.type == data.listType
                                        });
                                        this.setState({ filterSearch: dataAfterFilter })
                                    })
                                }
                            })
                        }
                    })
                }
            }
        }
    }
    // ======== back function on search ===========
    searchBack = () => {
        this.setState({ inClick: true, filterSearch: [] })
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
        Actions.pop()
        return true
    }
    // ====== handle when user search =======
    handleSearch = (text) => {
        this.setState({ search: text })
        if (text.length >= 3 && text.length <= 20) {
            this.props.requestSearchResult(text)
        }
    }
    // ===== click on close icon to clear text ======
    clearText = () => {
        this.setState({ search: '' })
        this.textInput.clear();
    }
    // function for active list btn after press key for search 
    activeSearchBtn = (list, index) => {
        var searchFilter = this.state.searchData
        // condition if search from TravelTipScreen or from home screen 
        if (this.state.travelTripScene) {
            searchFilter.map((eachData, index) => {
                dataAfterFilter = eachData.filter(function (dataSearch) {
                    return dataSearch.type == list.listType
                });
            })
            this.state.statusBtnSearchTravel.map((status, indexStatus) => {
                if (index == indexStatus) {
                    this.state.statusBtnSearchTravel[indexStatus] = true
                }
                else {
                    this.state.statusBtnSearchTravel[indexStatus] = false
                }
            })
            this.setState({ statusBtnSearchTravel: this.state.statusBtnSearchTravel, filterSearch: dataAfterFilter })
        } else {
            searchFilter.map((eachData, index) => {
                dataAfterFilter = eachData.filter(function (dataSearch) {
                    return dataSearch.type == list.listType
                });
            })
            this.state.statusBtnSearch.map((status, indexStatus) => {
                if (index == indexStatus) {
                    this.state.statusBtnSearch[indexStatus] = true
                }
                else {
                    this.state.statusBtnSearch[indexStatus] = false
                }
                this.setState({ statusBtnSearch: this.state.statusBtnSearch, filterSearch: dataAfterFilter })
            })
        }
    }
    // = = = handle go to each screen = = = 
    handleAccessToScreen = (item) => {
        this.setState({ inClick: true })
        if (item.type == 'project') {
            Actions.ProjectScreen({ id: item.ID, currentSceneName: Actions.currentScene })
        } else if (item.type == 'product') {
            Actions.ProductPageScreen({ id: item.ID, currentSceneName: Actions.currentScene })
        } else if (item.type == 'post') {
            Actions.BlogArticleScreen({ id: item.ID, title: item.title, image: item.image })
        } else if (item.type == 'page') {
            Actions.NewsPageScreen({ id: item.ID, title: item.title, image: item.image })
        }
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }
    // ====== item after search ======
    renderResultSearch = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => !this.state.inClick ? this.handleAccessToScreen(item) : null} style={searchStyle.containerItemSearch}>
                <View style={searchStyle.contentItem}>
                    <View style={{ margin: 5 }}>
                        <Image source={{ uri: item.image }} style={searchStyle.imageItem} />
                        <Text style={searchStyle.textItem}>{item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={searchStyle.container}>
                {/* ========= Search Section -Input text search ========*/}
                <View style={styles.searchContainer}>
                    <View style={styles.searchSection}>
                        <TouchableOpacity onPress={!this.state.inClick ? this.searchBack : null}>
                            <Icon style={styles.searchIcon} name="arrow-back" size={20} color="#000" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder='Search people & places'
                            underlineColorAndroid="transparent"
                            ref={ref => {
                                this.textInput = ref;
                            }}
                            onChangeText={(text) => this.handleSearch(text)}
                            autoFocus={true}
                            maxLength={35}
                        />
                        {this.state.search ?
                            <TouchableOpacity style={{ position: 'absolute', left: '87%' }} onPress={this.clearText}>
                                <Icon style={{ padding: 10, color: "#E0E0E0" }} name="close" size={20} />
                            </TouchableOpacity>
                            : null}
                    </View>
                </View>
                {this.state.search ?
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {this.state.listBtnSearch.map((list, index) => {
                                return (
                                    <TouchableOpacity onPress={() => this.activeSearchBtn(list, index)} style={[searchStyle.btnList, {
                                        backgroundColor: this.state.travelTripScene ?
                                            this.state.statusBtnSearchTravel[index] ? '#0EB9CB' : null
                                            : this.state.statusBtnSearch[index] ? '#0EB9CB' : null
                                    }]}>
                                        <Text style={[searchStyle.textBtnList, {
                                            color: this.state.travelTripScene ?
                                                this.state.statusBtnSearchTravel[index] ? '#fff' : '#0EB9CB'
                                                : this.state.statusBtnSearch[index] ? '#fff' : '#0EB9CB'
                                        }]}>{list.text}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        {this.state.search.length < 3 ? null : this.props.fetchingResult ?
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <ActivityIndicator size="large" color='#8E8E93' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                            </View>
                            :
                            <FlatList
                                renderItem={this.renderResultSearch}
                                data={this.state.filterSearch}
                                numColumns={this.state.numColumns}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        }
                    </View>
                : null }
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        searchResult: state.searchResult,
        fetchingResult: state.searchResult.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestSearchResult: (data) => dispatch(SearchResultActions.searchResultRequest(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)

