import {StyleSheet} from 'react-native';
import {Metrics,Fonts,Colors} from '../../Themes';
export default StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Metrics.baseMarginTop + 8,
        paddingLeft: Metrics.baseMarginLeft,
        paddingRight: Metrics.baseMarginRight,
        paddingBottom: Metrics.baseMarginBottom,
        alignItems: 'center',
        // backgroundColor: Colors.mainBackground
    },
    imgProfile:{
        width: 96,
        height: 96,
        borderRadius: 48,
    },
    changeAvatar:{
        fontFamily: Fonts.type.muliBold,
        marginTop: Metrics.smallMargin,
        marginBottom: Metrics.mediumMargin + 8,
        fontSize: 13,
        color: '#8CBC12'
    },
    info:{
        marginBottom: Metrics.baseMarginBottom,
        alignItems: 'center'
    },
    bigText:{
        fontFamily: Fonts.type.oswaldMedium,
        fontSize: Fonts.size.medium,
        color: '#000'
    },
    smallText:{
        fontFamily: Fonts.type.muli,
        fontSize: Fonts.size.small + 1,
    }

})