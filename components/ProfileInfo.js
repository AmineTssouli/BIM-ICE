import React, { useContext } from 'react';
import {View, Text,} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

export default function ProfileInfo(){
    const {user} = useContext(AuthContext);
    return(
        <View style={{alignItems:'center'}}>
            <Text style={{
                fontSize:24,
                fontWeight:'500',
                color:'black'
            }}>
                Artyom Kamnev
            </Text>
            <Text style={{
                fontSize:18,
                fontWeight:'400',
                top:-4
            }}>
                Student
            </Text>
            <Text style={{
                fontSize:16,
                fontWeight:'300',
                top:-6
            }}>
                artyom@gmail.com
            </Text>
        </View>
    );
};