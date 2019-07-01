import { StyleSheet } from 'react-native';
import { Metrics,Fonts,Colors } from '../../Themes'
export default StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: Metrics.baseMarginLeft,
        paddingRight: Metrics.baseMarginRight,
        paddingBottom: Metrics.baseMarginBottom,
        paddingTop: Metrics.baseMarginTop + 8,
        backgroundColor: Colors.mainBackground
    },
    profile: {
        // flex: 1,
        flexDirection: 'row',
    },
    imgProfile: {
        height: 64,
        width: 64,
        borderRadius: 40,
        marginLeft: Metrics.baseMarginLeft + 8
    },
    profileInfo:{
        flexDirection: 'column',
        paddingLeft: Metrics.mediumMargin,
        justifyContent: 'center'
    },
    username:{  
        fontFamily: Fonts.type.oswaldBold,
        color: '#FD7751',
        fontSize: Fonts.size.large,
    }, 
    joinedDate:{
        fontFamily: Fonts.type.oswald,
        color: '#8E8E93',
        fontSize: Fonts.size.medium,
    }, 
    profileMenu: {
        flex: 1,
        marginTop: 48,

    },
    menuTitle:{
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontFamily: Fonts.type.oswaldMedium,
        fontSize: Fonts.size.medium,
        padding: Metrics.mediumMargin,
        color: '#000'
    }
})