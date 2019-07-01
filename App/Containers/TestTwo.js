import React,{Component} from 'react';
import {View,Text,ScrollView,TouchableHighlight,
    TextInput,StyleSheet, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class TestOne extends Component{
    constructor(props){
        super(props);
        this.state={

        }
        this.apple = "apple";
    }




    name = (name, callback)=>{
        AsyncStorage.multiGet(["firstname"]).then(response => {
            // return firstname;
            callback(name)
        });
    }

    loopNum = (number) =>{
        if(number>0){
            this.loopNum(number-1);
        }
    }

    componentDidMount() {
        this.loopNum(30);
        this.name("apple_update", function(resName){
        });






        // this.name('apple', function(resName){

        // });
    //   alert(global.firstname);
    }
    

    handleOpenOneScreen = () =>{
        Actions.TestOne();
    }

    render(){
        return(
            <TouchableHighlight style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
                }}
                
                // onPress={this.handleOpenOneScreen}
                >
                <Text style={{fontSize:15,color:'black'}}>Go One</Text>
            </TouchableHighlight>
        );
    }
}