import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { YellowBox, Dimensions, Platform, StatusBar, View, NativeModules } from 'react-native'
import { Container } from 'native-base';
import RootContainer from './RootContainer'
import createStore from '../Redux'
import HeaderScreen from './HeaderScreen'
import OfflineNoticeScreen from './OfflineNoticeScreen'
// create our store
const store = createStore()
const { StatusBarManager } = NativeModules;

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
    global.heightStatusBar = global.heightStatusBar?true: false;
  }
  render () {
    const { height } = Dimensions.get('window');
    const STATUSBAR_HEIGHT = 
    (Platform.OS === 'ios' && height >= 812) ? 44: 22;

    YellowBox.ignoreWarnings(['Warning:']);
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <Container>
          <View style={{height: global.heightStatusBar?0:STATUSBAR_HEIGHT}}>
            <StatusBar translucent/>
          </View>
          <OfflineNoticeScreen />
          <HeaderScreen />
          <RootContainer />
        </Container>
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
