import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import StatusConnectionActions from '../Redux/StatusConnectionRedux'
import { connect } from 'react-redux'

const { width } = Dimensions.get('window');
function MiniOfflineSign() {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
}
class OfflineNoticeScreen extends PureComponent {
    state = {
        isConnected: true
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        setInterval(() => {
            this.setState({
                curTime: new Date().toLocaleString()
            })
        }, 1000)
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
        this.props.setStatusConnection(isConnected)
    };
    render() {
        if (!this.state.isConnected) {
            return <MiniOfflineSign />;
        }
        return null;
    }
}
const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 30
    },
    offlineText: {
        color: '#fff'
    }
});

const mapStateToProps = (state) => {
    return {
        statusConnection: state.statusConnection,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setStatusConnection: (status) => dispatch(StatusConnectionActions.setStatusConnectionRequest(status)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineNoticeScreen) 