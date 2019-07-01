import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Fonts } from "../../Themes";
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    //header with image that caculate with position relative and absolute
    headerContainer: {
        flex: 1,
        flexDirection: 'column',
        height: 218,
        position: 'relative'
    },
    menuIconContainer: {
        // position: 'absolute', top: 0, flex: 1, alignSelf: 'stretch', right: 0, left: 0
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        top: 16,
        left: 16,
        right: 16,
        zIndex: 999,
        justifyContent: 'space-between',
        paddingBottom: 15,
        paddingTop: 15,
    },
    iconWidthHeight: {
        fontSize: 23,
        color:'#fff',
        marginBottom: 4
    },    
    containerinformation: {
        flex: 1,
        flexDirection: 'column'
    },
    subContainerinformation: {
        flex: 1,
        padding: 16
    },
    textShortInformation: {
        marginBottom: 10,
        fontFamily: Fonts.type.muli,
        fontSize: 16,
        
    },
    contentPad: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    mapContainer: {
        height: 200,
        width: '100%',
        paddingBottom: 20
    },
})