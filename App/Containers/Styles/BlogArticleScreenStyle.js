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
        backgroundColor:'pink',
        position:'relative'
    },
    containerTextDescription:{
        flex:1,
        flexDirection:'column'
    }, 
    subContainerTextDescription:{
        flex:1,
        padding:16
    },
    menuIconContainer:{flex:1,
        flexDirection:'row',
        position:'absolute',
        top:16,
        left:16,
        right:16,
        justifyContent:'space-between'
    },
    iconWidthHeight:{
        fontSize: 23,
        color: '#fff'
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
    articleTitleBold:{
        marginBottom:15,
        marginTop: 15,
        fontSize:16,
        fontFamily: Fonts.type.oswaldMedium,
        color:'#000000'
    }
})