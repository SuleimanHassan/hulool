import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import axios from "axios";
import { selectContactPhone } from 'react-native-select-contact';


const GLOBAL = require('./common');
export default class AddService extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      subCategoryId: this.props.navigation.state.params.subCategoryId,
      subCategoryTitle: this.props.navigation.state.params.subCategoryTitle,
      title: this.props.navigation.state.params.title,
      providerName: null,
      phoneNumber: null,
    }
  }


  render() {
    const { navigate } = this.props.navigation;

    console.log(this.state.subCategoryId);
    // console.log("test");
    return (
    
      <View style={styles.container}>
        <ScrollView>
        <Text style={styles.header}> إضافة خدمة جديده</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="اسم مقدم الخدمه"
          //placeholder = "Password"
          placeholderTextColor = 'rgba(225,225,225,1)'
          returnKeyType = 'go'
          // style = {styles.input}
          underlineColorAndroid={"transparent"}
          onChangeText={(text) => this.setState({providerName: text})}
        />

        <TextInput
          style={styles.TextInput}
          placeholder = "رقم هاتف مقدم الخدمه"
          keyboardType = 'phone-pad'
          placeholderTextColor = 'rgba(225,225,225,1)'
          returnKeyType = 'next'
          // style = {styles.input}
          //onSubmitEditing={()=>this.passwordInput.focus()}
          keyboardType = 'phone-pad'
          // value = {this.state.providerName}
          onChangeText={(text) => this.setState({phoneNumber: text})}
          />
        <TouchableOpacity style={styles.button} onPress = {()=>
          // this.props.navigation.navigate('ListUsers')
          axios({
            method: 'post',
            url: GLOBAL.serverLink + '/api/listings/addlisting',
            data: {
              TITLE: this.state.providerName,
              PHONENUMBER: this.state.phoneNumber + "",
              SUBCATEGORYID: this.state.subCategoryId
            }
          }).then((response) => {
            console.log(response.data);
            navigate('ListUsers', {
              subCategoryId: this.state.subCategoryId,
              subCategoryTitle: this.state.subCategoryTitle,
              title: this.state.title,
              userId: this.state.userId,
            })
          })
          
          }>
          <Text style={styles.btntext}> إضافه</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress = {()=>
            selectContactPhone()
            .then(selection => {

                let { contact, selectedPhone } = selection;
                console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
                // return selectedPhone.number;
            })

          }>
          <Text style={styles.btntext}>  إضافة من جهات الاتصال</Text>
        </TouchableOpacity>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#12CBC4",
  },
  header: {
    // flexDirection: 'row-reverse',
    fontSize: 25,
    //150
    marginTop: 100,
    fontWeight: '700',
    textAlign: "center",
    color: "white",
    paddingBottom: 10,
    marginBottom: 30,
    borderBottomColor: "#FFF",
    borderBottomWidth: 1
  },
  TextInput: {
    textAlign: "right",
    marginTop:30,
    textAlign: "right",
    height: 50,
    fontSize: 20,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  button: {
    marginTop: 30,
    backgroundColor: 'rgba(225,225,225,0.5)',
    paddingVertical: 18,
    height: 60,
    width: '100%',
    textAlign: "center",
    borderRadius: 15,

  },
  btntext:{ 
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    alignItems: "center",
    color: 'white'
  }
});