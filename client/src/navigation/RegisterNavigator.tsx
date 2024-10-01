import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RegisterAddingName from '../screens/features/user/Register.AddingName';
import RegisterAddingEmail from '../screens/features/user/Register.AddingEmail';
import RegisterAddingProfile from '../screens/features/user/Register.AddingProfile';
import RegisterAddingAvatar from '../screens/features/user/Register.AddingAvatar';
import RegisterVerifyingEmail from '../screens/features/user/Register.VerifyingEmail';

export type RegisterStackParams = {
  AddingName: undefined;
  AddingEmail: undefined;
  AddingProfile: undefined;
  AddingAvatar: undefined;
  VerifyingEmail: undefined;
};

const Stack = createNativeStackNavigator<RegisterStackParams>();

export default function RegisterNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="AddingName">
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
      <Stack.Screen
        name="AddingAvatar"
        options={{headerShown: false}}
        component={RegisterAddingAvatar}
      />
      <Stack.Screen
        name="VerifyingEmail"
        options={{headerShown: false}}
        component={RegisterVerifyingEmail}
      />
    </Stack.Navigator>
  );
}
