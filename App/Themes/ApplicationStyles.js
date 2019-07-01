import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import { Dimensions } from 'react-native';
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  },
  // style with travel trip
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: "#E0E0E0",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 1,
  },
  imageContainer: {
    flex: 1,
    height: 120,
    width: 120,
    padding: 8
  },
  textContainer: {
    flex: 2,
    height: "100%",
    justifyContent: 'space-between',
    padding: 10
  },
  textTitle: {
    flex: 1,
    marginTop: 5, 
    fontSize: 12,
    color: '#0EB9CB',
    fontFamily: Fonts.type.oswaldMedium,
    alignSelf: 'flex-start',
  },
  textDescription: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontFamily: Fonts.type.oswaldMedium,
  },

  // =============Card View small image=============
  articleItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 112,
    marginTop: 8,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    width: (Dimensions.get('window').width)-16,

    shadowColor: "#E0E0E0",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 1,
  },

  articleImage: {
    width: "25%",
    height: "100%",
    borderRadius: 2,
  },
  articleText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  articleTitle: {
    fontSize: 16,
    width: "90%",
    paddingTop: 2,
    paddingBottom: 2,
    fontFamily: Fonts.type.oswald,
    color: '#000'
  },
  articleDate: {
    color: '#8E8E93',
    fontSize: 13,
    paddingTop: 2,
    paddingBottom: 3,
    fontFamily: Fonts.type.muli
  },

  // =============Card View large image=============
  articleItemFull: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 8,
    borderRadius: 4,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 4,
    // elevation: 1,
  },
  imageFullContainer: {
    flex: 1,
    height: Dimensions.get('window').width / 1.9,

  },
  articleImageFull: {
    height: "100%",
    borderRadius: 4,
  },
  articleTextFull: {
    flex: 1,

    padding: 8,
    marginBottom: 8,
  },
  articleTitleFull: {
    fontSize: 16,
    fontFamily: Fonts.type.muli,
    color: '#000',
    marginBottom: 8,
  },

  // style with Button View all
  headerListItemContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: 'center'
  },
  headerListItemName: {
    flex: 1,
    fontFamily: Fonts.type.oswaldMedium,
    
  },
  buttonViewAll: {
    justifyContent: "flex-end",
    color: '#8CBC12',
    fontSize: 13,
    fontFamily: Fonts.type.muliBold
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 4
  },

  // Orange Button
  button: {
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 4,
    height: 50,
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%',
  },
  btnTitle:{
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.oswaldMedium,
    textAlign: 'center',
    color: Colors.snow,
  },

  // Header custom
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
},
headerTitle:{
  marginLeft: 32,
  fontFamily: Fonts.type.oswaldBold,
  fontSize: 20,
  color:'white'
},
icon:{
  height: 24,
  width: 24,
},
stickySection: {
  // height: 70,
  width: '100%',
  justifyContent: 'center'
},
fixedSection: {
  position: 'absolute',
  bottom: 10,
  right: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%'
},
mainTitle:{
  fontSize:22,
  paddingBottom: 8,
  paddingLeft: 16,
  // fontWeight: 'bold',
  color: 'white',
  fontFamily: Fonts.type.oswaldBold
},

}

export default ApplicationStyles
