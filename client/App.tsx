import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from './src/screens/Intro';
import Login from './src/screens/features/user/Login.tsx';
import RegisterNavigator from './src/navigation/RegisterNavigator.tsx';
import ForgotPasswordNavigator from './src/navigation/ForgotPasswordNavigator.tsx';
import {Provider} from 'react-redux';
import {store} from './src/store.tsx';

export type RootStackParams = {
  Intro: undefined;
  Signin: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen
            name="Intro"
            options={{headerShown: false}}
            component={Intro}
          />
          <Stack.Screen
            name="Signin"
            options={{headerShown: false}}
            component={Login}
          />
          <Stack.Screen
            name="Signup"
            options={{headerShown: false}}
            component={RegisterNavigator}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordNavigator}
            options={{
              headerShown: false,
              presentation: 'modal',
              gestureEnabled: true,
              animation: 'slide_from_bottom',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
