import {StyleSheet,Dimensions} from 'react-native';
import {Metrics,Fonts,Colors} from '../../Themes';
const numColumns = 3;

export default StyleSheet.create({
    container:{
        flex: 1,
        padding: Metrics.baseMargin,
        backgroundColor: Colors.mainBackground
    },
    gridView:{
        flex: 1,
        justifyContent: 'center',
        margin: 2,
        
    },
    itemInvinsible:{
        backgroundColor: 'transparent',
    },
    image:{
        height: (Dimensions.get('window').width/ numColumns)-18,
        width: (Dimensions.get('window').width/ numColumns)-14,
        borderRadius: 4,
    },
    title:{
        fontFamily: Fonts.type.oswald,
        fontSize: Fonts.size.medium,
        // marginTop: Metrics.smallMargin,
        marginBottom: Metrics.smallMargin,
        color: '#000'
    }
})