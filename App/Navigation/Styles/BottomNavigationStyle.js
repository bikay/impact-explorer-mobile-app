import {StyleSheet,PixelRatio,Platform,Dimensions} from 'react-native';
import { Fonts } from '../../Themes';

export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row'
    },
    tabBar: {
      borderTopColor: '#212b46',
      borderTopWidth: 1 / PixelRatio.get(),
      // backgroundColor: '#212A45',
      height:60,
      opacity: 0.98,
      paddingTop: 8,
      paddingBottom: 8
    },

    navigationBarTitleStyle: {
      color:'blue',
      fontFamily: Fonts.type.muli
    },

    headerByPlatform:{
      elevation: 0,
      height: 55,
      marginTop: Dimensions.get('window').height>=812?-45: Platform.OS ==='ios'?-18:null
    }
  });

