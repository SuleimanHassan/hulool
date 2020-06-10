import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import axios from 'axios';

export default class EditListing extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        // userId: this.props.navigation.state.params.userId,
        data: this.props.data,
        delProfile: false,
        delService: false,
        person: {id:1, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: 'sdfj', number: '3908408'}
      }
  }
  render() {
    return (
        <View>
        <View style ={{alignItems: 'center'}}>
          <Text style={styles.cardTitle2}>{"\n"}تعديل الخدمات</Text> 
        </View>
          <View>
          <FlatList
        data={this.state.data}
        extraData={this.state}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          
          return(
            <View style={styles.container1}>
              <View style={styles.imandcat}> 
                <Image style={styles.image} source={{uri: Notification.image}}/>
                <Text style={styles.cardTitle3}> the subcat</Text>
              </View>
              <View style={styles.content}>
                <View style={[{alignItems: 'flex-end'}]}>
                  <Text style={styles.cardTitle}> الاسم </Text>   
                  <TextInput
                    placeholder ={Notification.name}
                    placeholderTextColor = 'rgba(0,0,0,1)'
                    returnKeyType = 'go'
                    style = {styles.input}
                    keyboardType = 'phone-pad'
                    //ref {(input) => this.passwordInput = input}
                    /> 
                {/* </View>
                <View style={[{alignItems: 'flex-end'}]}> */}
                <Text style={styles.cardTitle}> رقم الهاتف</Text>   
                  <TextInput
                    placeholder ={Notification.number}
                    placeholderTextColor = 'rgba(0,0,0,1)'
                    returnKeyType = 'go'
                    style = {styles.input2}
                    keyboardType = 'phone-pad'
                    //ref {(input) => this.passwordInput = input}
                    /> 
                </View>               
              <TouchableOpacity onPress={()=> this.setState({delService: true})}>
                <Text style = {styles.buttonText2}> enter changes </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.setState({delService: true})}>
                <Text style = {styles.buttonText2}> ازالة الخدمه </Text>
              </TouchableOpacity>
              
              </View> 
            </View>
          );
        }}/>
        </View>
        </View>
        );
        

   }
}


const styles = StyleSheet.create({
    container:{   
      flex:1,
      // padding:8,
      // marginTop: '10%',
      backgroundColor : "#ffffff",
    },
    container1: {
      // paddingLeft: 7,
      // paddingRight: 16,
      // paddingVertical: 12,
      flexDirection: 'row-reverse',
      // alignItems: 'center',
      borderBottomColor: 'purple', 
      borderBottomWidth: 1
  
    },
    cardTitle:{
      alignSelf: 'flex-end',
      color:"#808080",
      fontSize:19,
      // marginBottom:30,
    },
    cardTitle2:{
      // alignSelf: 'center',
      color:"#841584",
      fontSize:22,
      fontWeight: 'bold',
      marginBottom:3,
    },
    cardTitle3:{
      alignSelf: 'center',
      color:"#808080",
      fontSize:19,
    },
    avatar:{
      width:150,
      height:150,
      borderRadius: 70,
    },
    input: {
      textAlign: 'right',
      height: 50,
      fontSize: 20,
      backgroundColor: 'rgba(225,225,225,0.2)',
      // marginBottom: 20,
      color: '#000',
      // paddingHorizontal: 50,
  },
      input2: {
      textAlign: 'right',
      height: 50,
      fontSize: 20,
      // backgroundColor: 'rgba(225,225,225,0.2)',
      marginBottom: 20,
      color: '#000',
      // paddingHorizontal: 50,
  },
    card:{
      backgroundColor: "#FFFFFF",
      borderRadius:10,
      // padding:10,
      // height:'6%',
      // marginTop:'1%',
    },
    profileCard:{
      // height:'13%',
      alignItems: 'center',
      // marginTop:10,
      // marginBottom: 3,
    },
    name:{    
      textAlign: 'right',
      height: 50,
      fontSize: 20,
      backgroundColor: 'rgba(225,225,225,0.2)',
      padding: 10,
      color: '#000',
      paddingHorizontal: 10,
    },
    photosContainer:{
      flexDirection: 'row-reverse',
      // flexWrap: 'wrap',
      height: 'auto',
    },
    photo:{
      borderRadius: 10,
      width:113,
      height:113,
      marginTop:5,
      marginRight:5,
      alignSelf: 'flex-end',
    },
    buttonText2: {
      textAlign: 'center',
      color: '#12CBC4',
      fontWeight: '500',
      textDecorationLine: 'underline',
      marginTop: 7,
      marginBottom: 4,
  },
  
  content: {
    // marginLeft: 16,
    flex: 1,
    // flexDirection: 'row-reverse',
    marginTop: 5,
    // marginRight: 16, 
    textAlign: 'right'
  },
  image:{
    width:140,
    height:140,
    borderRadius:65,
  
  },
  imandcat:{
    marginTop: 20,
    marginBottom: 100,
    marginRight: 3,
    marginLeft:20,
    alignSelf: 'flex-end',
  }
  });