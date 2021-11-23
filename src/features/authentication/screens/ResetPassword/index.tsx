import { Formik, FormikHelpers } from 'formik'
import { Form, Input, InputGroup, Item, Label, Text, View } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity, Platform, GestureResponderEvent } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { string, object, ref } from 'yup'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native'
import colors from 'constants/colors'
import routes from 'constants/routes'
import { AlertPopup } from 'common/components/Alert'
import { ValueForgotPasswordForm, ResetPasswordProps } from 'features/types'

export default function ResetPassword({ route }: ResetPasswordProps) {
  const navigation = useNavigation()
  const initialValues = { email: '', code: '', newPassword: '', confirmPassword: '' }
  const { email } = route.params
  const handleConfirmClick = async (
    values: ValueForgotPasswordForm,
    submitProps: FormikHelpers<ValueForgotPasswordForm>
  ) => {
    try {
      submitProps.setSubmitting(false)
      Auth.forgotPasswordSubmit(email, values.code, values.newPassword)
      navigation.navigate(routes.authentication.signIn.screen)
      submitProps.resetForm()
    } catch (error) {
      AlertPopup({
        title: 'Oops...',
        message: 'Your code is not correct',
        buttons: [{ text: 'Try again' }],
      })
    }
  }

  const validationSchema = object().shape({
    newPassword: string()
      .min(8, 'Password should be at least 8 chars.')
      .max(100, 'Password should not exceed 100 chars.')
      .required('Please, provide your password!'),
    confirmPassword: string()
      .oneOf([ref('newPassword'), undefined], 'Passwords must match')
      .min(8, 'Password should be at least 8 chars.')
      .max(30, 'Password should not excceed 30 chars.')
      .required('Confirm your password.'),
  })

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === 'ios'}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.appNameWrapper}>
            <Text style={styles.appName}>VALPAS</Text>
          </View>
          <Text style={styles.formTitle}>Forgot password</Text>
          <Formik initialValues={initialValues} onSubmit={handleConfirmClick} validationSchema={validationSchema}>
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <Form>
                <InputGroup style={styles.inputGroup}>
                  <Item floatingLabel style={styles.wrapperInput}>
                    <Label style={styles.inputLabel}>Code</Label>
                    <Input
                      label="Code"
                      accessibilityLabel="Code"
                      value={values.code}
                      style={styles.inputStyle}
                      onChangeText={handleChange('code')}
                      onBlur={() => setFieldTouched('code')}
                      placeholder="Code"
                      autoCapitalize="none"
                    />
                  </Item>
                  {touched.code && errors.code && <Text style={styles.errorText}>{errors.code}</Text>}
                  <Item floatingLabel style={styles.wrapperInput}>
                    <Label style={styles.inputLabel}>New Password</Label>
                    <Input
                      label="New Password"
                      accessibilityLabel="New Password"
                      value={values.newPassword}
                      style={styles.inputStyle}
                      onChangeText={handleChange('newPassword')}
                      onBlur={() => setFieldTouched('newPassword')}
                      placeholder="New Password"
                      autoCapitalize="none"
                      secureTextEntry
                    />
                  </Item>
                  {touched.newPassword && errors.newPassword && (
                    <Text style={styles.errorText}>{errors.newPassword}</Text>
                  )}
                  <Item floatingLabel style={styles.wrapperInput}>
                    <Label style={styles.inputLabel}>Confirm Password</Label>
                    <Input
                      label="Confirm Password"
                      accessibilityLabel="Confirm Password"
                      value={values.confirmPassword}
                      style={styles.inputStyle}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={() => setFieldTouched('confirmPassword')}
                      placeholder="Confirm Password"
                      autoCapitalize="none"
                      secureTextEntry
                    />
                  </Item>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                  )}
                </InputGroup>
                <TouchableOpacity
                  style={isValid ? styles.resetPass : styles.resetPassDisabled}
                  disabled={!isValid}
                  onPress={(handleSubmit as unknown) as (event: GestureResponderEvent) => void}
                >
                  <Text style={styles.textSubmit}>Submit</Text>
                </TouchableOpacity>
              </Form>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    backgroundColor: colors.primaryColors.primary300,
  },
  wrapper: {
    marginHorizontal: wp('7%'),
  },
  appNameWrapper: {
    marginTop: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  formTitle: {
    marginLeft: 5,
    marginTop: hp('6%'),
    fontSize: hp('2.5%'),
    color: colors.textColors.white,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginTop: hp('4%'),
    flexDirection: 'column',
    borderColor: 'transparent',
    marginBottom: hp('4%'),
  },
  wrapperInput: {
    marginVertical: 3,
  },
  inputLabel: {
    fontSize: hp('1.5%'),
    color: colors.primaryColors.primary500,
  },
  inputStyle: {
    color: colors.textColors.white,
  },
  errorText: {
    fontSize: 12,
    color: colors.textColors.errorText,
    alignSelf: 'flex-start',
    paddingTop: 2,
    height: 16,
    textDecorationLine: 'none',
  },
  textSubmit: {
    color: colors?.textColors.white,
  },
  resetPass: {
    alignItems: 'center',
    backgroundColor: colors?.primaryColors.primary100,
    borderRadius: 4,
    justifyContent: 'center',
    height: 40,
    marginTop: hp('4%'),
  },
  resetPassDisabled: {
    alignItems: 'center',
    backgroundColor: colors?.primaryColors.primary400,
    borderRadius: 4,
    justifyContent: 'center',
    height: 40,
  },
})
