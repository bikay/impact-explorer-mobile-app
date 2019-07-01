import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes'
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  // header with image that caculate with position relative and absolute
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 218,
    position: 'relative'
  },
  menuIconContainer: {
    // position: 'absolute', top: 0, flex: 1, alignSelf: 'stretch', right: 0, left: 0
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 999,
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingTop: 15
  },
  iconWidthHeight: {
    width: 24,
    height: 24
  },
  titleContainer: {
    position: 'absolute',
    left: 16,
    top: 150,
    borderRadius: 3
  },
  buttonTitle: {
    color: 'white',
    fontFamily: Fonts.type.oswaldBold,
    fontSize: 20
  },
  contentcontainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    backgroundColor: 'white',
    paddingBottom: 10,
    zIndex: 999

  },
  questionStyle: {
    fontSize: 16,
    fontFamily: Fonts.type.oswaldMedium,
    color: '#000000'
  },
  calendarContainer: {
    flex: 1,
    flexDirection: 'row',
    color: 'pink',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  boxCalendar: {
    width: 64,
    height: 64,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    fontFamily: Fonts.type.oswaldMedium
  },
  numberBookingContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingTop: 25,
    // marginTop: 16,
  },
  personsContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  addAndMinusContainer: {
    // flex: 1,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'flex-end',
  },
  textStyle: {
    fontSize: 13,
    fontFamily: Fonts.type.oswaldBold
  },
  boxMinus: {
    width: 64,
    height: 48,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    alignItems: 'center', justifyContent: 'center'
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  descriptionStyle: {
    flex: 1,
    alignItems: 'flex-start'
  },
  iconUp: {
    flex: 1,
    alignItems: 'flex-end'
  },
  descriptiontitle: {
    fontSize: 16,
    fontFamily: Fonts.type.oswaldMedium
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: Fonts.type.muli,
    paddingTop: 2,
    paddingBottom: 14
  },
  buttonAddToCard: {
    width: '60%',
    height: 50,
    backgroundColor: '#FD7751',
    position: 'relative',
    left: '20%',
    right: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    // zIndex:9999  
  },
  textButtonAddToCard: {
    fontFamily: Fonts.type.oswaldMedium,
    fontSize: 16,
    color: '#FFFFFF'
  },
  txtHeader: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.oswaldMedium,
  },
  icon: {
    color: '#8E8E93',
    width: 24,
    height: 24
  },
  // custome productpagescrollstay
  setDayContainer: {
    flexDirection: 'row',
    paddingTop: 20
  },
  mapContainer: {
    height: 200,
    width: '100%',
    marginTop: Metrics.mediumMargin
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})
