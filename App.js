import React, { useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider , AuthContext } from './src/navigation/AuthProvider';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import ThemeContext from './src/utils/ThemeContext';
import { Appearance } from 'react-native';


import theme from './src/utils/theme';


const Router = () => {
  // detecting the user current theme and display the app accordingly
  const [mode,setMode] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener((scheme)=>{
  setMode(scheme.colorScheme);
  })
 


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
    <ThemeContext.Provider value ={ mode === 'light' ? theme.light : theme.dark}>
    <NavigationContainer >
      { user ? <AppStack />:<AuthStack /> } 
    </NavigationContainer>
    </ThemeContext.Provider>
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
