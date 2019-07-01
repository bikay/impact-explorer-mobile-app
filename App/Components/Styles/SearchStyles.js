import { StyleSheet } from 'react-native';
import { Fonts } from '../../Themes';
export default StyleSheet.create({
    searchSection: {
        flexDirection: 'row',
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

})