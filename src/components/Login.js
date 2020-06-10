import React, { Component } from 'react';
import { 
    StyleSheet,
    View, 
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    YellowBox,
    ScrollView,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
// import LoginForm from './LoginForm'

const GLOBAL = require('./common');
export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: 1,
        }
        // YellowBox.ignoreWarnings([
        //     'Warning: componentWillMount is deprecated',
        //     'Warning: componentWillReceiveProps is deprecated',
        //   ]);
        console.disableYellowBox=true
    }
    
    render() {
        console.log(GLOBAL.serverLink);
        const { navigate } = this.props.navigation;
        return (
            <View style = {styles.container} >
                <ScrollView>
                <View style = {styles.logoContainer}>
                    <Image 
                        style={styles.logo}
                        source={require('../images/logo1.png')}  />
                </View>
               <View style = {styles.form}>
                <TextInput 
                    placeholder = "رقم المستخدم"
                    placeholderTextColor = 'rgba(225,225,225,1)'
                    returnKeyType = 'next'
                    style = {styles.input2}
                    keyboardType = 'default'
                    onChangeText = {(input) => this.setState({
                        userId: input
                      })}
                    />

                <TextInput 
                    placeholder = "كلمة المرور"
                    placeholderTextColor = 'rgba(225,225,225,1)'
                    secureTextEntry
                    returnKeyType = 'go'
                    enablesReturnKeyAutomatically= 'true'
                    style = {styles.input}
                    // keyboardType = 'phone-pad'
                    //ref {(input) => this.passwordInput = input}
                    />
                <TouchableOpacity style = {styles.buttonContainer} 
                    // onPress = { ()=>Alert.alert('Wrong Password','Try Again',
                    // [
                    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
                    // ],
                    //     {cancelable: false})}>
                    onPress= {() => 
                        navigate('HomePage', {
                            userId: this.state.userId,
                          })
                      }
                        //this.props.navigation.navigate('HomePage')} 
                    >
                    <Text style = {styles.buttonText1}> دخول </Text>
                </TouchableOpacity>
                
                {/* <TouchableOpacity onPress = { ()=>this.props.navigation.navigate('SignupPage')}> 
                    <Text style = {styles.buttonText2}>  إنشاء حساب جديد  </Text>
                </TouchableOpacity> */}
            </View>
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#12CBC4',
    },
    logoContainer: {
        marginTop: 100,
        marginBottom: 12,
        flex: 2,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        borderRadius: 90,
        width: 300,
        height: 300,
    },
    form: {
        padding: 30
    },
    input: {
        textAlign: 'right',
        height: 50,
        fontSize: 20,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    input2: {
        // textAlign: 'right',
        height: 50,
        fontSize: 20,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    buttonContainer: {
        backgroundColor: 'rgba(225,225,225,0.5)',
        paddingVertical: 20,
        borderRadius: 15,

    },
    buttonText1: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700',
    },
    buttonText2: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        textDecorationLine: 'underline',
        marginTop: 10,
        marginBottom: 15,
    }
 }); 