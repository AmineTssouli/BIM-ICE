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
        contentContainerStyle={{backgroundColor: '#fff'}}>

        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social" size={22} color='#333'/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color:'#333'
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { logout()}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit" size={22} color='#333' />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color:'#333'
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
