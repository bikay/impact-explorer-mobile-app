import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StatusBar } from 'react-native';
import styles from './Styles/HeaderStyle';
import { Icon } from 'native-base';
import { connect } from 'react-redux';

class HeaderScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusHeader: true,
            statusIcon: false,
            title: "",
            title_color: "",
            bg_color: "",
            status_bar_color: "gray"
        }
    }
    componentWillReceiveProps(newProps) {
        const { fetching, error, data } = newProps.headerData
        if (fetching == false && error == null) {
            const { statusHeader, statusIcon, title, title_color, bg_color, status_bar_color } = data
            this.setState({
                statusHeader,
                statusIcon,
                title,
                title_color,
                bg_color,
                status_bar_color
            });
        }
    }
    render() {
        if(this.props.headerData.data==null){
            return false;
        }
        if (!this.state.statusHeader) return (<View></View>)
        let title_header = ""
        if (this.state.title) {
            title_header = this.state.title.replace(/(\r\n\t|\n|\r\t)/gm, "");
        }
        return (
            <View style={[styles.itemContainer,{backgroundColor:this.state.bg_color}]}>
                <StatusBar backgroundColor={this.state.status_bar_color} translucent />
                <TouchableOpacity style={styles.iconHeader}>
                    <Icon style={{color: this.state.title_color}} name="arrow-back" type="MaterialIcons" />
                </TouchableOpacity>
                <Text style={[styles.textHeader,{color: this.state.title_color}]}>
                    {title_header != '' ?
                        title_header.length > 25 ?
                            title_header.substr(0, 23) + "..."
                        :
                            title_header
                    : '' }
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        headerData: state.header
    }
}

export default connect(mapStateToProps, null)(HeaderScreen)