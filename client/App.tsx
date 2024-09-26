import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from './src/screens/Intro';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Intro"
          options={{headerShown: false}}
          component={Intro}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
