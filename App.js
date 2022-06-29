import React, { useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider , AuthContext } from './src/navigation/AuthProvider';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';

const Router = () => {
  // Set an initializing state whilst Firebase connects

  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;


  return (
    <NavigationContainer>
      { user ? <AppStack />:<AuthStack /> } 
    </NavigationContainer>
  );
};

const App = () => {
  return(
    <AuthProvider>
      
      <Router />
   
    </AuthProvider>
  );

}

export default App;
