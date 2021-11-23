import { MaterialIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import { VStack, Input, Button, FormControl, View, Text } from 'native-base'
import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { string, object } from 'yup'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import colors from 'constants/colors'

const initialValues = {
  name: '',
  password: '',
}

const onSubmit = () => {
  console.log('Submited')
}

const validationSchema = object().shape({
  name: string()
    .min(4, 'Name must be at least 4 characters')
    .max(30, 'Name should not excceed 30 chars.')
    .required('Please, provide your username!'),
  password: string()
    .min(8, 'Password should be at least 8 chars.')
    .max(30, 'Password should not excceed 30 chars.')
    .required('Please, provide your password!'),
})

export default function ApplicantSignIn() {
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === 'ios'}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <MaterialIcons style={styles.titleIcon} name="person-outline" size={24} color="black" />
            <Text style={styles.titleText}>Applicant</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>
              Please log in with the username and password sent to your email address.
            </Text>
          </View>
          <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {({ values, handleChange, errors, setFieldTouched, touched }) => (
              <VStack>
                <FormControl style={styles.wrapperInput}>
                  <FormControl.Label>Username</FormControl.Label>
                  <Input
                    accessibilityLabel="User Name"
                    value={values.name}
                    style={styles.inputStyle}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    placeholder="Name"
                  />
                </FormControl>
                {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                <FormControl style={styles.wrapperInput}>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    accessibilityLabel="Password"
                    value={values.password}
                    style={styles.inputStyle}
                    onChangeText={handleChange('password')}
                    placeholder="Password"
                    onBlur={() => setFieldTouched('password')}
                    secureTextEntry
                  />
                </FormControl>
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                <Button style={styles.button}>
                  <Text style={styles.buttonText}>Send</Text>
                </Button>
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
  },
  wrapper: {
    marginHorizontal: wp('7%'),
    marginTop: hp('15%'),
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    fontSize: hp('3.7%'),
    marginRight: 10,
    color: colors.textColors.applicantText,
  },
  titleText: {
    fontSize: hp('3%'),
    color: colors.textColors.applicantText,
  },
  subTitle: {
    fontSize: hp('1.5%'),
    color: colors.textColors.applicantText,
    marginTop: 23,
  },
  errorText: {
    fontSize: 12,
    color: colors.primaryColors.errorRed,
    alignSelf: 'flex-start',
    paddingTop: 5,
    height: 25,
    textDecorationLine: 'none',
  },
  inputGroup: {
    marginTop: hp('3%'),
    flexDirection: 'column',
    borderColor: 'transparent',
  },
  wrapperInput: {
    marginVertical: 3,
  },
  inputLabel: {
    fontSize: hp('1.5%'),
    color: colors.textColors.applicantText,
  },
  inputStyle: {
    width: '100%',
    color: colors.textColors.applicantText,
  },
  button: {
    marginTop: hp('5%'),
  },
  buttonText: {
    color: colors.textColors.white,
  },
})
