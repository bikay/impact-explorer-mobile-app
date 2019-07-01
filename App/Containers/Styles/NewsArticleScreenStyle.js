import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles,Fonts} from "../../Themes";
export default StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column'
    },
    //header with image that caculate with position relative and absolute
    headerContainer:{
        flex:1,
        flexDirection:'column',
        height:218,
        position:'relative'
    },
    menuIconContainer:{
        // position: 'absolute', top: 0, flex: 1, alignSelf: 'stretch', right: 0, left: 0
        flex:1,
        flexDirection:'row',
        position:'absolute',
        top:16,
        left:16,
        right:16,
        zIndex: 999,
        justifyContent:'space-between',
        paddingBottom: 15,
        paddingTop:15,
    },
    iconWidthHeight:{
        color:"#fff" 
    },
    buttonTravelTripContainer:{
        position:'absolute',
        left:16,
        top:160,
        padding:3,
        backgroundColor:'#0EB9CB',
        borderRadius:3
    },
    buttonText:{
        color:'white',
        fontFamily: Fonts.type.oswaldMedium,
        fontSize:14,
        padding:3, 
    },
    // style with textDescription design
    containerTextDescription:{
        flex:1,
        flexDirection:'column'
    },
    subContainerTextDescription:{
        flex:1,
        padding:16
    },
    textDescriptionHeader:{
        fontSize:32,
        fontFamily: Fonts.type.oswaldBold,
        marginBottom:10,
        color:'#000000'
    },
    textArticle:{
        marginBottom:10,
        fontFamily: Fonts.type.muli,
        fontSize:16
    },
    articleTitleColor:{
        marginBottom:10,
        fontSize:16,
        fontFamily: Fonts.type.oswaldMedium,
    }
})