import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, FlatList } from 'react-native';
import { Card } from 'native-base'
import styles from './Styles/BookingScreenStyle';
import BookingActions from '../Redux/BookingRedux'
import { connect } from 'react-redux';
import moment from 'moment';
import { Images, ApplicationStyles } from '../Themes'
import { Actions } from 'react-native-router-flux';

class BookingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBooking: [],
            currentDate: '',
            upcomingData: [],
            previousData: [],
            isFetching: true,
            tokenStatus: false,
            inClick: false
        }
        global.screenName = global.screenName ? global.screenName : null;
    }
    closeActivityIndicator = () => setTimeout(() => this.setState({
        isFetching: false
    }), 2500)

    componentDidMount() {
        this.props.requestBookingData()
        this.closeActivityIndicator()
    }

    componentWillReceiveProps(newProps) {
        if (newProps.getBooking) {
            const { fetching, error, payload } = newProps.getBooking
            if (fetching == false && error == null && payload) {
                let currentDate = moment().format('YYYY-MM-DD');
                this.state.upcomingData = []
                this.state.previousData = []
                payload.map((data) => {
                    if (data.date_booking.start_date >= currentDate) {
                        this.state.upcomingData.push(data)
                    } else {
                        this.state.previousData.push(data)
                    }
                })
            }

        }

    }

    _handleProductBookingDetail = (item, index) => {
        this.setState({ inClick: true })
        Actions.BookingDetail({ item: item })
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }

    //======= Previous data of booked and visited renderItem ===========
    renderBookingItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.articleItem} onPress={() => !this.state.inClick ? this._handleProductBookingDetail(item, index) : null}>
                <Image source={{ uri: item.image }} style={ApplicationStyles.articleImage} />
                <View style={ApplicationStyles.articleText}>
                    <Text style={ApplicationStyles.articleTitle}>{item.title.toUpperCase()}</Text>
                    <Text style={ApplicationStyles.articleDate}>{moment(item.date_booking.start_date).format('DD MMM YYYY')} • {item.number_people}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    //=========== Upcoming data renderItem ===============
    renderUpcomingItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => !this.state.inClick ? this._handleProductBookingDetail(item, index) : null}>
                <Card style={styles.cardUpcoming}>
                    <View style={styles.upcomingImg}>
                        <Image source={{ uri: item.image }} style={styles.imageUpcoming} />
                    </View>
                    <View>
                        <View style={styles.upcomingTitle}>
                            <Text style={styles.textTitelPre}>{item.title.toUpperCase()}</Text>
                            <Text style={styles.date}>{moment(item.date_booking.start_date).format('DD MMM YYYY')}  • {item.number_people}</Text>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }

    handleActivity = () => {
        this.setState({ inClick: true })
        Actions.ActivityListScreen()
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }

    render() {
        const isFetching = this.state.isFetching
        if (this.state.isFetching) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ActivityIndicator animating={isFetching} size="large" color='#8E8E93' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleBooking}>Bookings</Text>
                </View>

                <View style={styles.subTitle}>
                    {/*========= upcoming show data ==========*/}
                    {this.state.upcomingData == '' && this.state.previousData == '' ?
                        <View style={styles.newBooking}>
                            <Image source={Images.backpack} style={styles.backpackImage} resizeMode="contain" />
                            <View>
                                <Text style={styles.titleNewBooking}>Where to?</Text>
                            </View>
                            <View>
                                <Text style={styles.noBookingContent}>Start planning your first</Text>
                                <Text style={styles.noBookingContent}>adventure with Impact Explorer</Text>
                            </View>
                            <View style={styles.containerBtnExplore}>
                                <TouchableOpacity style={styles.btnActivity} onPress={!this.state.inClick ? this.handleActivity : null}>
                                    <Text style={styles.txtBtn}>EXPLORE ACTIVITIES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    : this.state.upcomingData != '' ?
                        <View style={styles.upcomingContent}>
                            <Text style={styles.titleEachItem}>Upcoming</Text>
                            <FlatList
                                data={this.state.upcomingData}
                                renderItem={this.renderUpcomingItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    :
                        <View style={styles.noUpcoming}>
                            <Image source={Images.bookingMap} style={styles.mapBooking} resizeMode="contain" />
                            <View>
                                <Text style={styles.noTripTxt}>No upcoming trips</Text>
                            </View>
                            <View>
                                <Text style={styles.subText}>Start exploring ideas for your next trip</Text>
                            </View>
                            <View style={styles.containerBtn}>
                                <TouchableOpacity style={styles.btnActivity} onPress={() => Actions.ActivityListScreen()}>
                                    <Text style={styles.txtBtn}>EXPLORE ACTIVITIES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {/*========== Previous show data ============*/}
                    {this.state.previousData != '' ?
                        <View style={{ flex: 1, paddingTop: 20 }}>
                            <Text style={styles.titleEachItem}>Previous</Text>
                            <FlatList
                                data={this.state.previousData}
                                renderItem={this.renderBookingItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    :<View></View>}
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        getBooking: state.booking,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestBookingData: () => dispatch(BookingActions.bookingRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen)
