import React,{ createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export const AuthContext = createContext();

export const AuthProvider = ({  children  }) => {
    const [user,setUser] = useState(null);
    const [err,setErr] = useState(null);

    return (

        <AuthContext.Provider
        value ={{
            user,
            setUser,
            err,
            setErr,
            login : async (email,password) => {
                try {
                    await auth().signInWithEmailAndPassword(email,password);
                }
                catch(e) {
                    console.log(e);
                }
            },
            register : async (email,password,profession,fullname) => {
                 try {
                    await auth().createUserWithEmailAndPassword(email,password)
                    .then(() => {
                         firestore().collection('Users').doc(auth().currentUser.uid)
                        .set({
                            fullname: fullname,
                            email: email,
                            profession: profession,
                            userImg : '',
                            createdAt:firestore.Timestamp.fromDate(new Date())
                            
                        })
                       
                      });
                
                        console.log('User added!');
                
            }
            catch(error) {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    setErr('That email address is already in use!');
                  }
              
                  if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    setErr('That email address is invalid!');
                  }
               
                
            }
        }, logout : async () => {
                try {
                    await auth().signOut();
           }
           catch(e) {
               console.log(e);
           }
        }, 
       
        }} >
            { children }

        </AuthContext.Provider>
    );
};