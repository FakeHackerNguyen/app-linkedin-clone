import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RegisterAddingName from '../screens/features/user/Register.AddingName';
import RegisterAddingEmail from '../screens/features/user/Register.AddingEmail';
import RegisterAddingProfile from '../screens/features/user/Register.AddingProfile';

export type RegisterStackParams = {
  AddingName: undefined;
  AddingEmail: undefined;
  AddingProfile: undefined;
};

const Stack = createNativeStackNavigator<RegisterStackParams>();

export default function RegisterNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="AddingProfile">
      <Stack.Screen
        name="AddingName"
        options={{headerShown: false}}
        component={RegisterAddingName}
      />
      <Stack.Screen
        name="AddingEmail"
        options={{headerShown: false}}
        component={RegisterAddingEmail}
      />
      <Stack.Screen
        name="AddingProfile"
        options={{headerShown: false}}
        component={RegisterAddingProfile}
      />
    </Stack.Navigator>
  );
}
