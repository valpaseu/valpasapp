import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import route from "../../../constants/routes";

import OnBoardingAdd from "features/profile/screens/onBoardingAdd";
import ProfileScreen from "features/profile/screens/Profile";
import SystemPage from "features/profile/screens/SystemPage";
import editProfile from "features/profile/screens/EditProfile";

const ProfileStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={route.mainScreens.profile.profile.screen}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={route.mainScreens.profile.addOnBoarding.screen}
        component={OnBoardingAdd}
      />
      <Stack.Screen
        name={route.mainScreens.profile.systemPage.screen}
        component={SystemPage}
      />
      <Stack.Screen
        name={route.mainScreens.profile.editProfile.screen}
        component={editProfile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
