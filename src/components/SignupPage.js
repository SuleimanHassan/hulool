import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class SignupPage extends React.Component {
  render() {
    return (
    
      <View style={styles.container}>
        <Text style={styles.header}>إنشاء حساب</Text>
        <TextInput
          style = {styles.input}
          placeholder="اسم المستخدم"
          placeholderTextColor = 'rgba(225,225,225,1)'
          returnKeyType = 'go'
          underlineColorAndroid={"transparent"}
        />

        <TextInput
          style = {styles.input}
          placeholder =  "رقم الهاتف"
          placeholderTextColor = 'rgba(225,225,225,1)'
          returnKeyType = 'next'
          //onSubmitEditing={()=>this.passwordInput.focus()}
          keyboardType = 'phone-pad'
          />

        <TextInput
          style = {styles.input}
          placeholder =  "كلمة المرور"
          placeholderTextColor = 'rgba(225,225,225,1)'
          secureTextEntry
          returnKeyType = 'go'
          //onSubmitEditing={()=>this.passwordInput.focus()}
          underlineColorAndroid={"transparent"}
        />

        <TouchableOpacity style={styles.button} onPress = {()=>this.props.navigation.navigate('Login')}>
          <Text style={styles.btntext}>انشاء</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row-reverse',
    flex: 1,
    padding: 30,
    backgroundColor: "#12CBC4"
  },
  header: {
    fontSize: 24,
    marginTop: 150,
    fontWeight: '700',
    alignSelf: "center",
    color: "white",
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "#FFF",
    borderBottomWidth: 1
  },
  input: {
    textAlign: 'right',
    height: 50,
    fontSize: 20,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'rgba(225,225,225,0.5)',
    paddingVertical: 20,

  },
  btntext: {
    textAlign: 'center',
    fontWeight: '700',
    alignItems: "center",
    color: 'white'
  }
});