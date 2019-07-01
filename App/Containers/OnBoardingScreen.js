/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View, BackHandler, AsyncStorage } from 'react-native';
import { Images, ApplicationStyles } from '../Themes';
import styles from './Styles/OnBoardingStyles';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      arrayStart: [
        { txt: 'Search by location Find' },
        { txt: 'Find experiences that inspire' },
        { txt: 'Detailed itineraries' },
        { txt: 'Local travel tips' },
        { txt: 'Book online' },
        { txt: 'Get personalised advice from real visitors and travel experts' },
      ]
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    return true;
  }

  handleOpenHomeScreen = () => {
    Actions.HomeScreen();
  }

  render() {
    return (
      <Swiper
        dot={<View style={styles.dotView} />}
        activeDot={<View style={styles.activeDot} />}
        style={{ backgroundColor: '#0EB9CB' }}>
        <View style={styles.container}>
          <View style={styles.img}>
            <Image
              source={Images.background}
              style={styles.circleImage}
            />
          </View>
          <Text style={styles.bigTitle}>A DIFFERENT KIND{'\n'}OF TOURISM</Text>
          <Text style={styles.description}>Connect with local communities and ecotourism wildlife initiatives.</Text>

        </View>

        <View style={styles.container}>
          <View style={styles.img}>
            <Image
              source={Images.logoHuman}
              style={styles.circleImage}
            />
          </View>
          <Text style={styles.bigTitle}>ENJOY A UNIQUE{'\n'}EXPERIENCE</Text>
          <Text style={styles.description}>Rich Cambodian culture, welcoming community homestays, diverse natural beauty & wildlife.</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.img}>
            <Image
              source={Images.logoSwap}
              style={styles.circleImage}
            />
          </View>
          <Text style={styles.bigTitle}>TRAVEL WITH{'\n'}IMPACT</Text>
          <Text style={styles.description}>100% of listed prices goes to the communities; generating local impact and employment.</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={styles.lastTitle}>EVERYTHING YOU NEED{'\n'}TO KNOW</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ position: 'relative', paddingBottom: 20, paddingTop: 20, paddingLeft: 50, paddingRight: 50 }}>
              {this.state.arrayStart.map((item) => {
                return (
                  <View style={{ flexDirection: 'row', paddingBottom: 10 }} >
                    <Image source={Images.iconCheck} />
                    <Text style={styles.txtStart}>{item.txt}</Text>
                  </View>
                )
              })}
            </View>
          </View>

          <TouchableOpacity style={ApplicationStyles.button}
            onPress={this.handleOpenHomeScreen}
          >
            <Text style={ApplicationStyles.btnTitle}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    );
  }
}


