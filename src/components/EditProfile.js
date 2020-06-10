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
  ActivityIndicator
} from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import axios from 'axios';
import EditListing from './EditListing';


const GLOBAL = require('./common');
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        preImage: "https://rolodex2.blob.core.windows.net/photos/",
        userId: this.props.navigation.state.params.userId,
        data:[],
        loaded: false,

        delProfile: false,
        delService: false,

        userName: null,
        phoneNumber:null,

        listingId: null,
        listingTitle: null,
        listingPhoneNumber: null,

        person: {id:1, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: 'sdfj', number: '3908408'}
      }
  }


  async componentWillMount() {
    await this.fetchData();
  }
  
  fetchData = async () => {
    console.log(this.state.userId)
    axios.get(GLOBAL.serverLink + '/api/Users/' + this.state.userId + '/getprofile')
    .then((response) => {
      this.setState({data: response.data});
      // this.setState({userName: this.state.data[0].USERNAME, phoneNumber: this.state.data[0].USERNAME});
      this.setState({loaded: true});
      console.log("edit profile data fetched:");
      console.log(response.data);
      });
  }

  updateUser = () => {
    console.log(this.state.data[0].USERNAME);
    // this.state.userName === null? this.setState({userName: this.state.data[0].USERNAME}):console.log(this.state.userName);
    // this.state.phoneNumber === null? this.setState({phoneNumber: this.state.data[0].PHONENUMBER}):console.log(this.state.phoneNumber);
    console.log(this.state.data[0].USERNUMBER);
    axios({
      method: 'post',
      url: GLOBAL.serverLink + '/api/Users/'+this.state.userId+'/editUser',
      data: {
        USERNAME: this.state.userName === null? this.state.data[0].USERNAME:this.state.userName,
        PHONENUMBER: this.state.phoneNumber === null?this.state.data[0].USERNUMBER:this.state.phoneNumber
      }
    }).then((response) => {
      this.setState({
        userName:null,
        phoneNumber: null
      })
      console.log(response.data);
    })
  }

  updateListing = (listingId,item) => {
    console.log(item.LISTINGNAME);
    console.log(item.LISTINGNUMBER);
    axios({
      method: 'post',
      url: GLOBAL.serverLink + '/api/listings/'+ listingId +'/editListing',
      data: {
        TITLE: this.state.listingTitle === null?item.LISTINGNAME:this.state.listingTitle,
        PHONENUMBER: this.state.listingPhoneNumber === null?item.LISTINGNUMBER:this.state.listingPhoneNumber,
      }
    }).then((response) => {
      this.setState({
        listingTitle:null,
        listingPhoneNumber: null
      })
      console.log(response.data);
    })
  }


  handleDelProfCancel = () => {
    this.setState({ delProfile: false });
  }
  handleDelProfile = () => {
    axios({
      method: 'delete',
      url: GLOBAL.serverLink + '/api/Users/'+ this.state.userId +'/removeUser',
    }).then((response) => {
      this.setState({
        userId: null
      })
      console.log(response.data);
    })
    this.setState({ delProfile: false });
  }

  handleDelServiceCancel = () => {
    this.setState({ delService: false });
  }
  handleDelService = () => {
    /// heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    axios({
      method: 'delete',
      url: GLOBAL.serverLink + '/api/Listings/'+ this.state.listingId +'/removeListing?code=DQzhL1VTa16VEZkR3EOCB2MdgtmllfFgMcW/PVjzMQVv89n7ksR1Iw==',
    }).then((response) => {
      this.setState({
        listingId: null
      })
      console.log(response.data);
    })
    this.setState({ delService: false });
  }

  render() {
    listings = ()=> {
      if(this.state.data[0].LISTINGID != null){
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
                  <Image style={styles.image} source={{uri: this.state.preImage + Notification.SUBCATIMAGE}}/>
                  <Text style={styles.cardTitle3}> {Notification.SUBCATTITLE}</Text>
                </View>
                <View style={styles.content}>
                  <View style={[{alignItems: 'flex-end'}]}>
                    <Text style={styles.cardTitle}> الاسم </Text>   
                    <TextInput
                      placeholder ={Notification.LISTINGNAME}
                      placeholderTextColor = 'rgba(0,0,0,1)'
                      returnKeyType = 'go'
                      style = {styles.inputFix}
                      // keyboardType = 'phone-pad'
                      onChangeText = {(input) => this.setState({
                        listingTitle: input
                      })}
                      /> 
                  {/* </View>
                  <View style={[{alignItems: 'flex-end'}]}> */}
                  <Text style={styles.cardTitle}> رقم الهاتف</Text>   
                    <TextInput
                      placeholder ={Notification.LISTINGNUMBER}
                      placeholderTextColor = 'rgba(0,0,0,1)'
                      returnKeyType = 'go'
                      style = {styles.input2}
                      // keyboardType = 'phone-pad'
                      onChangeText = {(input) => this.setState({listingPhoneNumber: input})}
                      /> 
                  </View>               
                <TouchableOpacity >
                  <Text onPress={()=> this.updateListing(parseInt(Notification.LISTINGID), Notification)} style = {styles.buttonText2}> حفظ التعديلات </Text>

                  <Text onPress={()=> this.setState({delService: true, listingId: parseInt(Notification.LISTINGID)})} style = {styles.buttonText2}> ازالة الخدمه </Text>


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


    {
      if(this.state.loaded) {
      return (
      <ScrollView>
      
        <View style={styles.container}>
          <MaterialDialog
          style={{alignSelf: 'row-reverse'}}
          title="متأكد من ازالة الحساب الشخصي؟"
          visible={this.state.delProfile}
          cancelLabel="لا"
          okLabel="نعم" 
          onOk={() => {this.handleDelProfile()}}
          onCancel={() => {this.handleDelProfCancel()}}>
          </MaterialDialog>
          <MaterialDialog
          style={{alignSelf: 'row-reverse'}}
          title="متأكد من ازالة الخدمة؟"
          visible={this.state.delService}
          cancelLabel="لا"
          okLabel="نعم" 
          onOk={() => {this.handleDelService()}}
          onCancel={() => {this.handleDelServiceCancel()}}>
          </MaterialDialog>
          <View style={[styles.card, styles.profileCard]}> 
            
            <Image style={styles.avatar} source={{uri: this.state.person.image}} />
            <Button
                //onPress={onPressLearnMore}
                title="تغيير الصورة"
                color="#841584"
                accessibilityLabel="Change photo"
            />
          </View> 

          <View style={styles.card}>
            <Text style={styles.cardTitle}> الاسم</Text>   
            <TextInput  
                    placeholder = {this.state.data[0].USERNAME}
                    placeholderTextColor = 'rgba(0,0,0,1)'
                    color='rgba(0,0,0,1)'
                    returnKeyType = 'go'
                    style = {styles.inputFix}
                    onChangeText={(input) =>  this.setState({userName: input})}
                    /> 
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}> رقم الهاتف</Text>   
            <TextInput
                    placeholder ={this.state.data[0].USERNUMBER}
                    placeholderTextColor = 'rgba(0,0,0,1)'
                    color='rgba(0,0,0,1)'
                    // returnKeyType = 'phone-pad'
                    style = {styles.input}
                    onChangeText = {(input) => this.setState({phoneNumber: input})}
                    /> 
          </View>
          <TouchableOpacity > 
              <Text style = {styles.buttonText2} onPress={()=> this.updateUser()}> حفظ التعديلات </Text>

              <Text style = {styles.buttonText2} onPress={()=> this.setState({delProfile: true})}> ازالة الحساب </Text>
          </TouchableOpacity>
          <View
             style={{
             borderBottomColor: 'black',
             borderBottomWidth: 1,
             marginTop: 3,
            }}
          />  
        
          {listings()}


        </View>
      </ScrollView>
    );
    }else {
      return (
        <View style={styles.load}>
          < ActivityIndicator/>
        </View>
      );
    }
  }
    
  }
}

const styles = StyleSheet.create({
  load:{
    paddingTop: 30,
    alignItems: 'center'
  },
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
    color:"black",
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
  inputFix: {
      textAlign: 'right',
      height: 50,
      fontSize: 20,
      backgroundColor: 'rgba(225,225,225,0.2)',
      marginBottom: 20,
      color: '#000',
  },
    input2: {
    textAlign: 'right',
    height: 50,
    fontSize: 20,
    backgroundColor: 'rgba(225,225,225,0.2)',
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