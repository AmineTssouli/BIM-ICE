import { View, Text,SafeAreaView,StyleSheet} from 'react-native'
import React,{useContext} from 'react'
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import ProfileInfo from '../components/ProfileInfo';



const ProfileScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);

  return (
    <SafeAreaView  style={{flex:1,backgroundColor:'#fff',padding:20}} >
     <View style={{flex: 1,alignItems:'center',marginBottom:20, top: 75}}>
      <ProfileInfo />
      <View style={{top:80, width:'100%', alignItems:'center'}}>
        <CustomButton label='Change profile info' onPress={()=>{navigation.navigate('ProfileInfoChange')}}/>
        <CustomButton label='Change password' onPress={()=>{navigation.navigate('PasswordChange')}}/>
      </View>
     </View>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  input : {paddingLeft:5,marginBottom:10,borderBottomWidth:1,fontSize:16,fontFamily:'Roboto-Regular'},
  error:{color:'red',fontSize:12,marginLeft:10,marginTop:-10}

});

export default ProfileScreen