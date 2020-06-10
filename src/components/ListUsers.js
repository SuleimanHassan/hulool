import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Modal,
  ScrollView
} from 'react-native';
import Star from 'react-native-star-view';
import axios from 'axios';

const GLOBAL = require('./common');
export default class ListUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      userId: this.props.navigation.state.params.userId,
      subCategoryId: this.props.navigation.state.params.subCategoryId,
      subCategoryTitle: this.props.navigation.state.params.subCategoryTitle,
      title: this.props.navigation.state.params.title,
      modalVisible:false,
      // data: [
      //   {id: 1, image: require('../images/profile.png'), username:"د. سامي سعد", ratings: 3, views:90},
      //   {id: 2, image: require('../images/profile.png'), username:"د. حسين هاشم", ratings: 3, views:12},
      //   {id: 3, image: require('../images/profile.png'), username:"د. إبراهيم ملكي", ratings: 1, views:1},
      //   {id: 4, image: require('../images/profile.png'), username:"د. زهرة حسين", ratings: 5, views:20},
      //   {id: 5, image: require('../images/profile.png'), username:"د. نوال صفى", ratings: 5, views:99},
      //   {id: 6, image: require('../images/profile.png'), username:"د. نادر صعب", ratings: 4, views:174},
      //   {id: 7, image: require('../images/profile.png'), username:"د. ناجي جان عكيل", ratings: 2, views:32},
      //   {id: 8, image: require('../images/profile.png'), username:"د. نبيل فكيه", ratings: 3, views:13},
      //   {id: 9, image: require('../images/profile.png'), username:"د. رولاند طعمة", ratings: 1, views:17},
      // ]
      data: [],
      isFetching: false,
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    axios.get(GLOBAL.serverLink + '/api/SubCategories/' + this.state.subCategoryId +'/Listings?code=DQzhL1VTa16VEZkR3EOCB2MdgtmllfFgMcW/PVjzMQVv89n7ksR1Iw==')
        .then((response) => {
            this.setState({data: response.data});
            this.setState({loaded: true});
            console.log("Listings list data fetched:");            
            console.log(response.data);
            console.log(this.state.userId);
      });
    this.setState({ isFetching: false })

  }

  onRefresh() {
    this.setState(
      { isFetching: true }, 
      function() { this.fetchData() });
  }
  render() {
    const { navigate } = this.props.navigation;
    {if (this.state.loaded) {
    return (
    <View style={styles.bigcontainer}>
      <Text style={styles.addServiceBtn} onPress={() =>
        navigate('AddService', {
          userId: this.state.userId,
          subCategoryId: this.state.subCategoryId,
          subCategoryTitle: this.state.subCategoryTitle,
          title: this.state.title,
        })
      } 
        // this.props.navigation.navigate('AddService')}
        >أضف خدمه</Text>
      <View style={styles.container}>
        <FlatList 
          style={styles.userList}
          data={this.state.data}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor= {(item) => {
            return item.LISTINGID.toString();
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress = {
              // ()=>this.props.navigation.navigate('Service')
             ()=>
                  navigate('Service', {
                    id: item.LISTINGID,
                    subCategoryTitle: this.state.subCategoryTitle,
                    title: item.TITLE,
                    userId: this.state.userId,
                    stars: item.STARS
                  })
            }>
              <Image style={styles.image} source={require('../images/profile.png')}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.TITLE}</Text>
                <View style={ styles.starscontainer }>
				          <Star style={styles.starStyle} score={item.STARS} />
				          <Text style={styles.text}>({item.COMMENTS})</Text>
			          </View>
              </View>
            </TouchableOpacity>
          )}}/>
      </View>
      </View> 
    );
    } else {
      return(
        <View style={styles.load}>
          < ActivityIndicator/>
        </View>
        )
    }
    }
  }
}

const styles = StyleSheet.create({
  bigcontainer:{
    flex:1,
    width:"100%",
    // marginTop:0,
    backgroundColor:"#eeeeee"
  },
  starStyle:{
    width: 150,
    height: 30,
    marginBottom: 10,
    flexDirection: 'row-reverse',

  },
  container:{
    flexDirection: 'row-reverse',
    flex:1,
    width:"100%",
    // marginTop:0,
    backgroundColor:"#eeeeee"
  },
  userList:{
    flex:1,
  },
  cardContent: {
    marginRight:20,
    marginTop:10,
    // marginBottom: 10,
  },
  image:{
    width:80,
    height:80,
    borderRadius:40,
    // alignSelf: 'center',
  },
  addServiceBtn: {
    marginTop: 10,
    textAlign: 'center',
    color: '#12CBC4',
    fontSize: 20,
    fontWeight: '500',
    textDecorationLine: 'underline',
    marginBottom: 7,
  },
  card:{
    flexDirection: 'row-reverse',
    height: 100,
    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 5,
    borderRadius: 15,
  },

  name:{
    flexDirection: 'row-reverse',
    textAlign: 'right',
    fontSize:23,
    flex:1,
    // alignSelf:'center',
    color:"#12CBC4",
    // fontWeight: 'bold'
  },
  starscontainer: { 
    // alignContent: 'left',\
    alignSelf: 'flex-end',
		backgroundColor: 'white',
		flexDirection: 'row-reverse',
    width: 180,
    // height
		// alignItems: 'center'
  },
  load: {
    width:"100%",
    backgroundColor:"white",
    height: "100%",
    alignContent: 'center',
  },
	text: {
    width: 80,
    height: 30,
		fontSize: 20,
		marginLeft: 10,
		marginRight: 10,
    textAlign: 'right'
	}

}); 