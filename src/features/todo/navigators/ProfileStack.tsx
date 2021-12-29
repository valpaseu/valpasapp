import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import BackButton from "../../../common/components/BackButton";

import route from "../../../constants/routes";
import colors from "../../../constants/colors";

import ToDoScreen from "../screens/todo";

const ProfileStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={route.mainScreens.todo.todoMain.screen}
        component={ToDoScreen}
        options={{
          headerTitleStyle: {fontFamily: "SourceSansPro-regular"},
          headerTitle: "Notification or ToDo",
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BackButton isWhite />
            </View>
          ),
          headerStyle: styles.header,
        }}
      />
    </Stack.Navigator>
  );
};

const width = Dimensions.get("screen").width * 0.06;

const styles = StyleSheet.create({
  header: {
    shadowColor: "transparent",
    elevation: 0,
    backgroundColor: colors.primaryColors.background,
  },
  navIconContainer: {
    marginHorizontal: width,
  },
});

export default ProfileStack;
