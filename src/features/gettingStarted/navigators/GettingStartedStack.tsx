import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import routes from "constants/routes";
import Drawer from "common/components/Drawer";
import AuthenticationStack from "features/authentication/navigator/AuthenticationStack";

function GettingStartedStack() {
  const Stack = createStackNavigator();
  const { authentication, gettingStarted, mainScreens } = routes;

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen
        name={authentication.stack}
        component={AuthenticationStack}
      />
      <Stack.Screen name={mainScreens.stack} component={Drawer} />
    </Stack.Navigator>
  );
}

export default GettingStartedStack;
