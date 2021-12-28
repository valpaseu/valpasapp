import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import route from "../../../constants/routes";

import ToDoScreen from "../screens/todo/index";

const ProfileStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={route.mainScreens.todo.todoMain.screen}
        component={ToDoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
