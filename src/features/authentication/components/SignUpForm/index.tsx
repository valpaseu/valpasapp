import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Platform,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Formik, FormikHelpers } from "formik";
import { VStack, Input, FormControl, Button, Text, View } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { object, string, ref } from "yup";
import { useNavigation } from "@react-navigation/native";

import { Auth } from "aws-amplify";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Sentry from "sentry-expo";

import colors from "constants/colors";
import routes from "constants/routes";
import { AlertPopup } from "common/components/Alert";

export type ValueSignUpForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpFormProps = {
  handleUserEmail: (email: string) => void;
};

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = object().shape({
  name: string()
    .min(4, "Name must be at least 4 characters")
    .max(30, "Name should not excceed 30 chars.")
    .required("Please, provide your name!"),
  email: string()
    .email("Email must be a valid email")
    .required("Please, provide your email!"),
  password: string()
    .min(8, "Password should be at least 8 chars.")
    .max(30, "Password should not excceed 30 chars.")
    .required("Please, provide your password!"),
  confirmPassword: string()
    .oneOf([ref("password"), undefined], "Passwords must match")
    .min(8, "Password should be at least 8 chars.")
    .max(30, "Password should not excceed 30 chars.")
    .required("Confirm your password."),
});

export default function SignUpForm({
  handleUserEmail: handleConfirmationEmail,
}: SignUpFormProps) {
  const navigation = useNavigation();

  const onSubmit = async (
    values: ValueSignUpForm,
    submitProps: FormikHelpers<ValueSignUpForm>
  ) => {
    const { email, name, password } = values;
    await signUp(email, password, name, submitProps);
  };

  async function signUp(
    email: string,
    password: string,
    name: string,
    submitProps: FormikHelpers<ValueSignUpForm>
  ) {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          "custom:bio": "Iam new user",
          "custom:formID": "1",
          "custom:timeID": "2"
        },
      });
      AlertPopup({
        title: "Confirm your email",
        message: `We have sent an email to ${email} with a confirmation code. If you didn't receive a code, you can request a new one on the next screen.`,
        buttons: [
          {
            text: "Confirm",
          },
        ],
      });
      handleConfirmationEmail(email);
    } catch (error) {
      Sentry.Native.captureException(error);
      AlertPopup({
        title: "Sign up error",
        message: error.message,
        buttons: [
          {
            text: "Edit",
          },
          {
            text: "Clear",
            onPress: () => submitProps.resetForm(),
          },
        ],
      });
    }
  }
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
          <Text style={styles.formTitle}>Sign up</Text>
          <Formik
            initialValues={initialValues}
            enableReinitialize
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
                  <FormControl.Label>Your Name</FormControl.Label>
                  <Input
                    accessibilityLabel="Your Name"
                    value={values.name}
                    style={styles.inputStyle}
                    onChangeText={handleChange("name")}
                    onBlur={() => setFieldTouched("name")}
                    placeholder="Name"
                  />
                </FormControl>
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <FormControl style={styles.wrapperInput}>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    accessibilityLabel="Email"
                    value={values.email}
                    style={styles.inputStyle}
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                    keyboardType="email-address"
                    placeholder="E-mail"
                    autoCapitalize="none"
                    // todo: turn off autoCapitalize in sign-in, if not already and turn off case sensitively for username in Cognito, as Hung suggested
                  />
                </FormControl>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <FormControl style={styles.wrapperInput}>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    accessibilityLabel="Password"
                    value={values.password}
                    style={styles.inputStyle}
                    onChangeText={handleChange("password")}
                    placeholder="Password"
                    onBlur={() => setFieldTouched("password")}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </FormControl>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <FormControl style={styles.wrapperInput}>
                  <FormControl.Label>Confirm Password</FormControl.Label>
                  <Input
                    accessibilityLabel="Confirm Password"
                    value={values.confirmPassword}
                    style={styles.inputStyle}
                    onChangeText={handleChange("confirmPassword")}
                    placeholder="Confirm Password"
                    onBlur={() => setFieldTouched("confirmPassword")}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </FormControl>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
                <TouchableOpacity style={styles.termsPolicy}>
                  <Text style={styles.smallText}>Terms of Use </Text>
                  <Text style={styles.smallText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={isValid ? styles.signUpBtn : styles.signUpBtnDisabled}
                  disabled={!isValid}
                  onPress={
                    handleSubmit as unknown as (
                      event: GestureResponderEvent
                    ) => void
                  }
                >
                  <Text style={styles.textSignup}>Sign up</Text>
                </TouchableOpacity>
              </VStack>
            )}
          </Formik>
          <View style={styles.smallTextWrapper}>
            <Text> Or sign up using other ways</Text>
          </View>
          <View style={styles.wrapperLSignupOthers}>
            <Button style={styles.signInBtnGmail}>
              <AntDesign name="google" size={24} color="grey" />
              <Text style={styles.gmailText}>Gmail</Text>
            </Button>
            <Button
              style={styles.signInApplicant}
              onPress={() =>
                navigation.navigate(
                  routes.authentication.applicantSignIn.screen
                )
              }
            >
              <MaterialIcons name="person-outline" size={24} color="black" />
              <Text style={styles.applicantText}>Applicant</Text>
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp("100%"),
    backgroundColor: colors.primaryColors.primary300,
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
  },
  formTitle: {
    marginLeft: 5,
    marginTop: hp("6%"),
    fontSize: hp("2.5%"),
    color: colors.textColors.white,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 12,
    color: "#FF0D10",
    alignSelf: "flex-start",
    height: 16,
  },
  inputGroup: {
    marginTop: hp("4%"),
    flexDirection: "column",
    borderColor: "transparent",
  },
  wrapperInput: {
    marginVertical: 3,
  },
  inputLabel: {
    fontSize: hp("1.5%"),
    color: colors.primaryColors.primary500,
  },
  inputStyle: {
    color: colors.textColors.white,
  },
  termsPolicy: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  smallTextWrapper: {
    marginVertical: hp("3%"),
    justifyContent: "center",
    alignItems: "center",
  },
  smallText: {
    fontSize: 12,
    color: colors.textColors.black,
    marginHorizontal: 10,
  },
  textSignup: {
    color: colors?.textColors.white,
  },
  signUpBtn: {
    alignItems: "center",
    backgroundColor: colors?.primaryColors.primary100,
    borderRadius: 4,
    justifyContent: "center",
    height: 40,
  },
  signUpBtnDisabled: {
    alignItems: "center",
    backgroundColor: colors?.primaryColors.primary400,
    borderRadius: 4,
    justifyContent: "center",
    height: 40,
  },
  wrapperLSignupOthers: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  signInBtnGmail: {
    flexDirection: "row",
    width: "45%",
    borderRadius: 4,
    height: hp("5%"),
    justifyContent: "center",
    backgroundColor: colors?.primaryColors.primary200,
  },
  signInApplicant: {
    flexDirection: "row",
    width: "45%",
    borderRadius: 4,
    height: hp("5%"),
    justifyContent: "center",
    marginLeft: "auto",
    backgroundColor: colors?.primaryColors.primary400,
  },
  textNoAccount: {
    color: colors.textColors.white,
    fontSize: 12,
  },
  textNoAccountSignup: {
    color: colors.textColors.white,
    fontSize: 12,
    textDecorationLine: "underline",
  },
  gmailText: {
    fontSize: hp("1.7%"),
  },
  applicantText: {
    fontSize: hp("1.7%"),
    color: colors.textColors.black,
  },
});
