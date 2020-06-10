import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Splash extends Component{
    render(){
        return (
            <View style={styles.wrapper}>
                <View style={styles.titleWrapper}>
                    <Text style = {styles.title}>Hi guys look!</Text>
                    <Text style = {styles.subtitle}>Hi guys look again!</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    wrapper: {
        backgroundColor: 'purple', 
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    title : {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },    
    subtitle : {
        color: 'white',
        fontSize: 30,
        fontWeight: '200',
        paddingBottom: 20,
    }, 
    titleWrapper: {
        flex: 1,
        justifyContent: 'center',
    }
}
);