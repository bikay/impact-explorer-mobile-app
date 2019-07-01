//import liraries
import React, { Component } from 'react';
import { View, Image, ActivityIndicator, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux'

// create a component
export default class LaunchScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      is_on_board: null
    }
  }
  componentWillMount(){
    AsyncStorage.getItem("is_on_board").then((res_is_on_board) => {
      status_on_board = null
      if(res_is_on_board==null){
        this.setState({is_on_board: false});
      }else{
        if(res_is_on_board=="true" || res_is_on_board){
          this.setState({is_on_board: res_is_on_board});
        }
      }
    })
  }

  handleLoading = () =>{
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FD7751" style={{ alignItems: 'center' }} />
      </View>
    )
  }
  
  render() {
    if(this.state.is_on_board==null){
      this.handleLoading();
    }
    return (

      <View style={{flex: 1}}>
        {this.state.is_on_board?
           Actions.HomeScreen()
          :
           this.state.is_on_board!=null?
           Actions.OnBoardingScreen()
           :
           this.handleLoading()
        }
      </View>

     
    );
  }
}
