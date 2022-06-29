import React,{useContext,useState,useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const CustomDrawer = props => {
  const {user,logout} = useContext(AuthContext);
  const [userData,setUserData] = useState();

  const getUser =  async () => {
    await firestore()
   .collection('Users')
   .doc(auth().currentUser.uid)
   .get()
   .then((QuerySnapshot) => {
      if (QuerySnapshot.exists )
      {
         setUserData(QuerySnapshot.data());
      }

    
   }).catch(e =>console.log(e))
   
}

useEffect(()=>{
  getUser();
},[]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#34e1eb'}}>
        <ImageBackground
          source={require('../assets/images/menu-bg.png')}
          style={{padding: 20}}>
          <Image
            source={require('../assets/images/user-profile.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
           {userData ? userData.fullname: ''}
          </Text>
          <Text style={{
              color: 'black',
              fontSize: 15,
              fontFamily: 'Roboto-Regular',
              
            }}>{ userData ? userData.profession:''} </Text>
    
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20,paddingTop: 0, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { logout()}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};




export default CustomDrawer;
