import { Formik, FormikHelpers } from 'formik'
import { VStack, Input, InputGroup, FormControl, Text, View } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity, Platform, GestureResponderEvent } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { string, object } from 'yup'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Auth } from 'aws-amplify'
import * as Sentry from 'sentry-expo'

import colors from 'constants/colors'
import routes from 'constants/routes'
import { AlertPopup } from 'common/components/Alert'
import { IRoute } from 'features/types'

type ValueCompleteNewPasswordForm = {
  newPassword: string
  confirmNewPassword: string
}

interface ICompleteNewPassword extends IRoute {
  params: {
    authUser: any
  }
}

export default function CompleteNewPassword() {
  const navigation = useNavigation()
  const route: ICompleteNewPassword = useRoute()
  const { authUser } = route.params

  const initialValues = { newPassword: '', confirmNewPassword: '' }

  const onSubmit = async (
    values: ValueCompleteNewPasswordForm,
    submitProps: FormikHelpers<ValueCompleteNewPasswordForm>
  ) => {
    try {
      submitProps.setSubmitting(false)

      await Auth.completeNewPassword(authUser, values.newPassword)
      navigation.navigate(routes.mainScreens.stack, { screen: routes.mainScreens.home.screen })

      submitProps.resetForm()
    } catch (error) {
      Sentry.Native.captureException(error)
      AlertPopup({
        title: 'Oops...',
        message: 'Something went wrong',
        buttons: [{ text: 'Try again' }],
      })
    }
  }

  const validationSchema = object().shape({
    newPassword: string()
      .min(8, 'Password should be at least 8 chars.')
      .max(30, 'Password should not exceed 30 chars.')
      .required('Password if required'),
    confirmNewPassword: string()
      .min(8, 'Password should be at least 8 chars.')
      .max(30, 'Password should not exceed 30 chars.')
      .required('Confirm your new password.')
      .test('passwords-match', 'Password does not match', function (value) {
        // eslint-disable-next-line react/no-this-in-sfc
        return this.parent.newPassword === value
      }),
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
          <Text style={styles.formTitle}>Change password</Text>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <VStack>
                <InputGroup style={styles.inputGroup}>
                  <FormControl floatingLabel style={styles.wrapperInput}>
                    <FormControl.Label style={styles.inputLabel}>New password</FormControl.Label>
                    <Input
                      label="New password"
                      accessibilityLabel="New password"
                      value={values.newPassword}
                      style={styles.inputStyle}
                      onChangeText={handleChange('newPassword')}
                      onBlur={() => setFieldTouched('newPassword')}
                      placeholder="New password"
                      secureTextEntry
                      autoCapitalize="none"
                    />
                  </FormControl>
                  {touched.newPassword && errors.newPassword && (
                    <Text style={styles.errorText}>{errors.newPassword}</Text>
                  )}
                  <FormControl floatingLabel style={styles.wrapperInput}>
                    <FormControl.Label style={styles.inputLabel}>Confirm new password</FormControl.Label>
                    <Input
                      label="Confirm new password"
                      accessibilityLabel="Confirm new password"
                      value={values.confirmNewPassword}
                      style={styles.inputStyle}
                      onChangeText={handleChange('confirmNewPassword')}
                      placeholder="Confirm new password"
                      onBlur={() => setFieldTouched('confirmNewPassword')}
                      secureTextEntry
                      autoCapitalize="none"
                    />
                  </FormControl>
                  {touched.confirmNewPassword && errors.confirmNewPassword && (
                    <Text style={styles.errorText}>{errors.confirmNewPassword}</Text>
                  )}
                </InputGroup>
                <TouchableOpacity
                  style={isValid ? styles.submitBtn : styles.submitBtnDisabled}
                  disabled={!isValid}
                  onPress={(handleSubmit as unknown) as (event: GestureResponderEvent) => void}
                >
                  <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
              </VStack>
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
  submitBtnText: {
    color: colors?.textColors.white,
  },
  submitBtn: {
    alignItems: 'center',
    backgroundColor: colors?.primaryColors.primary100,
    borderRadius: 4,
    justifyContent: 'center',
    height: 40,
    marginTop: hp('3.5%'),
  },
  submitBtnDisabled: {
    alignItems: 'center',
    backgroundColor: colors?.primaryColors.primary400,
    borderRadius: 4,
    justifyContent: 'center',
    height: 40,
    marginTop: hp('3.5%'),
  },
})
