import {
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import React, { FC } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import color from "constants/colors";
import size from "constants/size";
import routes from "constants/routes";

const SideBar: FC<Pick<DrawerContentComponentProps, "navigation" | "state">> =
  ({ navigation, state }) => {
    const { home, positions, messages, onBoarding, profile, city, todo } =
      routes.mainScreens;

    const drawerMap = [
      { labelName: "Profile", route: profile.stack },
      { labelName: "Positions", route: positions.stack },
      { labelName: "Cities", route: city.stack },
      { labelName: "Messages", route: messages.stack },
      { labelName: "Onboarding", route: onBoarding.stack },
      { labelName: "ToDo", route: todo.stack }
    ];

    const mockMainScreenRouteState = {
      index: 0,
      routes: [{ name: home.screen }],
    };

    const mainScreenRouteState = state.routes[0].state
      ? state.routes[0].state
      : mockMainScreenRouteState;

    return (
      <View style={styles.container}>
        {drawerMap.map(({ labelName, route }) => (
          <DrawerItem
            key={`drawerLabel-${labelName}`}
            labelStyle={styles.link}
            label={labelName}
            focused={
              mainScreenRouteState.index ===
              mainScreenRouteState.routes.findIndex((r) => r.name === route)
            }
            activeBackgroundColor="transparent"
            activeTintColor={color.drawer.activeLink}
            inactiveTintColor={color.drawer.inactiveLink}
            onPress={() => navigation.navigate(route)}
          />
        ))}
      </View>
    );
  };

const smallScreen = Dimensions.get("screen").width < 330;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: color.drawer.background,
    paddingLeft: "10%",
  },
  link: {
    fontFamily: "SourceSansPro-semiBold",
    fontSize: smallScreen
      ? size.sideBar.linkTextSmall
      : size.sideBar.linkTextBig,
    fontWeight: "600",
    marginTop: smallScreen ? "-15%" : "0%",
    letterSpacing: 1.2,
  },
});

export default SideBar;
