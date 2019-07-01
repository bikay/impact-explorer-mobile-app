import React, { Component } from 'react';
import {
    View, Text, StatusBar, TouchableOpacity,
    Image, FlatList
} from 'react-native';
import { ApplicationStyles, Images } from '../Themes';
import styles from './Styles/TravelTipStyle';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base' ;

export default class TravelTipOpenedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.propData
        }
        const { item, color, categoryTitle,subTitle } = props.propData
            this.categoryTitle = categoryTitle,
            this.subTitle = subTitle,
            this.color = color,
            this.item = item
    }
    handleOnIconBack = () => {
        Actions.pop()
    }
    handleOnItemTravelTrip = (id, subTitle, title,color, image) => {
        Actions.NewsPageScreen({
            id: id,
            subTitle: subTitle,
            title: title,
            color: color,
            image: image
        })
    }
    renderAllItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => this.handleOnItemTravelTrip(item.id,this.subTitle,item.title,this.color, item.image)}
            >
                <View style={ApplicationStyles.itemContainer}>
                    <View style={ApplicationStyles.imageContainer}>
                        <Image style={ApplicationStyles.image} source={{ uri: item.image}} />
                    </View>
                    <View style={ApplicationStyles.textContainer}>
                        <Text style={[ApplicationStyles.textTitle, { color: this.color }]}>{this.subTitle}</Text>
                        <Text style={ApplicationStyles.textDescription}>{item.title.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={[ApplicationStyles.headerContainer, { backgroundColor: this.state.data.color }]}>
                    <TouchableOpacity onPress={this.handleOnIconBack}>
                        <Icon name='arrow-back' style={{fontSize: 23, marginLeft: 16,color: '#fff' }} />
                    </TouchableOpacity>
                    <Text style={ApplicationStyles.headerTitle}>{this.categoryTitle}</Text>
                </View>
                <View style={styles.container}>
                    <FlatList
                        data={this.item}
                        renderItem={this.renderAllItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }
}