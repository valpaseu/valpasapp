import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { FormControl, Input, VStack } from "native-base";
import React from "react";
import { View } from "react-native";

export default function CreateProfile() {
  const navigation = useNavigation();

  const initialValues = {
    name: "alexey.kovbel@gmail.com",
    password: "Alexeyy101",
  };

  const onSubmit = async () => {};

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <VStack>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={() => setFieldTouched("name")}
              placeholder="Name"
            />
          </FormControl>
        </VStack>
      </Formik>
    </View>
  );
}
