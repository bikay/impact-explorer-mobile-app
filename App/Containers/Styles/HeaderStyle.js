import {StyleSheet,Dimensions} from 'react-native';
import {Fonts} from '../../Themes'

const DEVICE_WIDTH = Dimensions.get(`window`).width;
export default StyleSheet.create({
    itemContainer:{
        flexDirection: 'row', 
       width: DEVICE_WIDTH,
       alignItems: 'center',
       height: 56,
    },

    // headerContainer:{
        
    // },
    
    iconHeader:{
        marginLeft: 16,
        marginRight: 32,

    },
    textHeader:{
       fontFamily: Fonts.type.oswaldBold,
       fontSize: 20
    }
})