import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainBackground,
        // paddingBottom: Metrics.mediumMargin
    },
    bgImage: {

    },
    //map
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapContainer: {
        height: 200,
        width: '100%',
        marginTop: Metrics.mediumMargin
    },
    //Description
    descText: {
        fontFamily: Fonts.type.muli,
        fontSize: Fonts.size.medium,
        color: Colors.dark
    },
    title: {
        fontFamily: Fonts.type.oswaldBold,
        fontSize: Fonts.size.medium,
        color: '#8CBC12',
        marginTop: Metrics.mediumMargin,
        marginBottom: Metrics.smallMargin
    },

    tabContainer: {
        height: 60,
        width: '100%',
        backgroundColor: 'white'
    },
    tabItem: {
        justifyContent: 'center',
        padding: 12,
    },
    tabText: {
        fontFamily: Fonts.type.oswaldMedium,
        fontSize: Fonts.size.medium,

    },

    scrollContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 16,
    },
    

})