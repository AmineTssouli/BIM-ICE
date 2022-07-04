import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import IceImg from '../assets/images/misc/Ice.svg';


const OnboardingScreen = ({ navigation }) => {
    return (
      <SafeAreaView style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        }}>
          <View>
            <Text style={{marginTop:20,fontSize:40, fontWeight:'bold', color:'#20315f',fontFamily:'Inter-Bold'}}>BIM-ICE </Text>
        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <IceImg width={200} height={200} style={{transform:[{rotate:'-15deg'}]}} />
        </View>
        
        <TouchableOpacity onPress={ () => navigation.navigate('Landing') } style={{
          backgroundColor:"#34e1eb",
          padding: 20,
          width:'90%',
          borderRadius: 5,
          flexDirection:'row',
          justifyContent:'space-between',
          marginBottom:50,
  
        }}>
        <Text style={{fontSize:18,color:'#fff',fontFamily:'Roboto-BoldItalic'}}>Let's Begin</Text>
        <Feather name='arrow-right' size={22} color='#fff' />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  export default OnboardingScreen;