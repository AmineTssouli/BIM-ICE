import { View, Text,SafeAreaView,Image ,TextInput,StyleSheet} from 'react-native'
import React,{useContext} from 'react'
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';


const ProfileScreen = () => {
  const {user} = useContext(AuthContext);

  return (
    <SafeAreaView  style={{flex:1,backgroundColor:'#fff',padding:20}} >
    <View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:20}}>
   
  
     <Text  style={[style.input,{borderColor:'#61CE70'}]} ></Text>
     <Text  style={[style.input,{borderColor:'#61CE70'}]} > </Text>
     <Text  style={[style.input,{borderColor:'#61CE70'}]} > </Text>
     <Text  style={[style.input,{borderColor:'#61CE70'}]} > </Text>
     <Text  style={[style.input,{borderColor:'#61CE70'}]} > </Text>
     <CustomButton label={'Update profile'} />
    </View>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  input : {paddingLeft:5,marginBottom:10,borderBottomWidth:1,fontSize:16,fontFamily:'Roboto-Regular'},
  error:{color:'red',fontSize:12,marginLeft:25,marginTop:-10}

});

export default ProfileScreen