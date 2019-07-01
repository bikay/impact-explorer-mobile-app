import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import styles from './Styles/ActivityListScreenStyle';
import FindMorePagesActions from '../Redux/FindMorePagesRedux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LoadingComponent from './LoadingComponent'

class ActivityListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findMorePagesData: [],
            numColumns: 3,
        }
    }
    componentDidMount() {
        this.props.requestFindMorePagesData()
        BackHandler.addEventListener('hardwareBackPress', this.handleOnIconBack);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleOnIconBack);
    }
    handleOnIconBack = () => {
        Actions.tabbar()
        return true
    }
    componentWillReceiveProps(newProps) {
        if (newProps.getFindMorePages) {
            if (newProps.getFindMorePages.fetching == false && newProps.getFindMorePages.error == null && newProps.getFindMorePages.payload) {
                this.setState({ findMorePagesData: newProps.getFindMorePages.payload.content.pages });
            }
        }
    }
    handleProjectListScreen = (id, title) => {
        if (Actions.currentScene == 'ActivityListScreen') {
            Actions.ProjectListScreen({ id: id, title: title })
        }
    }
    renderItem = ({ item, index }) => {
        if (item.empty == true) {
            return <View style={[styles.gridView, styles.itemInvinsible]} />
        }
        return (
            <TouchableOpacity style={styles.gridView}
                onPress={() => this.handleProjectListScreen(item.id, item.title)}
            >
                <Image style={styles.image} source={{ uri: item.image }} />
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        )
    }
    //Prevent if data has only one item. It won't show full screen.
    formatData = (findMorePagesData, numColumns) => {
        const numberOfFullRows = Math.floor(findMorePagesData.length / numColumns)
        let numberOfElementsLastRow = findMorePagesData.length - (numberOfFullRows * numColumns)

        while (numberOfElementsLastRow != numColumns && numberOfElementsLastRow != 0) {
            findMorePagesData.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
        return findMorePagesData;
    }
    render() {
        return (
            <View style={{ height: '100%' }}>
                { this.props.isFetching ?
                    <LoadingComponent />
                :
                    <FlatList
                        data={this.formatData(this.state.findMorePagesData, this.state.numColumns)}
                        renderItem={this.renderItem}
                        numColumns={this.state.numColumns}
                        style={styles.container}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getFindMorePages: state.findMorePages,
        isFetching: state.findMorePages.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestFindMorePagesData: () => dispatch(FindMorePagesActions.findMorePagesRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityListScreen)