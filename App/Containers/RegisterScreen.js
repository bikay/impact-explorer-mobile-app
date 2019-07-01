//import liraries
import React, { Component } from 'react';
import {
    ToastAndroid, View, Text, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, BackHandler, ActivityIndicator
} from 'react-native';
import styles from './Styles/LoginStyle'
import { Images } from './../Themes'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import UserRegisterActions from '../Redux/UserRegisterRedux'

// create a component
class RegisterScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            userNamePasswordEmpty: null,
            errorTextRegister: '',
            statusLoading: false
        }
        global.screenName = global.screenName ? global.screenName : null
    }

    componentWillReceiveProps(newProps) {
        if (newProps.register.fetching == false && this.props.register.fetching == true && newProps.register.error == null) {
            if (newProps.register.payload.success == true) {
                this.setState({ userNamePasswordEmpty: false, statusLoading: true })
                setTimeout(() => {
                    ToastAndroid.showWithGravity(
                        'Sign up successful, please sign in',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                    Actions.reset('LoginScreen')
                }, 1500);
            }
        }
        else if (newProps.register.fetching == false && newProps.register.error == true) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(newProps.register.data.email) === false) {
                this.setState({ errorTextRegister: "Your email is invalid", userNamePasswordEmpty: true, statusLoading: false })
            } else if (newProps.register.data.password.length <= 8) {
                this.setState({ errorTextRegister: "A minimum of 8 characters is required for the password.", userNamePasswordEmpty: true, statusLoading: false })
            } else {
                this.setState({ errorTextRegister: " Username or Email already exists", userNamePasswordEmpty: true, statusLoading: false })
            }
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackRegister);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackRegister);
    }

    handleBackRegister = () => {
        Actions.reset('LoginScreen')
        return true
    }

    handleUsername = (text) => {
        this.setState({ username: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }

    handleRegEmail = (text) => {
        this.setState({ email: text })
    }

    handleRegisterAcc = () => {
        this.setState({ userNamePasswordEmpty: false })
        if (this.RegCheckIsNotEmpty()) {
            this.setState({ statusLoading: true })
            data = {
                'username': this.state.username,
                'password': this.state.password,
                'email': this.state.email.toLowerCase()
            }
            this.props.userRegister(data)
        }
    }

    // check field register form if not empty
    RegCheckIsNotEmpty = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.username === '' || this.state.password === '' || this.state.email === '') {
            this.setState({ errorTextRegister: "Please enter your information", userNamePasswordEmpty: true })
        }
        if (this.state.username != '' || this.state.password != '' || (this.state.email != '' && reg.test(this.state.email) === true)) {
            this.setState({ userNamePasswordEmpty: false })
            return true
        }
    }

    render() {
        if (this.state.statusLoading) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='#99A3A4' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                </View>
            )
        }
        return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.content}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 4 }}>
                        <Image source={Images.logoLogin} style={{ height: 100, width: "85%" }} resizeMode="contain" />
                    </View>
                    <View style={{ width: "100%", flex: 6 }}>
                        <View style={styles.editComponent}>
                            <Text style={styles.header}>Username </Text>
                            <TextInput
                                onChangeText={this.handleUsername}
                                autoCorrect={false}
                                underlineColorAndroid={'#E0E0E0'}
                                style={styles.textInput}
                                value={this.state.username}
                                autoFocus={false}
                            />
                        </View>
                        <View style={styles.editComponent}>
                            <Text style={styles.header}> Email</Text>
                            <TextInput
                                onChangeText={this.handleRegEmail}
                                autoCorrect={false}
                                underlineColorAndroid={'#E0E0E0'}
                                style={styles.textInput}
                                value={this.state.email.trim()}
                            />
                        </View>
                        <View style={styles.editComponent}>
                            <Text style={styles.header}>Password</Text>
                            <TextInput
                                onChangeText={this.handlePassword}
                                secureTextEntry={true}
                                maxLength={100}
                                underlineColorAndroid={'#E0E0E0'}
                                style={styles.textInput}
                                value={this.state.password}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {this.state.userNamePasswordEmpty
                                ? <Text style={{ color: 'red' }}>{this.state.errorTextRegister}</Text>
                                : null
                            }
                        </View>
                        <TouchableOpacity style={styles.btnLogin} onPress={this.handleRegisterAcc}>
                            <Text style={styles.textLogin}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
const props = (state) => {
    return {
        register: state.register,
    }
}

const mapDispatchToProps = (dispatch) => ({
    userRegister: (data) => dispatch(UserRegisterActions.userRegisterRequest(data)),
})

export default connect(props, mapDispatchToProps)(RegisterScreen)
