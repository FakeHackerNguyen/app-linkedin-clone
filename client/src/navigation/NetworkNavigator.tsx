import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MyNetwork from '../screens/features/connection/MyNetwork';
import ManageMyNetwork from '../screens/features/connection/ManageMyNetwork';
import Connections from '../screens/features/connection/Connections';

export type NetworkStackParams = {
  NetworkScreen: undefined;
  ManageMyNetworkScreen: undefined;
  ConnectionScreen: undefined;
};

const Stack = createNativeStackNavigator<NetworkStackParams>();

export default function NetworkNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="NetworkScreen">
      <Stack.Screen
        name="NetworkScreen"
        options={{headerShown: false}}
        component={MyNetwork}
      />
      <Stack.Screen
        name="ManageMyNetworkScreen"
        options={{headerShown: false}}
        component={ManageMyNetwork}
      />
      <Stack.Screen
        name="ConnectionScreen"
        options={{headerShown: false}}
        component={Connections}
      />
    </Stack.Navigator>
  );
}
