import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import ForgotPasswordAddingEmail from '../screens/features/user/ForgotPassword.AddingEmail';
import ForgotPasswordVerifyingEmail from '../screens/features/user/ForgotPassword.VerifyingEmail';
import ForgotPasswordConfirmPassword from '../screens/features/user/ForgotPassword.ConfirmPassword';

export type ForgotPasswordStackParams = {
  AddingEmail: undefined;
  VerifyingEmail: undefined;
  ConfirmPassword: undefined;
};

const Stack = createNativeStackNavigator<ForgotPasswordStackParams>();

export default function ForgotPasswordNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="ConfirmPassword">
      <Stack.Screen
        name="AddingEmail"
        options={{headerShown: false}}
        component={ForgotPasswordAddingEmail}
      />
      <Stack.Screen
        name="VerifyingEmail"
        options={{headerShown: false}}
        component={ForgotPasswordVerifyingEmail}
      />
      <Stack.Screen
        name="ConfirmPassword"
        options={{headerShown: false}}
        component={ForgotPasswordConfirmPassword}
      />
    </Stack.Navigator>
  );
}
