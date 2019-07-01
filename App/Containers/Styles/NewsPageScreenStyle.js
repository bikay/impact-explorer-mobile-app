import { StyleSheet,Dimensions} from "react-native";
import {Fonts} from "../../Themes";
export default StyleSheet.create({
    container:{
        flex:1
    },
    imageContainer:{
        flex:1,
        position:'relative',
        height:Dimensions.get('window').height-20
    },
    menuIconContainer:{
        flex:1,
        flexDirection:'row',
        position:'absolute',
        top:16,
        left:16,
        right:16,
        zIndex: 1000,
        justifyContent:'space-between',
        paddingBottom: 15,
        paddingTop:15,
    },
    imageCoverContainer:{
        flex:1,
        position:'absolute',
        // top:((Dimensions.get('window').height)/2)+150,
        // backgroundColor:'red',
        height:218,
        width:'100%',
        top: Dimensions.get('window').height-218,
        right: 0,
        left: 0,
        zIndex: 1999,
        marginBottom: 10,
    },
    iconWidthHeight:{
        width:24,
        height:24
    },
    buttonTravelTripContainer:{
        flex:1,
        position:'absolute',
        top:((Dimensions.get('window').height)/1.8),
        left:19,
        padding:3,
        borderRadius:3

    },
    buttonText:{
        color:'white',
        fontFamily: Fonts.type.oswaldMedium,
        fontSize:14,
        padding:3
    },
    textbuttonTravelTrip:{
        fontSize:12,
        color:'white',
        padding:3,
        fontFamily: Fonts.type.oswaldMedium
    },
    textDescriptionContainer:{
        flex:1,
        position:'absolute',
        top:Dimensions.get('window').height/2,
        left:19,
        width:300
    },
    textDes:{
        marginTop: 100,
        fontSize:32,
        color:'white',
        fontFamily: Fonts.type.oswaldBold
    }
})