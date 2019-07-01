import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles,Fonts} from "../../Themes";
export default StyleSheet.create({
    container:{
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    cardHeader:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 130,
        marginTop: 8,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 4 ,
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1.5,
    },
    articleContainer:{
        flex: 1, 
        paddingLeft:16,
    },
    articleText:{
        fontSize: 16,
        width: '90%',
        paddingTop: 2,
        fontFamily: Fonts.type.oswaldMedium,
        color: '#000'
    },
    articleDate:{
      fontSize:13,
      paddingTop:8,
      fontFamily:Fonts.type.muli 
    },
    articlePriceColor:{
        fontFamily: Fonts.type.oswaldMedium,
        color:'#FD7751',
        fontSize:16,
        paddingTop:3,
    },
    btnContainer:{
        width:250,
        height:50,
        borderColor: '#FD7751',
        borderWidth: 1,
        borderRadius: 4
    }
    ,
    textAddMore:{
        fontFamily: Fonts.type.oswaldMedium,
        color:'#FD7751',
        fontSize:16,
        paddingTop:10
    },
    articleTotal:{
        fontSize:16,
        fontFamily:Fonts.type.oswald
    },
    articlePrice:{
        fontFamily: Fonts.type.oswaldMedium,
        color:'#000000',
        fontSize:16,
        paddingTop:3,
        paddingRight:10
    },
    btnProceedToCheckoutContainer:{
        width:'100%',
        height:50,
        backgroundColor:'#FD7751',
        borderWidth: 1,
        borderRadius: 4,
        borderColor:'#FD7751',
        
    },
    textProceedToCheckout:{
        fontFamily: Fonts.type.oswaldMedium,
        color:'#FFFFFF',
        fontSize:16,
        paddingTop:10
    },
    
})