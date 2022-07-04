import * as React from 'react';
import { View,Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

const CustomRadiobutton = ({value,...props}) => {


  return (
     <>
      <RadioButton
        value={value}
        color='#61CE70'
        {...props}
      />
      <Text style={{fontSize:16,fontFamily:'Roboto-Regular'}}>{value}</Text>
      </>
  );
};

export default CustomRadiobutton;