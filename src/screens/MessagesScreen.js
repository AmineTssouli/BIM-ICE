import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from "../utils/ThemeContext";
const MessagesScreen = () => {
  const theme = useContext(ThemeContext);
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:theme.backgroundcolor}}>

      <Text>MessagesScreen</Text>
    </View>
  )
}

export default MessagesScreen