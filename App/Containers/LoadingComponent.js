import React, { Component } from 'react';
import {
    View, ActivityIndicator,Dimensions
} from 'react-native';


export default class LoadingComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#8E8E93" style={{ alignItems: 'center' }} />
            </View>
        )
    }
}