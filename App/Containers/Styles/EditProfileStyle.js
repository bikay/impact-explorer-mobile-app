import {StyleSheet,Platform} from 'react-native'
import {Metrics,Colors,Fonts} from '../../Themes';

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.mainBackground,
        padding: Metrics.cusBasePadding,
        // backgroundColor:'white',
    },
    editComponent:{
        marginTop: Metrics.smallMargin
    },
    header:{
        fontFamily: Fonts.type.muli,
        fontSize: Fonts.size.small + 1,
        marginLeft: 4
    },
    textInput:{
        height:48,
        backgroundColor:'#fff',
        fontFamily: Fonts.type.oswaldMedium,
        fontSize: Fonts.size.medium,
        borderBottomColor: Platform.OS=='ios'?'lightgrey':null,
        borderBottomWidth: Platform.OS=='ios'? 1 :null
    }
})