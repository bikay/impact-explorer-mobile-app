import { StyleSheet,Dimensions } from "react-native";
import { Metrics, ApplicationStyles,Fonts,} from "../../Themes";
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.cusBasePadding,
    backgroundColor:"white",
    height:'100%'
  },
  // Header===================================
  headerContainer: {
    flex: 1,
    backgroundColor:'white',
  },
  headerTitle: {
    fontSize: 32,
    color: "#090909",
    fontFamily: Fonts.type.oswaldBold,
    // marginLeft:-7
  },

  // menu Design=================================
  menuContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom:22,
  },
  menuTextBlog: {
    fontSize: 16,
    padding:10,
    color: "#090909",
    marginRight: 16,
    borderBottomWidth: 2.5,
    borderBottomColor: '#FD7751',
  },
  menuTextTravelTrips: {
    fontSize: 16,
    padding:10,
    color: "#8E8E93",
    marginRight: 16
  },
  // Content Item=================================
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 12,
    marginTop:20,
  },
  imageContainer: {
    flex: 3,
    width:'100%',
    height:'100%',
    flexWrap: 'wrap',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    padding: 10,
    marginTop: 5,
  },
  itemDate: {
    flex: 1,
    fontSize: 13,
    padding: 10,
    color:'#8E8E93',
    marginBottom: 5,
  },
  
});
