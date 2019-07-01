import {StyleSheet} from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: Colors.mainBackground,
    },

    searchContainer: {
        paddingBottom: Metrics.mediumMargin,
        flexDirection: 'row',
        position:'relative'
      },
      searchSection: {
        flex: 5,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 4,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
    
        elevation: 1,
      },
      searchIcon: {
        padding: 10,
        color: '#E0E0E0'
      },
      input: {
        color: '#424242',
        width: '100%',
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.muli,
      },

    container: {
        flex: 1,
        paddingLeft: Metrics.baseMarginLeft,
        paddingRight: Metrics.baseMarginRight,
        paddingBottom: Metrics.baseMarginBottom,
    },
    filterLocationHead:{
        color: Colors.dark
    },
    button: {
        height: 48,
        backgroundColor: '#8CBC12',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 8,
    },
    textBtn: {
        color: 'white',
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.muli
    },
    txtHeader: {
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.oswaldMedium,
        color: Colors.dark
    },
    icon: {
        height: 15,
        color: '#B1B1B1',
    },
    checkBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 8,
        paddingLeft: 8,
    },
    checkBox: {
        height: 25, 
        width: 25, 
        borderWidth: 2, 
        borderRadius: 3, 
        marginRight: 8,
        borderColor: '#848484', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    text:{
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.muli,
        color: Colors.dark
    }
})
