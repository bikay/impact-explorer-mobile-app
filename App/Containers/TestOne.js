import React,{Component} from 'react';
import {View,Text,ScrollView,TouchableHighlight,
    TextInput,StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class TestOne extends Component{
    constructor(props){
        super(props);
        this.state={

        }

        global.firstname = "" // undefined without open TestOne First
    }

    handleOpenTwoScreen = () =>{
        Actions.TestTwo();
    }

    render(){
        return(
            <TouchableHighlight style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
                }}
                
                onPress={this.handleOpenTwoScreen}
                >
                <Text style={{fontSize:15,color:'black'}}>Go Two</Text>
            </TouchableHighlight>
        );
    }
}