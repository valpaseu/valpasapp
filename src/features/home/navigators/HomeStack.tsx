import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "constants/colors";
import Home from "features/home/screens/Home";
import JobItem from "features/positions/components/JobItem";

const width = Dimensions.get("screen").width * 0.05;

const HomeStack = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="HomeMain">
      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobItem}
        options={{
          headerTitle: "",
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
