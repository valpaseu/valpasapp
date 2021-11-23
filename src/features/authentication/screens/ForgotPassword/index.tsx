import { Formik, FormikHelpers } from 'formik'
import { Form, Input, InputGroup, Item, Label, Text, View } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity, Platform, GestureResponderEvent } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { string, object } from 'yup'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Auth } from 'aws-amplify'

import colors from 'constants/colors'
import routes from 'constants/routes'
import { AlertPopup } from 'common/components/Alert'
import { EmailForgotPassword } from 'features/types'

export default function ForgotPassword() {
  const navigation = useNavigation()
  const initialValues = { email: '' }
  const handleSendCodeClick = async (values: EmailForgotPassword, submitProps: FormikHelpers<EmailForgotPassword>) => {
    try {
      submitProps.setSubmitting(false)
      await Auth.forgotPassword(values.email)
      navigation.navigate(routes.authentication.resetPassword.screen, { email: values.email })
      submitProps.resetForm()
    } catch (error) {
      AlertPopup({
        title: 'Oops...',
        message: error.message,
        buttons: [{ text: 'Try again' }],
      })
    }
  }

  const validationSchema = object().shape({
    email: string().email('Please provide the valid email').required('Please, provide your email!'),
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
          <Formik initialValues={initialValues} onSubmit={handleSendCodeClick} validationSchema={validationSchema}>
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <Form>
                <InputGroup style={styles.inputGroup}>
                  <Item floatingLabel style={styles.wrapperInput}>
                    <Label style={styles.inputLabel}>Email address</Label>
                    <Input
                      label="Email"
                      accessibilityLabel="Email address"
                      value={values.email}
                      style={styles.inputStyle}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      placeholder="Email"
                      autoCapitalize="none"
                    />
                  </Item>
                  {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </InputGroup>
                <TouchableOpacity
                  style={isValid ? styles.forgotPass : styles.forgotPassDisabled}
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
  forgotPass: {
    alignItems: 'center',
    backgroundColor: colors?.primaryColors.primary100,
    borderRadius: 4,
    justifyContent: 'center',
    height: 40,
    marginTop: hp('4%'),
  },
  forgotPassDisabled: {
    alignItems: 'center',
    backgroundColor: colors?.primaryColors.primary400,
    borderRadius: 4,
    justifyContent: 'center',
    height: 40,
  },
})
