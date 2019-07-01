import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Fonts } from "../Themes";
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import _ from 'lodash'
import "moment/min/locales";
import moment from 'moment'
const XDate = require('xdate');
LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S',]
};
LocaleConfig.defaultLocale = 'en';
export default class ProductPageCalandarScreen extends Component {
  constructor() {
    super()
    this.state = {
      availabilities:[],
      disable_key_dates: [],
      marked: null,
      isFromDatePicked: false,
      isToDatePicked: false,
      markedDates: {},
      fromDate: global.start_date ? global.start_date : "",
      toDate: '',
      startDate: '',
      endDate: global.end_date ? global.end_date : "",
      theme: { markColor: '#FD7751', selectedColor: '#ffcccc', markTextColor: 'white', textDayFontSize: 25, textSectionTitleColor: 'red' },
    }
    global.stayNumber = 1;
    global.start_date = global.start_date ? global.start_date : null;
    global.end_date = global.end_date ? global.end_date : null;
    day = moment().format('YYYY-MMM-DD')
    global.bookingDate = this.state.toDate
  }
  componentWillMount = () => {
    const { start_date, end_date } = global
    if (start_date && end_date) {
      let markedDates = {
        [start_date]: {
          startingDay: true,
          color: "#FD7751",
          textColor: "white"
        }
      }
      this.handleMarkedData(start_date, end_date, markedDates, start_date, true)
    }
  };

  componentDidMount = () => {
    this.props.productPageData.map((eachProduct, index) => {
      return (
        eachProduct.wc_info.map((eachInfo, indexInfo) => {
          let disable_key_dates = []
          let markedDateDisable = {}
          if (eachInfo.availabilities) {
            eachInfo.availabilities.map((eachDisDate, indexDis) => {
              let [mMarkedDates] = this.setupMarkedDates(eachDisDate.from, eachDisDate.to, {}, false)
              let getObjectKeys = Object.keys(mMarkedDates)
              if(getObjectKeys){
                getObjectKeys.map((eachObjKey)=>{
                  disable_key_dates.push({ key: eachObjKey })
                })
              }
              markedDateDisable = { ...markedDateDisable, ...mMarkedDates }
            })
          }


          if (eachInfo.availability) {
            let booking_duration = eachInfo.availability._wc_booking_duration
            this.setState({ booking_duration })
          }
          this.setState({ availabilities: markedDateDisable, disable_key_dates })
        })
      )
    })
  }

  onDayPress = (day) => {
    let { disable_key_dates, isFromDatePicked, isToDatePicked, markedDates, fromDate } = this.state
    checkExistingDisDate = _.filter(disable_key_dates, { key: day.dateString });
    if (checkExistingDisDate && _.isEmpty(checkExistingDisDate) == false) {
      Alert.alert(" Sorry this date is not available for booking.")
    } 
    else {
      if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
        this.setupStartMarker(day)
      } else if (!isToDatePicked) {
        var statusExistingDisDate = false
        const getObjectKey = Object.keys(markedDates)[0]

        disable_key_dates.map((eachDisKey) => {
          if (day.dateString >= eachDisKey.key && eachDisKey.key >= getObjectKey) {
            statusExistingDisDate = true;
          }
        })
        if (statusExistingDisDate) {
          Alert.alert("Product not available.");
        } else {
          markedDates = { ...markedDates }
          this.handleMarkedData(fromDate, day.dateString, markedDates, day, false)
        }
      }
    }
  }
  handleMarkedData = (fromDate, EndDate, markedDates, day, statusProps) => {
    let mFromDate = new XDate(fromDate)
    let mToDate = new XDate(EndDate)
    let rangeDate = mFromDate.diffDays(mToDate)
    if (rangeDate > this.state.booking_duration && !statusProps) {
      Alert.alert('Sorry, you can book only ' + this.state.booking_duration + " day(s).")
    } else {
      let [mMarkedDates, range] = this.setupMarkedDates(fromDate, EndDate, markedDates, true)
      if (range >= 0) {
        this.setState({ isFromDatePicked: true, isToDatePicked: true, markedDates: mMarkedDates })
      } else {
        this.setupStartMarker(day)
      }
    }
  }
  // when use select date is small than current date and user click only one calandar
  setupStartMarker = (day) => {
    if (day.dateString >= moment().format('YYYY-MM-DD')) {
      global.stayNumber = 1;
      let markedDates = { [day.dateString]: { startingDay: true, color: '#FD7751', textColor: this.state.theme.markTextColor } }
      this.setState({ isFromDatePicked: true, isToDatePicked: false, endDate: day.dateString, fromDate: day.dateString, markedDates: markedDates })
    }
    else {
      Alert.alert("Sorry, no date prior than current date.!")
    }
  }
  setupMarkedDates = (fromDate, toDate, markedDates, status) => {
    let mFromDate = new XDate(fromDate)
    let mToDate = new XDate(toDate)
    let range = mFromDate.diffDays(mToDate)
    this.setState({ endDate: toDate });
    if(!status){
      this.setState({ fromDate: "", endDate: "" });
    }else{
      this.setState({ endDate: toDate });
    }

    // alert(range)
    if (range >= 0) {
      if (range == 0) {
        markedDates = { [toDate]: { color: status?'#FD7751':'gray', textColor: status?this.state.theme.markTextColor:"#FFF" } }
      } else {
        for (var i = 0; i <= range; i++) {
          let tempDate = null;
          if(i==0){
            tempDate = mFromDate.addDays(0).toString('yyyy-MM-dd')
          }else{
            tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
          }
          if (i < range) {
            markedDates[tempDate] = { color: status?this.state.theme.selectedColor:'gray', textColor: status?this.state.theme.markTextColor:"#FFF" }
          } else {
            markedDates[tempDate] = { endingDay: true, color: status?'#FD7751':'gray', textColor: status?this.state.theme.markTextColor:"#FFF" }
          }
        }
      }
    }
    global.stayNumber = range > 0 ? range + 1 : 1

    return [markedDates, range]
  }
  handleFromAndEndDateFormat = (date) => {
    var valueDate = "DD/MM";
    if (date) {
      valueDate = moment(date).format("DD/MM")
    }
    return valueDate;
  }

  render() {
    let { fromDate, endDate, markedDates, availabilities } = this.state
    global.start_date = fromDate ? fromDate : "";
    global.end_date = endDate ? endDate : "";
    markedDates = { ...markedDates, ...availabilities }
    // markedDates = {...availabilities}
    return (
      <View>
        {/* CheckIn Checkout */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FF9071', height: 56 }}>

          <View style={{ width: '50%', height: 56, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center', fontFamily: Fonts.type.muli, fontSize: 13, color: 'white' }}>Check In</Text>
            <Text style={{ textAlign: 'center', fontFamily: Fonts.type.muliBold, fontSize: 13, color: 'white' }}>{this.handleFromAndEndDateFormat(fromDate)}</Text>
          </View>
          <View
            style={{
              height: '80%',
              width: 3,
              backgroundColor: 'white',
              marginTop: 5
            }}
          />
          <View style={{ width: '50%', height: 56, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontFamily: Fonts.type.muli, fontSize: 13, color: 'white' }}>Check Out </Text>
            <Text style={{ textAlign: 'center', fontFamily: Fonts.type.muliBold, fontSize: 13, color: 'white' }}>{this.handleFromAndEndDateFormat(endDate)}</Text>
          </View>


        </View>
        {/* End CheckIn Checkout */}
        {/* Show Calandar */}
        <ScrollView>
          <CalendarList
            hideArrows={true}
            markingType={'period'}
            //if we put like this when we select next month after back it will show start from next month
            // current={fromDate}  
            current={new Date()}
            markedDates={fromDate}
            markedDates={markedDates}
            onDayPress={(day) => { this.onDayPress(day) }}
            onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
            pastScrollRange={0}
            futureScrollRange={6}
            scrollEnabled={true}
            showScrollIndicator={true}
            calendarHeight={368}
            theme={{
              textSectionTitleColor: 'black',
              textDayHeaderFontFamily: Fonts.type.oswald,
              textDayHeaderFontSize: 16,
              textDayFontWeight: 'bold',
              monthTextColor: 'black',
              textMonthFontFamily: Fonts.type.oswaldMedium,
              textMonthFontWeight: 'bold',
              textMonthFontSize: 16,
              todayTextColor: 'black',
              dayTextColor: '#8E8E93'
            }}
          />

        </ScrollView>
        {/* End  Show Calandar */}
      </View>
    )
  }
}
