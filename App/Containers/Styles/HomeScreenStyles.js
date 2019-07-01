import { StyleSheet,Platform } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.mainBackground,
    paddingLeft:20,
    paddingRight: 20,
    paddingTop: Metrics.baseMarginTop,
    paddingBottom: Metrics.smallMargin+60,
    // padding: 25
  },
  searchContainer: {
    paddingBottom: Metrics.smallMargin  ,
    flexDirection: 'row',
    position:'relative'
  },
  searchSection: {
    flex: 5,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: 280,
    height: 48,
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
  imageIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCart: {
    width: 24,
    height: 24,

  },

  //---------Main Menu----------//
  listItem: {
    // flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 4,
    justifyContent: 'space-between',
    // width: 328,
    height: 114
  },
  green: {
    backgroundColor: Colors.green
  },
  orange: {
    backgroundColor: Colors.orange
  },
  blue: {
    backgroundColor: Colors.lightBlue
  },
  titleCotainer: {
    flex: Platform.OS=='ios'?1.7:2,
    justifyContent: 'center',
    paddingLeft: 16,

  },
  menuTitle: {
    fontSize: 25,
    color: Colors.menuTitle,
    fontFamily: Fonts.type.oswaldMedium,
    marginLeft: 30,
    // marginBottom: 40

    // paddingLeft: 12,
    // width: "100%",
  },
  imageContainer: {
    flex: 1,
    // width: 110,
    // height: 110,
    paddingRight: 12,
    // padding: 10
  },
  menuImage: {
    width: "100%",
    height: "100%",
    marginTop: 10,
    // paddingTop: 100,
    // position: 'absolute',
    // top: 10
  },

  //--------Content 1 (Popular Experience)-----

  categoryTitle: {
    fontFamily: Fonts.type.oswaldMedium,
    fontSize: 20,
    color: '#E56642'
  },

  //--------Content 2 (Impact Travel Guide)-----
  categoryTitle1: {
    fontFamily: Fonts.type.oswaldMedium,
    fontSize: 20,
    color: '#0EA5B5',
    marginTop: 2,
    // marginBottom: 8
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

  


});