import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Formik, FormikHelpers } from "formik";
import {
  VStack,
  Input,
  Button,
  FormControl,
  Text,
  View,
  Checkbox,
} from "native-base";
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  GestureResponderEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { string, object } from "yup";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Auth } from "aws-amplify";
import * as Sentry from "sentry-expo";

import colors from "constants/colors";
import routes from "constants/routes";
import { AlertPopup } from "common/components/Alert";
import { ValueSignInForm, AuthResponse } from "features/types";
import {
  disableGettingStartedScreen,
  enableGettingStartedScreen,
} from "features/gettingStarted/services";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInForm() {
  const navigation = useNavigation();
  const [checkboxValue, setCheckboxValue] = useState(false);

  //For usage during the development
  // const initialValues = { name: 'unverifiedEmail@integrify.io', password: 'Test123456' }
  const initialValues = {
    name: "alexey.kovbel@gmail.com",
    password: "Alexeyy101",
  };

  const onSubmit = async (
    values: ValueSignInForm,
    submitProps: FormikHelpers<ValueSignInForm>
  ) => {
    try {
      submitProps.setSubmitting(false);

      const authUser: AuthResponse = await Auth.signIn(
        values.name,
        values.password
      );
      const email_verified =
        authUser.signInUserSession &&
        authUser.signInUserSession.idToken.payload.email_verified;

      if (!checkboxValue) enableGettingStartedScreen();
      else disableGettingStartedScreen();

      if (authUser.challengeName === "NEW_PASSWORD_REQUIRED") {
        AlertPopup({
          title: "Update password required",
          message: "Please change your temporary password before proceeding.",
          buttons: [{ text: "Change password" }],
        });
        navigation.navigate(routes.authentication.completeNewPassword.screen, {
          authUser,
        });
      } else if (!email_verified) {
        AlertPopup({
          title: "Email not verified",
          message: "Please verify your email.",
          buttons: [{ text: "Verify email" }],
        });
        //TODO: navigate to  confirm email screen using Daniel's confirm form
      } else {
        navigation.navigate(routes.mainScreens.stack, {
          screen: routes.mainScreens.profile.profile.screen,
        });
        submitProps.resetForm();
      }
    } catch (error) {
      Sentry.Native.captureException(error);
      console.log(error);

      AlertPopup({
        title: "Oops...",
        message: "Incorrect Username/Email or Password",
        buttons: [{ text: "Try again" }],
      });
    }
  };

  const validationSchema = object().shape({
    name: string()
      .min(4, "Name must be at least 4 characters")
      .max(100, "Name should not exceed 100 chars.")
      .required("Please, provide your name!"),
    password: string()
      .min(8, "Password should be at least 8 chars.")
      .max(100, "Password should not exceed 100 chars.")
      .required("Please, provide your password!"),
  });

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === "ios"}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.appNameWrapper}>
            <Text style={styles.appName}>VALPAS</Text>
          </View>
          <Text style={styles.formTitle}>Sign in</Text>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <VStack>
                <FormControl style={styles.wrapperInput}>
                  <Text style={styles.wrapperInputText}>Username/Email</Text>
                  <Input
                    accessibilityLabel="User Name/Email"
                    value={values.name}
                    style={styles.inputStyle}
                    onChangeText={handleChange("name")}
                    onBlur={() => setFieldTouched("name")}
                    placeholder="Name"
                    autoCapitalize="none"
                  />
                </FormControl>
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <FormControl style={styles.wrapperInput}>
                  <Text style={styles.wrapperInputText}>Password</Text>
                  <Input
                    accessibilityLabel="Password"
                    value={values.password}
                    style={styles.inputStyle}
                    onChangeText={handleChange("password")}
                    placeholder="Password"
                    onBlur={() => setFieldTouched("password")}
                    secureTextEntry
                  />
                </FormControl>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <View style={styles.wrapperRemember}>
                  <Checkbox
                    value="test"
                    accessibilityLabel="This is a dummy checkbox"
                    onChange={setCheckboxValue}
                  />
                  <Text style={styles.checkboxText}>Remember me</Text>
                  <Text
                    style={styles.forgotText}
                    onPress={() =>
                      navigation.navigate(
                        routes.authentication.forgotPassword.screen
                      )
                    }
                  >
                    Forgot Password?
                  </Text>
                </View>
                <TouchableOpacity
                  style={isValid ? styles.signInBtn : styles.signInBtnDisabled}
                  disabled={!isValid}
                  onPress={
                    handleSubmit as unknown as (
                      event: GestureResponderEvent
                    ) => void
                  }
                >
                  <Text style={styles.textSignupSignin}>Sign in</Text>
                </TouchableOpacity>
              </VStack>
            )}
          </Formik>
        </View>
        <View style={styles.wrapperNoAccount}>
          <Text style={styles.textNoAccount}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.refSignup}
            onPress={() =>
              navigation.navigate(routes.authentication.signUp.screen)
            }
          >
            <Text style={styles.textNoAccountSignup}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  wrapperInputText: {
    fontFamily: "SourceSansPro-regular",
    marginBottom: 4,
    marginTop: 5,
  },
  container: {
    height: hp("100%"),
    backgroundColor: colors.primaryColors.syan,
  },
  wrapper: {
    marginHorizontal: wp("7%"),
  },
  appNameWrapper: {
    marginTop: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    lineHeight: 28,
    fontFamily: "SourceSansPro-semiBold",
  },
  formTitle: {
    marginTop: hp("6%"),
    fontSize: hp("2.5%"),
    color: colors.textColors.white,
    fontFamily: "SourceSansPro-semiBold",
  },
  inputGroup: {
    marginTop: hp("4%"),
    flexDirection: "column",
    borderColor: "transparent",
  },
  wrapperInput: {
    marginVertical: 3,
  },
  inputStyle: {
    color: colors.textColors.white,
  },
  errorText: {
    fontSize: 12,
    color: colors.textColors.errorText,
    alignSelf: "flex-start",
    paddingTop: 2,
    height: 16,
    textDecorationLine: "none",
  },
  wrapperRemember: {
    paddingTop: 24,
    paddingBottom: 24,
    flexDirection: "row",
  },
  checkboxText: {
    fontFamily: "SourceSansPro-regular",
    color: colors.textColors.white,
    paddingRight: 24,
    paddingLeft: 5,
    fontSize: hp("1.6%"),
  },
  forgotText: {
    fontFamily: "SourceSansPro-regular",
    marginLeft: "auto",
    color: colors.textColors.white,
    fontSize: hp("1.6%"),
  },
  smallTextWrapper: {
    marginVertical: hp("3%"),
    justifyContent: "center",
    alignItems: "center",
  },
  textSignupSignin: {
    fontFamily: "SourceSansPro-regular",
    color: colors?.textColors.white,
  },
  signInBtn: {
    alignItems: "center",
    backgroundColor: colors?.primaryColors.primary100,
    borderRadius: 4,
    justifyContent: "center",
    height: 40,
  },
  signInBtnDisabled: {
    alignItems: "center",
    backgroundColor: colors?.primaryColors.primary400,
    borderRadius: 4,
    justifyContent: "center",
    height: 40,
  },
  wrapperLoginOthers: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  signInApplicant: {
    flexDirection: "row",
    width: "45%",
    borderRadius: 4,
    height: hp("5%"),
    justifyContent: "center",
    backgroundColor: colors?.primaryColors.primary400,
  },
  applicantText: {
    fontSize: hp("1.7%"),
    color: colors.textColors.black,
  },
  wrapperNoAccount: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  textNoAccount: {
    color: colors.textColors.white,
    fontSize: 12,
    fontFamily: "SourceSansPro-regular",
  },
  refSignup: {
    paddingLeft: 12,
  },
  textNoAccountSignup: {
    fontFamily: "SourceSansPro-regular",
    color: colors.textColors.white,
    fontSize: 12,
    textDecorationLine: "underline",
  },
});
