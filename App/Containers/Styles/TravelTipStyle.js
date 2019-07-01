import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8,
        paddingLeft: Metrics.baseMarginLeft,
        paddingRight: Metrics.baseMarginRight,
        paddingBottom: Metrics.baseMarginBottom,
        backgroundColor: Colors.mainBackground,
    },
    header: {
        paddingTop: 16,
        paddingBottom: 16
    },
    viewAllContainer: {
        backgroundColor: Colors.mainBackground,
        paddingLeft: Metrics.baseMarginLeft,
        paddingRight: Metrics.baseMarginRight,
        paddingBottom: 8
    },
    searchIcon: {
        padding: 10,
        color: '#E0E0E0'
    },
    input: {
        color: '#424242',
        width: '100%',
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.muli,
    },
    searchSection: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 4,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
        marginBottom: 8 
    },
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
    },
    mainTitle:{
        marginLeft: 32,
        fontFamily: Fonts.type.oswaldBold,
        fontSize: 20,
        color:'white'
    }
})