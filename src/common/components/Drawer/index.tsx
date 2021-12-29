import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import color from "constants/colors";
import routes from "constants/routes";
import CityStack from "features/city/navigators/CityStack";
import HomeStack from "features/home/navigators/HomeStack";
import OnBoardingStack from "features/onBoarding/navigators/OnBoardingStack";
import PositionStack from "features/positions/navigators/PositionStack";
import AuthenticationStack from "features/authentication/navigator/AuthenticationStack";
import SideBar from "common/components/SideBar";
import MessageStack from "features/messages/navigators/MessageStack";
import ProfileStack from "features/profile/navigators/ProfileStack";
import ToDoStack from "../../../features/todo/navigators/ProfileStack";

const Drawer = () => {
  const { mainScreens, authentication } = routes;
  const { positions, city, messages, onBoarding, profile, todo } =
    mainScreens;

  const screens = [
    { route: profile.stack, component: ProfileStack },
    { route: positions.stack, component: PositionStack },
    { route: city.stack, component: CityStack },
    { route: messages.stack, component: MessageStack },
    { route: onBoarding.stack, component: OnBoardingStack },
    { route: todo.stack, component: ToDoStack },
  ];

  const DrawerNav = createDrawerNavigator();
  const Stack = createStackNavigator();

  const [progress] = useState<Animated.Node<number>>(new Animated.Value(0));
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, -screenWidth * 0.2],
  });
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 25],
  });

  return (
    <DrawerNav.Navigator
      screenOptions={{
        title: "",
        drawerType: "slide",
        overlayColor: "transparent",
        drawerStyle: styles.drawer,
        sceneContainerStyle: { backgroundColor: color.drawer.background },
      }}
      drawerContent={({ navigation, state }) => {
        return <SideBar navigation={navigation} state={state} />;
      }}
    >
      <DrawerNav.Screen
        name={mainScreens.stack}
        options={{ gestureEnabled: true }}
      >
        {() => (
          <Animated.View
            style={{
              ...styles.animatedViewParent,
              transform: [{ scale, translateX }],
            }}
          >
            <Animated.View
              style={{ ...styles.animatedViewChild, borderRadius }}
            >
              <Stack.Navigator
                screenOptions={{ headerShown: false, gestureEnabled: false }}
              >
                {screens.map(({ route, component }, index) => (
                  <Stack.Screen
                    key={index}
                    name={route}
                    component={component}
                  />
                ))}
              </Stack.Navigator>
            </Animated.View>
          </Animated.View>
        )}
      </DrawerNav.Screen>
      <DrawerNav.Screen
        name={authentication.stack}
        component={AuthenticationStack}
        options={{ swipeEnabled: false, headerShown: false }}
      />
    </DrawerNav.Navigator>
  );
};

const { width: screenWidth } = Dimensions.get("screen");

const styles = StyleSheet.create({
  drawer: {
    width: screenWidth * 0.65,
  },
  animatedViewParent: {
    flex: 1,
    shadowColor: color.primaryColors.primary100,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  animatedViewChild: {
    flex: 1,
    overflow: "hidden",
    elevation: 5,
  },
  header: {
    backgroundColor: "#00adef"
  }
});

export default Drawer;
