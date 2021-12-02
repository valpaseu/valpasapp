import { createStackNavigator } from '@react-navigation/stack'
import React from "react";

import OnBoardingAdd from "features/profile/screens/onBoardingAdd";
import ProfileScreen from "features/profile/screens/Profile";
import SystemPage from 'features/profile/screens/SystemPage';
import editProfile from 'features/profile/screens/EditProfile'

const ProfileStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Add OnBoarding" component={OnBoardingAdd} />
      <Stack.Screen name="System Page" component={SystemPage} />
      <Stack.Screen name="Edit Profile" component={editProfile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
