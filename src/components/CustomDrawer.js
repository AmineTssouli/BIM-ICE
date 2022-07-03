import React,{useContext,useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Share
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import ThemeContext from "../utils/ThemeContext";

const CustomDrawer = props => {
  const theme = useContext(ThemeContext);
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

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
  return (
    <View style={{flex: 1,backgroundColor: theme.backgroundcolor}}>
      <DrawerContentScrollView
        {...props}
        >

        <View style={{flex: 1, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={onShare} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social" size={22} color={theme.icon_inactivecolor}/>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color:theme.icon_inactivecolor
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { logout()}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit" size={22} color={theme.icon_inactivecolor} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color:theme.icon_inactivecolor
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
