import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import realizarLogin from './assets/screens/realizarLogin';
import paginaPrincipal from './assets/screens/paginaPrincipal';
import listarJogadores from './assets/screens/listarJogadores';


const Stack = createNativeStackNavigator();

const App = () => (

  <NavigationContainer>
    <Stack.Navigator initialRouteName="RealizarLogin">
      <Stack.Screen name="realizarLogin" component={realizarLogin} options={{ headerShown: false }} />
      <Stack.Screen name="paginaPrincipal" component={paginaPrincipal} options={{ headerShown: false }} />
      <Stack.Screen name="listarJogadores" component={listarJogadores} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;