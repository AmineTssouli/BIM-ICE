import { View, Text ,SafeAreaView,TouchableOpacity,ImageBackground, Keyboard} from 'react-native';
import React, { useContext, useState } from 'react';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import Google from '../assets/images/misc/google.svg';
import Facebook from '../assets/images/misc/facebook.svg';
import Apple from '../assets/images/misc/apple.svg';
import {AuthContext} from '../navigation/AuthProvider';


const LoginScreen = ( { navigation }) => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const {login} = useContext(AuthContext);
  const [inputs,setInputs] = useState({
  email :'',
  password:'',
  });
  const [errors,setErrors] = useState({});

  const validate = () => {
   Keyboard.dismiss();
   let valid= true;
   if (! inputs.email)
   {
    handleError("Please provide your email address","email");
    valid = false;
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
    <SafeAreaView  style= {{ flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#fff',
      
   
      }}>
        <View>
      <ImageBackground source={require('../../src/assets/images/logo.png')} style={{ marginTop:10,width:200,height:200}}  />
      </View>
      <Text style={{marginTop:10,marginBottom:50,fontSize:30, fontWeight:'bold', color:'#20315f',fontFamily:'Inter-Bold' }}>Login</Text>

      <View style={{width:'80%',fontFamily:'Roboto-Regular'}}>  
         <CustomInput placeholder ='Email' inputType='email-address' onChangeText={text => { handleOnChange(text,'email')}} onFocus= {() => { handleError(null,'email')}} error={errors.email}/>
         <CustomInput placeholder ='Password'  secure={true}  onChangeText={text => { handleOnChange(text,'password')}} onFocus= {() => { handleError(null,'password')}}  error={errors.password} />

        </View>
        <CustomButton label='Login' onPress={ validate } />
        <Text>or, login with ...</Text>
        <View style= {{flexDirection:'row',marginTop:20,marginBottom:20}}>
              <TouchableOpacity
                  onPress={()=>{}}
                  style= {{
                    borderColor:'#ddd',
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
                  borderColor:'#ddd',
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
                  borderColor:'#ddd',
                  borderWidth:2,
                  borderRadius:10,
                  paddingHorizontal:30,
                  paddingVertical:10,
                  marginLeft:30
                }}
                >
          <Apple height={24} width={24} />
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:30}}>
        <Text>New to the app? </Text>
        <TouchableOpacity onPress={() => { navigation.navigate('Signup')}}>
          <Text style={{color:'#61CE70',fontWeight:'700'}}>Register</Text>
        </TouchableOpacity>
        </View>

    </SafeAreaView>
  )
}

export default LoginScreen;