import { StyleSheet,Platform } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        width: "100%",
        height: "100%",
        padding: Metrics.cusBasePadding,
        paddingTop: 30,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 1
    },
    editComponent: {
        marginTop: Metrics.smallMargin,
    },
    header: {
        fontFamily: Fonts.type.muli,
        fontSize: Fonts.size.medium,
        marginLeft: 4,
        color: 'grey',
    },
    textInput: {
        height: 48,
        color: '#000',
        fontFamily: Fonts.type.muli,
        fontSize: Fonts.size.medium,
        borderBottomColor: Platform.OS=='ios'?'lightgrey':null,
        borderBottomWidth: Platform.OS=='ios'? 1 :null
    },
    btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#ff8566',
        top: 20,
        borderRadius: 5,
    },
    textLogin: {
        fontSize: Fonts.size.medium,
        textAlign: 'center',
        color: Colors.snow,
        fontFamily: Fonts.type.oswaldMedium,
        fontSize: Fonts.size.large
    },
    textForgotPass: {
        fontFamily: Fonts.type.muli,
        fontSize: Fonts.size.medium,
        color: '#000',
        textAlign: 'center',
        textAlignVertical: 'center',
        // borderBottomWidth: 1, 
        borderBottomColor: '#0EA5B5',
    },
    errorText: {
        fontFamily: Fonts.type.muli,
        fontSize: Fonts.size.medium,
        color: 'red',
    },

    // ============= style Register screen ===========
    registerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: Metrics.cusBasePadding,
        width: "100%",
        height: "100%",

    },
    registerHeadText: {
        fontFamily: Fonts.type.oswald,
        fontSize: Fonts.size.large + 4,
        color: '#000',
    },
    textRegister: {
        fontFamily: Fonts.type.muli,
        fontSize: Fonts.size.large,
        color: '#000',
        marginLeft: 20,
        // marginTop: 5,
        color: 'white',
    },
    btnLinkSocialMedia: {
        flex: 1,
        borderColor: '#B1B1B1',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    txtConnectWith: {
        fontSize: 15,
        color: Colors.dark,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: Fonts.type.muli,
        fontSize: Fonts.size.medium,
    }
})