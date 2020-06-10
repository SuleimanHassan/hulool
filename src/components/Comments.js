import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,

} from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import axios from 'axios';

const GLOBAL = require('./common');
export default class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repVisible: false,
      delVisible: false,
       userId: this.props.userId,
       COMMENTS: this.props.COMMENTS,
    }
    
  }

  handleRepCancel = () => {
    this.setState({ repVisible: false });
  }
  handleSendRep = () => {
    console.log("report");
    this.setState({ repVisible: false });
  }

  handleDelCancel = () => {
    this.setState({ delVisible: false });
  }
  handleDel = () => {
    console.log("delete is pressed");
    axios({
      method: 'delete',
      url: GLOBAL.serverLink + '/api/Comments/'+ this.state.commentId + '/removeComment'
    }).then((response) => {
      console.log(response.data);
    })
    this.setState({ delVisible: false,   commentId: null});
  }

  render() {
    delBtn = (item)=> {
      console.log(item);
      if (item.USERID == this.state.userId){
        
        return (<TouchableOpacity onPress={() => this.setState({delVisible: true, commentId: item.COMMENTID})}>
                 <Image style={styles.flag} source = {require('../images/garbage.jpeg')}/>
              </TouchableOpacity>);
      }
    } 

    return (
      <View style={styles.container1}>
      {/* {console.log(this.state.COMMENTS)} */}

      <MaterialDialog
          style={{alignSelf: 'row-reverse'}}
          title="تأكيد التبليغ عن التعليق؟"
          visible={this.state.repVisible}
          cancelLabel="لا"
          okLabel="نعم" 
          onOk={() => {this.handleSendRep()}}
          onCancel={() => {this.handleRepCancel()}}>
      </MaterialDialog>

      <MaterialDialog
          style={{alignSelf: 'row-reverse'}}
          title="تأكيد ازالة التعليق؟"
          visible={this.state.delVisible}
          cancelLabel="لا"
          okLabel="نعم" 
          onOk={() => {this.handleDel()}}
          onCancel={() => {this.handleDelCancel()}}>
      </MaterialDialog>

      <FlatList
        style={styles.root}
        data={this.state.COMMENTS}
        // onRefresh={()=> data.refetch}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.COMMENTID;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return(
            <View style={styles.container}>
              <TouchableOpacity>
                <Image style={styles.image} source={{uri: "https://bootdey.com/img/Content/avatar/avatar1.png"}}/>
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>{Notification.USERNAME}</Text>
                  <Text style={styles.time}>
                    {Notification.DATE.split('T')[0]}
                  </Text>
                  {delBtn(Notification)}
                  <TouchableOpacity onPress={() => this.setState({repVisible: true})}>
                    <Image style={styles.flag} source = {require('../images/report.png')}/>
                  </TouchableOpacity>
                </View>
                <Text style={styles.comment} rkType='primary3 mediumLine'>{Notification.COMMENT}</Text>
              </View>
            </View>
          );
        }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row-reverse',
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop:10,
  },
  container: {
    paddingLeft: 7,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row-reverse',
    alignItems: 'center',

  },
  content: {
    marginLeft: 16,
    flex: 1,
    // textAlign: 'right'
  },
  comment: {
    textAlign: 'right',
  },
  contentHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  },
  flag:{
    height: 20,
    width: 20,
  },
});