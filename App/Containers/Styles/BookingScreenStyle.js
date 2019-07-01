import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../Themes';
import { Dimensions } from 'react-native';
export default StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    title: {

        padding: 10,

    },
    titleBooking: {
        fontFamily: Fonts.type.oswald,
        fontSize: 32,
        color: '#000',
    },
    subTitle: {
        padding: 10
    },
    titleEachItem: {
        fontFamily: Fonts.type.oswald,
        fontSize: 25,
        color: '#000',
        paddingBottom: 20
    },
    articleItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 100,
        marginTop: 8,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 4,
        width: (Dimensions.get('window').width) - 16,
    },

    imageCard: {
        flex: 1,
    },
    imagePre: {
        flex: 1,
        width: '85%',
        borderRadius: 4,
    },
    textTitelPre: {
        fontFamily: Fonts.type.oswald,
        fontSize: 16,
        color: '#000',
        width: "90%",
        paddingTop: 1,

    },
    previousTitle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    date: {
        fontFamily: Fonts.type.muli,
        fontSize: 13
    },
    cardUpcoming: {
        borderRadius: 4
    },
    imageUpcoming: {
        // flex: 1,
        height: 200,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        padding: 5,
        // marginTop: 50
    },
    upcomingTitle: {
        padding: 20
    },
    upcomingContent: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 30,
    },
    noUpcoming: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 5
    },
    mapBooking: {
        height: 140,
        width: "100%"
    },
    noTripTxt: {
        fontFamily: Fonts.type.oswald,
        fontSize: 30,
        color: '#8E8E93',
        paddingTop: 20
    },
    subText: {
        fontFamily: Fonts.type.muli,
        fontSize: 16,
        color: '#8E8E93',
        paddingTop: 10,
        paddingBottom: 20
    },
    btnActivity: {
        alignItems: 'center',
        // justifyContent: 'center',
        // height: 50,
        borderWidth: 1,
        borderRadius: 4,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#FD7751',
    },
    txtBtn: {
        fontFamily: Fonts.type.oswald,
        fontSize: 20,
        flex: 1,
        // textAlign: 'center',
        // textAlignVertical: 'center',
        color: '#FD7751'
    },
    containerBtn: {
        width: "60%",
        flex: 3,
        paddingBottom: 25
    },
    newBooking: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 5,
        paddingTop: 60
    },
    titleNewBooking: {
        fontFamily: Fonts.type.oswald,
        fontSize: 30,
        color: '#8E8E93',
        paddingTop: 20,
        paddingBottom: 20
    },
    backpackImage: {
        height: 140,
        width: "100%"
    },
    noBookingContent: {
        fontFamily: Fonts.type.muli,
        fontSize: 18,
        color: '#8E8E93',
        textAlign: 'center'
    },
    containerBtnExplore: {
        width: "70%",
        flex: 3,
        marginTop: 25
    }
})