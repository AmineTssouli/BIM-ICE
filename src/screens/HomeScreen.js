import React, {useContext, useEffect, useState} from "react";
import {TouchableOpacity, Text,TextInput,View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import TermsList from '../components/TermsList';


const HomeScreen = ({ navigation })=> {
    const {user} = useContext(AuthContext);
    const [allTerms,setAllTerms] = useState([]);
    const [border,setBorder] = useState('#C6C6C6');
    const [clicked,setClicked] = useState(false);
    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(true);
    const [userData,setUserData] =useState(null);


    const updateSearch = (value) => {
            
            setSearch(value);
            console.log(value);                 
        
    }



const getUser =  async () => {
                
       await firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then((querySnapshot) => {
         if (querySnapshot.exists)
         {
            console.log("user data",userData);
            setUserData(querySnapshot.read());
         }

       
      }).catch(e =>console.log(e))
      


}

useEffect(()=>{
    getUser();
},[])


const getAllTerms =  async () => {

    const terms= [];
    await firestore()
   .collection('Terms')
   .orderBy('created_at', 'desc')
   .get()
   .then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      const {name,description,created_at,id} = doc.data();
      terms.push( {
         id : id, 
         name: name,
         description:description,
         created_at:created_at
      });

      

    })

    setAllTerms([]);
    setAllTerms(terms);
    if (loading) setLoading(false);
   }).catch(e =>console.log(e))
   


}



    useEffect(() => { 
          getAllTerms();
          navigation.addListener('focus', () => { setLoading(!loading)});
          
      },[navigation,loading]);  





    return(
    <SafeAreaView  style={{flex:1,backgroundColor:'#fff',padding:20}} >
        
{/*        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
       <Text style={{fontSize:16, fontFamily:'Roboto-Bold'}}>Hello {user.displayName}</Text>
    <TouchableOpacity onPress={()=>navigation.openDrawer()} >
    <ImageBackground source={require('../../src/assets/images/user-profile.jpg')} style={{width:35,height:35}} imageStyle={{borderRadius:25}} />
        </TouchableOpacity>
        </View> */}
 
      <View style={{
            flexDirection:'row',
            borderWidth:2,
            borderRadius:8,
            borderColor:border ?? border,
            paddingHorizontal:10,
            paddingVertical:8}} >
            <Feather name='search' size={22} color='#C6C6C6' style={{marginRight:5,marginTop:3}} />
            <TextInput placeholder="Type here to search" style={{flex:1, padding:0}}
            value={search}
            onChangeText= {(value)=>updateSearch(value)}
            onBlur ={()=> {setClicked(false); setBorder('#C6C6C6'); }}
            onFocus ={()=> {setClicked(true); setBorder('#d3e8d9'); }}
            />
            { clicked && 
            
            <FontAwesome5 name="times" size={22} color='#AAA' style={{marginRight:5,marginTop:3}} onPress={()=>{ setSearch(''); setClicked(false);}} /> }

        </View> 
    
        <View  
         style={{
            marginVertical:15,
            flexDirection:'row',
            justifyContent:'space-between'
        }}>
            <Text style={{fontSize:16,fontFamily:'Roboto-Bold'}}>Most searched terms</Text>
        <TouchableOpacity>
            <Text style={{color:'#AD40AF'}}>See all</Text>
        </TouchableOpacity>
        </View>


          

     
     <TermsList terms={allTerms} search={search} navigation={navigation} />
    </SafeAreaView>

  
    );
  };

  export default HomeScreen;