import {StyleSheet} from 'react-native'
import {Fonts} from '../../Themes'
export default styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1
    },
    sliderContainer:{
        backgroundColor: 'white',
        justifyContent: 'center',
        // alignItems: 'flex-start',
        opacity: 0.8,
        height: 80,
    },
    title:{
        paddingLeft: 10,
        color: '#000',
        fontFamily: Fonts.type.muli,
        fontSize: Fonts.size.small+1

    }
})