import { View, TextInput , Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({inputType,secure,placeholder,error, ...props}) => {
  return (
    <View>

        <TextInput
          placeholder={placeholder}
          style={[style.input,{borderColor: error ? 'red': '#61CE70'}]}
          secureTextEntry={secure ? true:false}
          keyboardType={inputType}
          autoCapitalize ='none'
          {...props}
        
        />


    {error && <Text style={style.error}>{error}</Text>}
    </View>

  )
}

const style = StyleSheet.create({
  input : {borderWidth:1,paddingLeft:20,marginBottom:10,borderRadius:88,fontSize:16,fontFamily:'Roboto-Regular'},
  error:{color:'red',fontSize:12,marginLeft:10,marginTop:-10}

});

export default CustomInput