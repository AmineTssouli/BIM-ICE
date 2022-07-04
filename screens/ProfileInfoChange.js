import React, { useContext, useState } from 'react';
import { View, Text ,SafeAreaView,TouchableOpacity, Keyboard} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const ProfileInfoChange = ({navigation}) => {
    const [email,setEmail] = useState();
    const [inputs,setInputs] = useState({
        email :'',
    });
    const [errors,setErrors] = useState({})

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
        if (valid) {
         login(email);
        }
       };
       const handleOnChange = (text,input) => {
         setInputs(prevState =>({...prevState,[input]:text}));
         if (input == 'email') {
           setEmail(text);
         }

     
       };
     
       const handleError = (message,input) => {
         setErrors(prevState =>({...prevState,[input]:message}));
       
       }
    return(
        <SafeAreaView style={{flex:1, alignItems:'center'}}>
            <TouchableOpacity style={{alignSelf:'flex-start', left:25, top:20}} onPress={()=>{navigation.navigate('ProfileScreen')}}>
                <Text style={{fontSize:16, fontWeight:'300'}}>
                    Back
                </Text>
            </TouchableOpacity>
            <View style={{top:160 , width:'80%', marginBottom:160}}> {/*needs new errors and handleOnChange*/}
                <CustomInput placeholder ='Artyom' inputType='email-address' onChangeText={text => { handleOnChange(text,'email')}} onFocus= {() => { handleError(null,'email')}} error={errors.email} />
                <CustomInput placeholder ='Kamnev' inputType='email-address' onChangeText={text => { handleOnChange(text,'email')}} onFocus= {() => { handleError(null,'email')}} error={errors.email} />
                <CustomInput placeholder ='artyom@gmail.com' inputType='email-address' onChangeText={text => { handleOnChange(text,'email')}} onFocus= {() => { handleError(null,'email')}} error={errors.email} />
            </View>
            <CustomButton label='Save Changes' onPress={validate} />
        </SafeAreaView>
    );
};
export default ProfileInfoChange