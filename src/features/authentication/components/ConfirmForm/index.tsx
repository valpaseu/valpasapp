import React from "react";
import { Formik, FormikHelpers } from "formik";
import {
  VStack,
  Input,
  FormControl,
  InputGroup,
  Text,
  Button,
} from "native-base";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { object, string } from "yup";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import * as Sentry from "sentry-expo";

import colors from "constants/colors";
import routes from "constants/routes";
import { AlertPopup } from "common/components/Alert";

type ConfirmFormProps = {
  userEmail: string;
  handleUserEmail: (email: string) => void;
};

type ValueConfirmForm = {
  code: string;
};

const initialValues = {
  code: "",
};

const validationSchema = object().shape({
  code: string()
    .length(6, "Code should be exactly 6 digits long")
    .required("Please, provide your confirmation code!"),
});

export default function ConfirmForm({
  userEmail,
  handleUserEmail,
}: ConfirmFormProps) {
  const navigation = useNavigation();

  const onSubmit = async (
    values: ValueConfirmForm,
    submitProps: FormikHelpers<ValueConfirmForm>
  ) => {
    await confirmEmail(userEmail, values.code, submitProps);
  };

  async function confirmEmail(
    userEmail: string,
    code: string,
    submitProps: FormikHelpers<ValueConfirmForm>
  ) {
    try {
      await Auth.confirmSignUp(userEmail, code);
      AlertPopup({
        title: "Success",
        message: `Email confirmed`,
        buttons: [
          {
            text: "Sign in",
            onPress: () => {
              navigation.navigate(routes.authentication.signIn.screen);
              handleUserEmail("");
            },
          },
        ],
      });
    } catch (error) {
      Sentry.Native.captureException(error);
      AlertPopup({
        title: "Confirmation code error",
        message: error.message,
        buttons: [
          {
            text: "Try again",
            onPress: () => submitProps.resetForm(),
          },
          {
            text: "Resend code",
            onPress: () => {
              Auth.resendSignUp(userEmail);
              submitProps.resetForm();
            },
          },
        ],
      });
    }
  }
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.wrapper}
      scrollEnabled
    >
      <SafeAreaView>
        <Text style={styles.projectName}>VALPAS</Text>
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
            <VStack style={styles.formContainer}>
              <Text style={styles.formTitle}>Confirm Email</Text>
              <FormControl style={styles.wrapperInput}>
                <FormControl.Label style={styles.inputLabel}>
                  Verification Code
                </FormControl.Label>
                <Input
                  accessibilityLabel="Verification code"
                  value={values.code}
                  style={styles.inputStyle}
                  onChangeText={handleChange("code")}
                  onBlur={() => setFieldTouched("code")}
                  placeholder="code"
                  keyboardType="numeric"
                />
              </FormControl>
              {touched.code && errors.code && (
                <Text style={styles.errorText}>{errors.code}</Text>
              )}

              <TouchableOpacity
                style={isValid ? styles.confirm : styles.confirmDisabled}
                disabled={!isValid}
                onPress={
                  handleSubmit as unknown as (
                    event: GestureResponderEvent
                  ) => void
                }
              >
                <Text style={styles.textSignup}>Confirm</Text>
              </TouchableOpacity>
              <Button
                style={styles.resendButton}
                onPress={() => {
                  Auth.resendSignUp(userEmail);
                  AlertPopup({
                    title: "New code sent.",
                    message: `Please check email ${userEmail} for a new confirmation code`,
                    buttons: [
                      {
                        text: "OK",
                      },
                    ],
                  });
                }}
              >
                <Text>Resend Code</Text>
              </Button>
            </VStack>
          )}
        </Formik>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primaryColors.primary300,
  },
  errorText: {
    fontSize: 12,
    color: colors.textColors.errorText,
    alignSelf: "flex-start",
    height: 16,
  },
  projectName: {
    justifyContent: "center",
    padding: 24,
    fontSize: hp("3%"),
    textAlign: "center",
    fontWeight: "bold",
  },
  formContainer: {
    height: 400,
    width: "100%",
    padding: 24,
  },
  formTitle: {
    paddingBottom: 16,
    color: colors.textColors.white,
    fontSize: 20,
  },
  wrapperInputs: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    borderColor: "transparent",
  },
  wrapperInput: {
    marginTop: 4,
    marginBottom: 4,
  },
  inputLabel: {
    paddingTop: 12,
    fontSize: 12,
    color: colors.primaryColors.white,
  },
  inputStyle: {
    width: "100%",
    color: colors.textColors.white,
  },
  smallText: {
    fontSize: 12,
    color: colors.textColors.black,
  },
  smallTextGrey: {
    fontSize: 12,
    color: colors?.primaryColors.primary300,
  },
  textSignup: {
    color: colors?.textColors.white,
  },
  confirm: {
    alignItems: "center",
    backgroundColor: colors?.primaryColors.primary100,
    borderRadius: 4,
    justifyContent: "center",
    height: 40,
  },
  confirmDisabled: {
    alignItems: "center",
    backgroundColor: colors?.primaryColors.primary400,
    borderRadius: 4,
    justifyContent: "center",
    height: 40,
  },
  resendButton: {
    alignSelf: "center",
    marginTop: 20,
  },
});
