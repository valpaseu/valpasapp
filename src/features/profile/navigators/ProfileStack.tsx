import { createStackNavigator } from '@react-navigation/stack'
import React from "react";

import OnBoardingAdd from "features/profile/screens/onBoardingAdd";
import ProfileScreen from "features/profile/screens/Profile";

const ProfileStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen" component={ProfileScreen} />
      <Stack.Screen name="onBoardingAdd" component={OnBoardingAdd} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
