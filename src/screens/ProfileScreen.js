import { View, Text,SafeAreaView,Image ,TextInput,StyleSheet} from 'react-native'
import React,{useContext} from 'react'
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';


const ProfileScreen = () => {
  const {user} = useContext(AuthContext);
  console.log(user.photoURL);
  return (
    <SafeAreaView  style={{flex:1,backgroundColor:'#fff',padding:20}} >
    <View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:20}}>
  <Image source={require('../../src/assets/images/user-profile.jpg')} style={{width:80,height:80,borderRadius:25}}/>
      <Text>{user.displayName}</Text>
  
     <Text  style={[style.input,{borderColor:'#61CE70'}]} >Fullname {user.displayName}</Text>
     <Text  style={[style.input,{borderColor:'#61CE70'}]} >Fullname {user.displayName}</Text>
     <Text  style={[style.input,{borderColor:'#61CE70'}]} >Fullname {user.displayName}</Text>
     <Text  style={[style.input,{borderColor:'#61CE70'}]} >Fullname {user.displayName}</Text>
     <Text  style={[style.input,{borderColor:'#61CE70'}]} >Fullname {user.displayName}</Text>
     <CustomButton label={'Update profile'} />
    </View>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  input : {paddingLeft:5,marginBottom:10,borderBottomWidth:1,fontSize:16,fontFamily:'Roboto-Regular'},
  error:{color:'red',fontSize:12,marginLeft:10,marginTop:-10}

});

export default ProfileScreen