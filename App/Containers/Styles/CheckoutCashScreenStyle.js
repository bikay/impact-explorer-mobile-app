import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles,Fonts} from "../../Themes";
export default StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        padding:16,
        backgroundColor:'white'
    },
    paymentMethodContainer:{
        flex:1,        
        flexDirection:"column",
        backgroundColor:'#f2e1dc',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#f2e1dc"
    },
    textStyle:{
        fontFamily: Fonts.type.oswaldMedium,
        fontSize: 16,
        color:'black'
    },
    btnPlaceOrderContainer:{
        width:'100%',
        height:50,
        backgroundColor:'#FD7751',
        borderWidth: 1,
        borderRadius: 4,
        borderColor:'#FD7751'
        
    },
    textPlaceOrder:{
        fontFamily: Fonts.type.oswaldMedium,
        color:'#FFFFFF',
        fontSize:16,
        paddingTop:10
    },
})