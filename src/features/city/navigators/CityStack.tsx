import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import routes from "../../../constants/routes";

import CityMain from "../screens/City";

const CityStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.mainScreens.city.screen}
        component={CityMain}
      />
    </Stack.Navigator>
  );
};

export default CityStack;
