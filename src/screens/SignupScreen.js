import { View, Text ,SafeAreaView,TouchableOpacity, ImageBackground, ScrollView, Keyboard} from 'react-native'
import React, { useContext, useState } from 'react'
import CustomButton from '../components/CustomButton';
import CustomRadiobutton from '../components/CustomRadiobutton';
import CustomInput from '../components/CustomInput';
import Google from '../assets/images/misc/google.svg';
import Facebook from '../assets/images/misc/facebook.svg';
import Apple from '../assets/images/misc/apple.svg';
import {AuthContext} from '../navigation/AuthProvider';





const SignupScreen = ({ navigation }) => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const [fullname,setFullname] = useState();
  const {register,err} = useContext(AuthContext);
  const [inputs,setInputs] = useState({
  email :'',
  password:'',
  confirmPassword :'',
  fullname:''
  });
  const [checked, setChecked] = useState('Student');
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
   if(! inputs.password.match(inputs.confirmPassword))
   {
    handleError("Passwords don't match","password");
    valid = false;
   }
   if (! inputs.fullname)
   {
    handleError("Please provide your full name","fullname");
    valid = false;

   }
   if (valid) {
  
    register(email,password,checked,fullname);
   
      if (err.length != 0)
      {
        
        
        console.log(err.message,err.input);
        handleError(err.message,err.input);
      }
      

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
    if (input == 'confirmPassword') {
      setConfirmPassword(text);
    }
    if (input == 'fullname') {
      setFullname(text);
    }

  };

  const handleError = (message,input) => {
    setErrors(prevState =>({...prevState,[input]:message}));
  
  }
  return (
    <SafeAreaView >
        <ScrollView>
          <View style = {{ flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#fff'
      
   
      }}>
                <View>
                  <ImageBackground source={require('../../src/assets/images/logo.png')} style={{ marginTop:20,width:200,height:200}}  />
                </View>
      <Text style={{marginTop:10,marginBottom:50,fontSize:30, fontWeight:'bold', color:'#20315f',fontFamily:'Inter-Bold' }}>Create an account</Text>
      <View style= {{flexDirection:'row',marginTop:20,marginBottom:20}}>
              <TouchableOpacity
                  onPress={()=>{ }}
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
        <Text style={{marginBottom:20}}>or, register with email</Text>
      <View style={{width:'80%',fontFamily:'Roboto-Regular'}}>
         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:10}}>  
         <CustomRadiobutton value='Student' status={ checked === 'Student' ? 'checked' : 'unchecked' }  onPress={() => setChecked('Student')} />
         <CustomRadiobutton value='Teacher' status={ checked === 'Teacher' ? 'checked' : 'unchecked' }  onPress={() => setChecked('Teacher')} />
         </View>
         <CustomInput icon='email' placeholder ='Email' inputType='email-address'  onChangeText={text => { handleOnChange(text,'email')}} onFocus= {() => { handleError(null,'email')}}  error={errors.email}  />
         <CustomInput icon='lock'placeholder ='Password'  secure={true} onChangeText={text => { handleOnChange(text,'password')}} onFocus= {() => { handleError(null,'password')}}  error={errors.password}  />
         <CustomInput icon='lock' placeholder ='Confirm password'  secure={true} onChangeText={text => { handleOnChange(text,'confirmPassword')}} onFocus= {() => { handleError(null,'confirmPassword')}}  error={errors.confirmPassword}  />
         <CustomInput icon='user' placeholder ='Full name' onChangeText={text => { handleOnChange(text,'fullname')}} onFocus= {() => { handleError(null,'fullname')}}  error={errors.fullname} />
         
          
          <Text style={{marginBottom:30,marginTop:10,fontWeight:'bold',color:'gray',fontSize:12}}>By clicking Sign up, you agree to our terms and conditions </Text>
       
        </View>
        <CustomButton label='Sign up' onPress={ validate } />
        
        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:40}}>
        <Text>Already registered? </Text>
        <TouchableOpacity onPress={() => { navigation.navigate('Login')}}>
          <Text style={{color:'#61CE70',fontWeight:'700'}}>Login</Text>
        </TouchableOpacity>
        </View>
        
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignupScreen;