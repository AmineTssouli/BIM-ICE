import React, { useContext, useState } from 'react';
import { View, Text ,SafeAreaView,TouchableOpacity, Keyboard} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const PasswordChange = ({navigation}) => {
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    const [inputs,setInputs] = useState({
        password :'',
        confirmPassword :''
    });
    const [errors,setErrors] = useState({})

    const validate = () => {
        Keyboard.dismiss();
        let valid= true;
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
        if (valid) {
            login(email);
        }
       };
       const handleOnChange = (text,input) => {
         setInputs(prevState =>({...prevState,[input]:text}));
         if (input == 'password') {
            setPassword(text);
          }
          if (input == 'confirmPassword') {
            setConfirmPassword(text);
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
            <View style={{top:160 , width:'80%', marginBottom:160}}> {/*errors and handleOnChange*/}
                <CustomInput placeholder ='Current Password' secure={true} onChangeText={text => { handleOnChange(text,'')}} onFocus= {() => { handleError(null,'')}} error={errors.password} />
                <CustomInput placeholder ='New Password' secure={true} onChangeText={text => { handleOnChange(text,'')}} onFocus= {() => { handleError(null,'')}} error={errors.password} />
                <CustomInput placeholder ='Confirm New Password' secure={true} onChangeText={text => { handleOnChange(text,'')}} onFocus= {() => { handleError(null,'')}} error={errors.confirmPassword} />
            </View>
            <CustomButton label='Save Changes' onPress={validate} />
        </SafeAreaView>
    );
};
export default PasswordChange;