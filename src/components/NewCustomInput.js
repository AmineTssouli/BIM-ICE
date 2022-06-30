import { View, Text,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Entypo from 'react-native-vector-icons/Entypo';

const NewCustomInput = ({inputType,secure,placeholder,error,handleOnChange,handleError, ...props}) => {

    const [secured,setSecured] = useState(true);

  return (
 
    <>
    <View style={{
        flexDirection:'row',
        borderWidth:1,
        borderColor: error ? 'red': '#61CE70',
        paddingLeft:20,
        marginBottom:10,
        borderRadius:88 
        }} >
             <Entypo style={{marginTop:10,marginLeft:-10}} name={inputType?"email":"lock"} size={24} color='#61CE70' />

            <TextInput
            placeholder={placeholder}
            style={style.input}
            keyboardType={inputType?'email-address':'default'}
            secureTextEntry={secured?true:false} 
            autoCapitalize ='none'
            onChangeText={handleOnChange}
            onFocus={handleError}
            {...props}

            />
             <TouchableOpacity onPress={()=>{setSecured(!secured)}}>
            { !inputType && <Entypo style={{margin:10}} name={ secured ? "eye-with-line" : "eye" } size={24} color='#61CE70'  /> }
            </TouchableOpacity>
            </View>
            {error && <Text style={style.error}>{error}</Text>}
            </>
  )
}
const style = StyleSheet.create({
    input : {flex:1, padding:10,fontSize:16,fontFamily:'Roboto-Regular'},
    error:{color:'red',fontSize:12,marginLeft:25,marginTop:-10}
  
  });
  

export default NewCustomInput