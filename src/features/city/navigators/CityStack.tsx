import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import routes from "../../../constants/routes";

import CityMain from "../screens/City/index";

const CityStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.mainScreens.city.cityMain.screen}
        component={CityMain}
      />
    </Stack.Navigator>
  );
};

export default CityStack;
