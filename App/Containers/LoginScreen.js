//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, ActivityIndicator, AsyncStorage, BackHandler,Platform
} from 'react-native';
import styles from './Styles/LoginStyle'
import { Images } from './../Themes'
import { ScrollView } from 'react-native-gesture-handler';
import LoginActions from '../Redux/LoginRedux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import SocialAuthActions from '../Redux/SocialAuthRedux'
import SetAuthTokenActions from '../Redux/SetAuthTokenRedux'

// create a component
class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clickRegister: false,
            username: '',
            email: '',
            password: '',
            loginLoading: null,
            userNamePasswordEmpty: null,
            errorUserPassword: "Please enter your username and password",
            statusLoading: false,
            fb_token: null,
            propScreen: props.screen,
            id: props.id,   //id from project screen
            inClick: false
        }
        global.screenName = global.screenName ? global.screenName : null

    }

    componentWillReceiveProps(newProps) {
        if (newProps.login.fetching == false && this.props.login.fetching == true && newProps.login.error == null) {
            if (newProps.login.token) {
                this.setState({ userNamePasswordEmpty: false, statusLoading: true })
                AsyncStorage.multiSet([['LoginStatus', 'true'], ['userToken', newProps.login.token.token]]);
                setTimeout(() => {
                    if (global.screenName == "CartScreen") {
                        Actions.CartScreen({backFromScreen:'login'})
                    }
                    else if (global.screenName == "ProjectScreen") {
                        Actions.ProjectScreen({ id: this.state.id, title: this.props.projectTitle, projectListId: this.props.projectListId, currentSceneName: Actions.currentScene, screenName: this.props.screenName })
                    }
                    else if (global.screenName == "ProductPageScreen") {
                        Actions.ProductPageScreen({ id: this.props.id, projectId: this.props.projectId, projectListId: this.props.projectListId, title: this.props.projectTitle, screenName: this.props.currentSceneName,currentSceneName: Actions.currentScene })
                    }
                    else if (global.screenName == "ProfileScreen") {
                        Actions.tabbar({ type: "reset" })
                        Actions.HomeScreen();
                    } else {
                        Actions.tabbar()
                    }
                }, 1500);
            }
        } else if (newProps.login.fetching == false && newProps.login.error == true) {
            this.setState({ errorUserPassword: "Incorrect username or password", userNamePasswordEmpty: true, statusLoading: false })
        }
      
        const { fetching, error, payload } = newProps.socialAuth
        if (fetching == false && this.props.socialAuth.fetching == true &&error == null) {
            if (this.props.socialAuth != payload != null || payload != undefined) {
                if (payload) {
                    global.FaceBookInfo = payload
                    AsyncStorage.multiSet([['LoginStatus', 'true'], ['userToken', newProps.socialAuth.payload.token]]);
                    let userToken = newProps.socialAuth.payload.token
                    this.props.setAuthToken(userToken);
                    if (global.screenName == "CartScreen") {
                        // Actions.pop()
                        Actions.CartScreen()
                    }
                    else {
                        Actions.tabbar(type = 'reset')
                        Actions.HomeScreen()
                    }
                }
            }
        }
    }
    async componentDidMount() {
        this._configureGoogleSignIn();
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    onBackButtonPressed() {
        Actions.reset('tabbar');
    }

    handlePressLogin = () => {
        this.setState({ userNamePasswordEmpty: false })
        if (this.checkIsNotEmpty()) {
            this.setState({ statusLoading: true })
            var username = this.state.username;
            var password = this.state.password;
            username = username.toLowerCase();
            password = password.toLowerCase();
            this.props.attemptLogin(username, password)
        }
    }

    handleFacebookLogin = () => {
        LoginManager.logInWithReadPermissions(['public_profile']).
            then((result, error) => {
                if (error) {
                    alert("User authorization on social failed.: " + result.error);
                } else if (result.isCancelled) {
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            const token = data.accessToken.toString()
                            this.setState({ fb_token: token });
                            const infoRequest = new GraphRequest(
                                '/me?fields=name,picture',
                                null,
                                this._responseInfoCallback
                            );
                            new GraphRequestManager().addRequest(infoRequest).start();
                        }
                    )
                }
            });
    }
    _responseInfoCallback = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            const data = {
                token: this.state.fb_token,
                provider: 'facebook',
                client: Platform.OS==='ios'? 'ios': 'android'
                // client: 'ios'
            }
            this.props.postSocialAuth(data)
        }
    }

    // check field login if not empty
    checkIsNotEmpty = () => {
        if (this.state.username === '') {
            this.setState({ errorUserPassword: "Please enter your username and password", userNamePasswordEmpty: true })
        }
        if (this.state.password === '') {
            this.setState({ errorUserPassword: "Please enter your username and password", userNamePasswordEmpty: true })
        }
        if (this.state.username != '' || this.state.password != '') {
            this.setState({ userNamePasswordEmpty: false })
            return true
        }
    }

    handleUsername = (text) => {
        this.setState({ username: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }

    _configureGoogleSignIn() {
        GoogleSignin.configure({
            iosClientId: '887277488527-bhu5huah53vfr1gm6q3pubpd57tp2n17.apps.googleusercontent.com',
            webClientId: '887277488527-dpkrrl705rrq622bfvq8qptmpp2kve3i.apps.googleusercontent.com',  //Replace with your own client id
            offlineAccess: false,
        });
    }
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn(); //idtoken
            await GoogleSignin.revokeAccess();

            const data = {
                token: userInfo.idToken,
                provider: 'google',
                client: Platform.OS=='ios'? 'ios': 'android'
                // client: 'android'
            }
            this.props.postSocialAuth(data)


        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                Alert.alert('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                Alert.alert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('play services not available or outdated');
            } else {

                alert('Something went wrong', error.code);
                this.setState({
                    error,
                });
            }
        }
    };
    handleForget() {
        Actions.ForgetPwdScreen();
    }

    registerEmail = () => {
        this.setState({inClick: true});
        Actions.reset('RegisterScreen')
        setTimeout(function () {
            this.setState({ inClick: false });
        }.bind(this), 2000);
    }

    render() {
        if (this.state.statusLoading || this.props.isFetching) {
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
                            <Text style={styles.header}>Username / Email</Text>
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
                        <View>
                            {this.state.userNamePasswordEmpty
                                ? <Text style={styles.errorText}>{this.state.errorUserPassword}</Text>
                                : null
                            }
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: 30, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={this.handleForget}>
                                <Text style={styles.textForgotPass} >Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btnLogin} onPress={this.handlePressLogin}>
                            <Text style={styles.textLogin}>LOGIN</Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: 16, alignItems: 'center' }}>
                            <Text style={styles.txtConnectWith}>Or connect with</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.btnLinkSocialMedia, { backgroundColor: '#dd4b39', marginRight: 4 }]} onPress={this._signIn}>
                                <Icon type="FontAwesome" name="google" style={{ color: "white" }} />
                                <Text style={styles.textRegister}>Google</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.btnLinkSocialMedia, { backgroundColor: '#4267b2', marginLeft: 4 }]}
                                onPress={this.handleFacebookLogin}>
                                <Icon type="FontAwesome" name="facebook" style={{ color: 'white' }} />
                                <Text style={styles.textRegister}>Facebook</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                            <Text style={styles.txtConnectWith}>You don't have an account? </Text>
                            <TouchableOpacity
                                onPress={!this.state.inClick ? this.registerEmail : null}
                            >
                                <Text style={[styles.txtConnectWith, { fontWeight: 'bold' }]}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
const props = (state) => {
    return {
        login: state.login,
        socialAuth: state.socialAuth,
        isFetching: state.socialAuth.fetching
    }
}

const mapDispatchToProps = (dispatch) => ({
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    postSocialAuth: (data) => dispatch(SocialAuthActions.socialAuthRequest(data)),
    setAuthToken: (token) => dispatch(SetAuthTokenActions.setAuthTokenRequest(token))
})

export default connect(props, mapDispatchToProps)(LoginScreen)
