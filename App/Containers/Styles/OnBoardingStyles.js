import {StyleSheet} from 'react-native';
import {Fonts,Colors} from '../../Themes';
 
export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center'
      // marginTop: "20%",
    },
    img: {
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: "20%",      
      // borderRadius: 100/2
    },
    bigTitle: {
      textAlign: 'center',
      fontFamily: Fonts.type.oswaldBold,
      fontSize: Fonts.size.bigTitle,
      paddingTop: 20,
      color: Colors.mainBackground,
    },
    description: {
      textAlign: 'center',
      fontSize: Fonts.size.medium,
      fontFamily: Fonts.type.muliBold,
      paddingTop: 24,
      paddingRight: 60,
      paddingLeft: 60,
      color: '#fff',
    },
    txtStart: {
      // textAlign: 'center',
      fontSize: Fonts.size.regular,
      fontFamily: Fonts.type.muliBold,
      // paddingTop: 24,
      paddingRight: 20,
      paddingLeft: 20,
      color: '#fff'
    },
    dotView:{
      borderWidth: 1,
      borderColor: '#fff',
      width: 10,
      height: 10,
      borderRadius: 10,
      marginRight: 3,
    },
    activeDot:{
      backgroundColor: '#fff',
      width: 10,
      height: 10,
      borderRadius: 10,
      marginRight: 5,
    },
    circleImage: {
      width: 250, 
      height: 250, 
      borderRadius: 250 / 2,
      borderWidth: 10,
      borderColor: '#5BC8D3',
      // opacity: 0.7,
    },
    lastTitle: {
      textAlign: 'center',
      fontFamily: Fonts.type.oswaldBold,
      fontSize: Fonts.size.bigTitle,
      color: Colors.mainBackground,
    }
    
  });