/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import Service from './src/components/Service'
import ListUsers from './src/components/ListUsers'
import { Platform, Navigator, StyleSheet, Text, View } from 'react-native';
import Splash from './src/components/Splash';
import Login from './src/components/Login'
import HomePage from './src/components/Home'
import SignupPage from './src/components/SignupPage'
import EditProfile from './src/components/EditProfile'
import SubCategoriesPage from './src/components/SubCategoriesPage'
import AddService from './src/components/AddService'
import AboutUs from './src/components/AboutUs'


import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation'

const HomeNav = StackNavigator({
  Home: {
    screen: HomePage, 
    navigationOptions: {
      header: null,
    }
  },

  EditProfile: {
    screen: EditProfile, 
  },
  AboutUs: {
    screen: AboutUs,
    navigationOptions: {
      // header: null,
      title: 'عن التطبيق',
    }  
  },
  SubCategoriesPage: { screen: SubCategoriesPage,
    navigationOptions: {
    } 
  },

  ListUsers: {screen: ListUsers,
    navigationOptions: {
      // header: null,
      title: 'مقدمو الخدمات',
    } 
  },

  AddService: {screen: AddService,
    navigationOptions: {
      // header: null,
      title: 'أضف خدمه',
    } 
  },
  Service: {screen: Service,
    navigationOptions: {
      // header: null,
      title: 'الملف الشخصي',
    }
  },
});

const StartUp = StackNavigator({
  Login: {
    screen: Login, 
    navigationOptions: {
      header: null,
    }
  },
  SignupPage: { screen: SignupPage },
  HomePage: { screen: HomeNav,
    navigationOptions: {
      header: null,
    } },
});



export default class App extends React.Component {
  render() {
    return (<StartUp/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
