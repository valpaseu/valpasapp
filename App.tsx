import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { Provider, useDispatch } from "react-redux";
import Amplify, { Hub } from "aws-amplify";
import * as Sentry from "@sentry/react";
import AppLoading from "expo-app-loading";

import { DataStore } from "@aws-amplify/datastore";

import makeStore from "./src/redux/store";
import colors from "./src/constants/colors";
import Drawer from "./src/common/components/Drawer";
import GettingStartedStack from "./src/features/gettingStarted/navigators/GettingStartedStack";
import { checkFirstLaunch } from "./src/features/gettingStarted/services";
import { loadAuth } from "./src/features/authentication/redux/actions";
import awsExports from "./src/aws-exports";
import { removeAuth } from "./src/features/authentication/redux/actions";
import { useFonts } from "expo-font";

if (process.env.LOG_LEVEL) Amplify.Logger.LOG_LEVEL = process.env.LOG_LEVEL;
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    //enableInExpoDevelopment: true,
    debug: !!__DEV__,
  });
}

Amplify.configure(awsExports);

const store = makeStore();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.primaryColors.background,
  },
};

function App() {
  const [isFirstLaunch, setFirstLaunch] = useState(false);
  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    "SourceSansPro-regular": require("./assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf"),
    "SourceSansPro-semiBold": require("./assets/fonts/SourceSansPro/SourceSansPro-SemiBold.ttf"),
    "SourceSansPro-light": require("./assets/fonts/SourceSansPro/SourceSansPro-Light.ttf"),
  });

  const handleSignIn = (session: any) => {
    const { accessToken, idToken } = session;
    const { email, phone_number, email_verified, phone_number_verified } =
      idToken.payload;
    dispatch(
      loadAuth({
        accessToken: accessToken.jwtToken,
        profile: { email, email_verified, phone_number, phone_number_verified },
      })
    );
  };

  Hub.listen("auth", async (res) => {
    switch (res.payload.event) {
      case "signIn":
        if (!res.payload.data.signInUserSession) break;
        handleSignIn(res.payload.data.signInUserSession);
        await DataStore.start();
        break;
      case "signOut":
        dispatch(removeAuth());
        await DataStore.clear();
        break;
    }
  });

  useEffect(() => {
    checkFirstLaunch(setFirstLaunch);
  }, []);

  if (!fontsLoaded) {
    return (
      <AppLoading
        onError={console.warn}
      />
    );
  } else {
    return (
      <>
        <Sentry.ErrorBoundary>
          <NavigationContainer theme={theme}>
            {isFirstLaunch ? <GettingStartedStack /> : <Drawer />}
          </NavigationContainer>
        </Sentry.ErrorBoundary>
      </>
    );
  }
}

export default function AppWrapper() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NativeBaseProvider>
  );
}
