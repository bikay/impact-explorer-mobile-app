import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
    container: {
        flex: 1, 
        paddingBottom: 8,
        backgroundColor: 'white'
    },
    buttonText: {
        fontFamily: Fonts.type.oswaldMedium,
        fontSize: 14,
        color: 'white'
    },
    button: {
        marginRight: 4,
        backgroundColor: '#8CBC12',
        borderRadius: 4,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 4,
        paddingTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }

})