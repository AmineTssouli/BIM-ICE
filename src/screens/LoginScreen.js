import { View,TextInput, Text ,SafeAreaView,TouchableOpacity,ImageBackground, Keyboard,Alert} from 'react-native';
import { CheckBox } from "@rneui/themed";
import React, { useContext, useState } from 'react';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import Google from '../assets/images/misc/google.svg';
import Facebook from '../assets/images/misc/facebook.svg';
import Apple from '../assets/images/misc/apple.svg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo'
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import ThemeContext from "../utils/ThemeContext";


const LoginScreen = ( { navigation }) => {
  const theme =useContext(ThemeContext);
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [isSelected, setSelection] = useState(true);
  const {login, user} = useContext(AuthContext);

  const [inputs,setInputs] = useState({
  email :'',
  password:'',
  });
  const [errors,setErrors] = useState({});
  

  const validate =  () => {
   
   Keyboard.dismiss();
   let valid= true;
   
   if (! inputs.email)
   {
    handleError("Please provide your email address","email");
    valid = false;
    return;
   }
   if (! inputs.email.match(/\S+@\S+\.\S+/))
   {
    handleError("Please provide a valid email address","email");
    valid = false;
   
  }
   if (! inputs.password)
   {
    handleError("Please provide your password","password");
    valid = false;

   }
   if (valid) {
       
      login(email,password);  

    }

  };

  const handleOnChange = (text,input) => {
    setInputs(prevState =>({...prevState,[input]:text}));
    if (input == 'email') {
      setEmail(text);
    }
    if (input == 'password') {
      setPassword(text);
    }

  };

  const handleError = (message,input) => {
    setErrors(prevState =>({...prevState,[input]:message}));
  
  }

  return (
    <SafeAreaView  style= {{ 
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: theme.backgroundcolor,
      
   
      }}>
        <View style={{marginTop:10,marginBottom:30}}>
      <ImageBackground source={require('../../src/assets/images/logo.png')} style={{width:200,height:200}}  />
      <Text style={{textAlign:'center',marginTop:10,fontSize:30, fontWeight:'bold', color:theme.textcolor,fontFamily:'Inter-Bold' }}>Login</Text>
      </View>

      <View style={{width:'80%'}}>  
         <CustomInput  icon='email' value={email}  placeholder ='Email' keyboardType='email-address' inputType='email-address' onChangeText={text => { handleOnChange(text,'email')}} onFocus= {() => { handleError(null,'email')}} error={errors.email}/>
         <CustomInput icon='lock'  value={password} placeholder ='Password' handleOnChange ={ (text) => { handleOnChange(text,'password')}} onFocus= {() => { handleError(null,'password')}} error={errors.password} extraicon={true}/>

          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15}}>
          <CheckBox
          checkedColor='#61CE70'
          containerStyle={{padding:0,margin:0,backgroundColor:theme.backgroundcolor}}
          title={'Remember me'}
        textStyle={{color: theme.textcolor}}
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            
            
          />
        
          <TouchableOpacity onPress={() => { navigation.navigate('Resetpassword')}}>
            <Text style={{color:'#61CE70',fontWeight:'700'}}>Forgot Password ? </Text>
          </TouchableOpacity>
          </View>
        </View>

        <CustomButton label='Login' onPress={ validate } />
        <Text style={{color:theme.textcolor}}>or, login with ...</Text>
        <View style= {{flexDirection:'row',marginTop:20,marginBottom:20}}>
              <TouchableOpacity
                  onPress={()=>{}}
                  style= {{
                    borderColor:theme.borderColor,
                    borderWidth:2,
                    borderRadius:10,
                    paddingHorizontal:30,
                    paddingVertical:10,
                
                  }}
                  >
              <Google height={24} width={24} />
              </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{}}
                style= {{
                  borderColor:theme.borderColor,
                  borderWidth:2,
                  borderRadius:10,
                  paddingHorizontal:30,
                  paddingVertical:10,
                  marginLeft:30
                }}
                >
          <Facebook height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{}}
                style= {{
                  borderColor:theme.borderColor,
                  borderWidth:2,
                  borderRadius:10,
                  paddingHorizontal:30,
                  paddingVertical:10,
                  marginLeft:30
                }}
                >
          <Apple height={24} width={24} color={theme.applecolor} />
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:30}}>
        <Text style={{color:theme.textcolor}}>New to the app? </Text>
        <TouchableOpacity onPress={() => { navigation.navigate('Signup')}}>
          <Text style={{color:'#61CE70',fontWeight:'700'}}>Register</Text>
        </TouchableOpacity>
        </View>

    </SafeAreaView>
  )
}

export default LoginScreen;