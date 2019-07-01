import { StyleSheet,Platform } from "react-native";
import {Metrics,Fonts,Colors} from '../../Themes';
export default StyleSheet.create({
    container:{
        flex: 1, 
        padding: 16,
        flexDirection:"column",
        backgroundColor:'white',
        position:'relative'
    },
    loginContainer:{
        flexDirection:'row',
        height:64,
        backgroundColor:'#f2e1dc',
        justifyContent:'space-between',
        paddingTop:16,
        paddingBottom: 16,
        paddingLeft: 10,
        paddingRight: 24,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#f2e1dc",
    },
    textStyle:{
        fontFamily: Fonts.type.muli,
        fontSize: 16,
        color:'black'
    },
    detailStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius: 4 ,
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1.5,
    },
    textInput:{
        height:48,
        backgroundColor:'#fff',
        fontFamily: Fonts.type.oswaldMedium,
        fontSize: Fonts.size.medium,
        borderBottomColor: Platform.OS=='ios'?'lightgrey':null,
        borderBottomWidth: Platform.OS=='ios'? 1 :null
    },
    buttonAddToCard: {
        
        height: 50,
        backgroundColor: '#FD7751',
        
        justifyContent: 'center',
        alignItems: 'center',
         
    },
    textButtonAddToCard:{
        fontFamily: Fonts.type.oswaldMedium,
        fontSize: 16,
        color:'#FFFFFF'
    },
})