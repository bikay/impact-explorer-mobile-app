import React, { Component } from 'react';
import { View, Image, TextInput, Text,BackHandler } from 'react-native';
import { ApplicationStyles, Images, Fonts } from '../Themes';
import styles from './Styles/LoginStyle'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ForgotPwdActions from '../Redux/ForgotPwdRedux'
import { Actions } from 'react-native-router-flux';

class ForgetPwdScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',

        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    }
    onBackButtonPressed = () => {
        Actions.pop()
        return true
    }
    componentWillReceiveProps(newProps) {
        if (newProps.forgotPwd.fetching == false && this.props.forgotPwd.fetching == true && newProps.forgotPwd.error == null) {
            if (newProps.forgotPwd.payload) {
                alert('Email Sent')
            }
        }
        else if(newProps.forgotPwd.fetching ==false && newProps.forgotPwd.error == true){
            alert("This email does not exists")
        }
    }

    handleForgotPassword = () => {
        let { email } = this.state
        if(email==''){
            alert('Fill in email')
        }else{
            let data = {
                email: email
            }
            this.props.postForgotPwd(data)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                <Image source={Images.forgetPwd} style={{ height: 100, width: 100 }} />
                <Text style={{ fontSize: 28, color: 'black', marginTop: 20, fontFamily: Fonts.type.oswaldMedium }}>Forgot Your Password?</Text>
                <Text style={{ fontSize: 15, color: 'black', padding: 20, textAlign: 'center' }}>Enter your email and we'll send you a link to reset your password to the address we have for your account.</Text>
                <View style={{ borderRadius: 12, borderWidth: 1, width: '100%', borderColor: '#E0E0E0', backgroundColor: 'white' }}>
                    <TextInput
                        onChangeText={(text) => this.setState({ email: text })}
                        autoCorrect={false}
                        style={[styles.textInput, { width: '100%', marginLeft: 8 }]}
                        value={this.state.email}
                        placeholder='Enter your email'
                    />
                </View>
                <TouchableOpacity
                    onPress={this.handleForgotPassword}
                    style={[ApplicationStyles.button,{marginTop: 16,width:200}]}
                >
                    <Text style={ApplicationStyles.btnTitle}>RESET MY PASSWORD</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const props = (state) => {
    return {
        forgotPwd: state.forgotPwd,
    }
}
const mapDispatchToProps = (dispatch) => ({
    postForgotPwd: (data) => dispatch(ForgotPwdActions.forgotPwdRequest(data)),
})

export default connect(props, mapDispatchToProps)(ForgetPwdScreen)