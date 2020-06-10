
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
import axios from 'axios';

const GLOBAL = require('./common');
export default class SubCategoriesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      clicked: this.props.navigation.state.params.id,
      title: this.props.navigation.state.params.title,
      preImage: "https://rolodex2.blob.core.windows.net/photos/",
      modalVisible:false,
      // data: [
      //   {id:1,  name: "طبيب قلب",  image:require('../images/SubCategories/Dr/dr_cardiologist.png')},
      //   {id:2,  name: "طبيب أسنان",  image:require('../images/SubCategories/Dr/dr_dentist.png')},
      //   {id:3,  name: "طبيب جلد",  image:require('../images/SubCategories/Dr/dr_dermatologist.png')},
      //   {id:4,  name: "طبيب عام",  image:require('../images/SubCategories/Dr/dr_generalpractitioner.png')},
      //   {id:5,  name: "طبيب جهاز هضمي",  image:require('../images/SubCategories/Dr/dr_endocrinologist.png')},
      //   {id:6,  name: "طبيب أعصاب",  image:require('../images/SubCategories/Dr/dr_neurologist.png')},
      //   {id:7,  name: "طبيب نساء وتوليد",  image:require('../images/SubCategories/Dr/dr_obstetrition.png')},
      //   {id:8,  name: "طبيب عيون",  image:require('../images/SubCategories/Dr/dr_opthamologist.png')},
      //   {id:9,  name: "طبيب عظم",  image:require('../images/SubCategories/Dr/dr_osteopath.png')},
      //   {id:10,  name: "طبيب أطفال",  image:require('../images/SubCategories/Dr/dr_pediatrition.png')},
      //   {id:11,  name: "معالج فيزياذي",  image:require('../images/SubCategories/Dr/dr_physiotherapist.png')},
      //   {id:12,  name: "طبيب تجميل",  image:require('../images/SubCategories/Dr/dr_plasticsurgeon.png')},
      //   {id:13,  name: "طبيب نفسي",  image:require('../images/SubCategories/Dr/dr_psychiatrist.png')},
      //   {id:14,  name: "جرّاح",  image:require('../images/SubCategories/Dr/dr_surgeon.png')},
      // ]
      data: []
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    axios.get(GLOBAL.serverLink + '/api/Categories/'+ this.state.clicked.toString() + '/SubCategories')
        .then((response) => {
            this.setState({data: response.data});
            this.setState({loaded: true});
            console.log("subcategoriesPage data fetched:");            
            console.log(response.data);
            console.log(this.state.userId);

      });
  }

  render() {
    const { navigate } = this.props.navigation;
    {
      if (this.state.loaded) {
      return (
        <View style={styles.containerbig}> 
        <Text style={styles.title}> {this.state.title}</Text>
        <View style={styles.container}> 
          <FlatList 
            style={styles.userList}
            data={this.state.data}
            keyExtractor= {(item) => {
            
              return item.SUBCATEGORYID.toString();
  
            }}
            renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.card} onPress = {
                // ()=>this.props.navigation.navigate('ListUsers')
                ()=>
                  navigate('ListUsers', {
                    subCategoryId: item.SUBCATEGORYID,
                    subCategoryTitle: item.TITLE,
                    title: item.TITLE,
                    userId: this.state.userId
                  })
              }
                >
                <Image style={styles.image}
                      source={{uri: this.state.preImage+item.IMAGE}}
                      />
                      {/* {console.log(this.state.preImage+item.IMAGE)} */}
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.TITLE}</Text>
                  {/* <Text style={styles.name}> {typeof this.state.title}</Text> */}
                </View>
              </TouchableOpacity>
            )}}/>
        </View>
        </View>
      );
    }else{
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
  title: {
    marginTop: 5,
    marginBottom: 5,
    fontSize:23,
    alignSelf: 'center',
    color:"grey",
    fontWeight:'bold',
  },
  containerbig:{
    flex:1,
    // width:"100%",
  },
  container:{
    flexDirection: 'row-reverse',
    flex:1,
    width:"100%",
    backgroundColor:"#eeeeee"
  },
  userList:{
    flex:1,
  },
  load: {
    width:"100%",
    backgroundColor:"white",
    height: "100%",
    alignContent: 'center',
  },
  cardContent: {
    marginRight:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
  },
  card:{
    flexDirection: 'row-reverse',
    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    borderRadius: 15,
  },

  name:{
    flexDirection: 'row-reverse',
    fontSize:23,
    marginTop: 18,
    alignItems: 'center',
    flex:1,
    color:"#12CBC4",
    fontWeight:'bold',
    // textAlign: 'right'
  },

}); 



// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
//   Modal,
//   ScrollView
// } from 'react-native';

// export default class SubCategoriesPage extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       modalVisible:false,
//       data: [
//         {id:1,  name: "طبيب قلب",  image:require('../images/SubCategories/Dr/dr_cardiologist.png')},
//         {id:2,  name: "طبيب أسنان",  image:require('../images/SubCategories/Dr/dr_dentist.png')},
//         {id:3,  name: "طبيب جلد",  image:require('../images/SubCategories/Dr/dr_dermatologist.png')},
//         {id:4,  name: "طبيب عام",  image:require('../images/SubCategories/Dr/dr_generalpractitioner.png')},
//         {id:5,  name: "طبيب جهاز هضمي",  image:require('../images/SubCategories/Dr/dr_endocrinologist.png')},
//         {id:6,  name: "طبيب أعصاب",  image:require('../images/SubCategories/Dr/dr_neurologist.png')},
//         {id:7,  name: "طبيب نساء وتوليد",  image:require('../images/SubCategories/Dr/dr_obstetrition.png')},
//         {id:8,  name: "طبيب عيون",  image:require('../images/SubCategories/Dr/dr_opthamologist.png')},
//         {id:9,  name: "طبيب عظم",  image:require('../images/SubCategories/Dr/dr_osteopath.png')},
//         {id:10,  name: "طبيب أطفال",  image:require('../images/SubCategories/Dr/dr_pediatrition.png')},
//         {id:11,  name: "معالج فيزياذي",  image:require('../images/SubCategories/Dr/dr_physiotherapist.png')},
//         {id:12,  name: "طبيب تجميل",  image:require('../images/SubCategories/Dr/dr_plasticsurgeon.png')},
//         {id:13,  name: "طبيب نفسي",  image:require('../images/SubCategories/Dr/dr_psychiatrist.png')},
//         {id:14,  name: "جرّاح",  image:require('../images/SubCategories/Dr/dr_surgeon.png')},
//       ]
//     };
//   }

//   render() {
//     return (
//       <View style={styles.container}>          
//         <FlatList 
//           style={styles.userList}
//           data={this.state.data}
//           keyExtractor= {(item) => {
            
//             return item.id.toString();

//           }}
//           renderItem={({item}) => {
//           return (
//             <TouchableOpacity style={styles.card} onPress = {()=>this.props.navigation.navigate('ListUsers')}>
//               <Image style={styles.image} source={item.image}/>
//               <View style={styles.cardContent}>
//                 <Text style={styles.name}>{item.name}</Text>
//               </View>
//             </TouchableOpacity>
//           )}}/>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container:{
//     flexDirection: 'row-reverse',
//     flex:1,
//     width:"100%",
//     backgroundColor:"#eeeeee"
//   },
//   userList:{
//     flex:1,
//   },
//   cardContent: {
//     marginRight:20,
//     marginTop:10
//   },
//   image:{
//     width:90,
//     height:90,
//     borderRadius:45,
//   },
//   card:{
//     flexDirection: 'row-reverse',
//     marginVertical: 10,
//     marginHorizontal:20,
//     backgroundColor:"white",
//     flexBasis: '46%',
//     padding: 10,
//     borderRadius: 15,
//   },

//   name:{
//     flexDirection: 'row-reverse',
//     fontSize:23,
//     marginTop: 18,
//     alignItems: 'center',
//     flex:1,
//     color:"#008080",
//     fontWeight:'bold',
//     // textAlign: 'right'
//   },

// }); 