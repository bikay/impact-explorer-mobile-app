import { StyleSheet, Dimensions } from 'react-native';
import { Metrics, Fonts, Colors } from '../../Themes';
const numColumns = 2;

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.mainBackground,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: Metrics.baseMarginTop,
        paddingBottom: Metrics.smallMargin + 60,
        // padding: 25
    },
    gridView: {
        flex: 1,
        justifyContent: 'center',
        margin: 4,

    },

    image: {
        height: (Dimensions.get('window').width / numColumns) - 18,
        width: (Dimensions.get('window').width / numColumns) - 14,
        borderRadius: 4,
    },
    title: {
        fontFamily: Fonts.type.oswald,
        fontSize: Fonts.size.medium,
        marginTop: Metrics.smallMargin,
        marginBottom: Metrics.smallMargin,
        color: '#000'
    },
    btnList: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 10,
        borderRadius: 4,
        width: '23%'
    },
    textBtnList: {
        fontFamily: Fonts.type.oswaldMedium,
        fontSize: 13,
        textAlign: 'center',
        justifyContent: 'center'
    },

    containerItemSearch: {
        width: '50%',
        marginTop: 5
    },
    contentItem: {
        height: 200,
        backgroundColor: '#ffffff',
        marginRight: 5
    },
    imageItem: {
        width: '100%',
        height: 120,
        alignSelf: 'center',
        borderRadius: 4
    },
    textItem: {
        fontSize: 16,
        color: '#4D4D4D',
        marginTop: 5,
        fontFamily: Fonts.type.oswald,
    }
})