import { createStackNavigator, createAppContainer } from 'react-navigation'
import OnBoardingScreen from '../Containers/OnBoardingScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  OnBoardingScreen: { screen: OnBoardingScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'OnBoardingScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
