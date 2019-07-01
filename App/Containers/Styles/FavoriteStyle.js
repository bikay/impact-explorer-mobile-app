import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../Themes';
import { Dimensions } from 'react-native';
export default StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
   
    articleItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 100,
        marginTop: 8,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 4,
        width: (Dimensions.get('window').width)-16,
    
        shadowColor: "#E0E0E0",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 4,
        elevation: 1,
      },
    
    imageCard: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '80%',
        borderRadius: 4,
    },
    textTitel: {
        fontFamily: Fonts.type.oswald,
        fontSize: 16,
        color: '#000',
        width: "90%",
        // paddingTop: 1,

    },
    contentText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    subTitle: {
        fontFamily: Fonts.type.muli,
        fontSize: 13,
    }



})