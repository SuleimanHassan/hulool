import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import BottomDrawer from 'rn-bottom-drawer';
// import EditProfile from './EditProfile'
import Home from './Home';

export default class AboutUs extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,

    };  
  }

  render() {    
    const { navigate } = this.props.navigation;
    { 
    return(
        <View style={styles.container}>
          <Image resizeMode='contain' style= {styles.imgcont} source ={require('../images/aboutus.png')}/> 
          <BottomDrawer
           containerHeight={140}
           backgroundColor='#dcdcdc'>
            <View style= {styles.cont}>

              <TouchableOpacity onPress={()=> {
                navigate('Home', {
                  userId: this.state.userId
                })
              }}>
                <Image style={styles.flag} source = {require('../images/home.png')}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
              }}>
                <Image style={styles.flag} source = {require('../images/info.png')}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                 navigate('EditProfile', {
                  userId: this.state.userId
                })
              } }>
                <Image style={styles.flag} source = {require('../images/profileicon.png')}/>
              </TouchableOpacity>
              
            </View>
          </BottomDrawer>
        </View>
        );
    }
  }

}

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#12CBC4',
      // flex: 1,
    // marginTop:0,
  },
  imgcont: {
    // marginTop: 3,
    // marginBottom: 3,
    width: '100%',
    height: '100%',
  },
  cont: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 8,
  },
  flag:{
    height: 40,
    width: 40,
    marginHorizontal: 40,
  },
});
