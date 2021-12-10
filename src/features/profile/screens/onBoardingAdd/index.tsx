import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  View,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Form, UserDatabase } from "models";
import Auth from "@aws-amplify/auth";
import { Formik } from "formik";
import { object, string } from "yup";

const OnBoardingAdd = () => {
  const [addTitleCheck, setTitleCheck] = React.useState("");

  const [addTextCheck, setTextCheck] = React.useState("");
  const [addTextTitleCheck, setTextTitleCheck] = React.useState("");

  const log = async () => {
    const formd = await DataStore.query(Form);
    console.log(formd);
  };

  const addTitle = async (val, fin) => {
    if (fin.data.find((n) => n.name === val.dataName) === undefined) {
      await DataStore.save(
        Form.copyOf(fin, (updated) => {
          updated.data.push({
            name: val.dataName,
            text: val.dataText,
          });
        })
      );
    } else if (fin.data.find((n) => n.name === val.dataName)) {
      for (let i = 0; i < fin.data.length; i++) {
        if (fin.data[i].name === val.dataName) {
          try {
            await DataStore.save(
              Form.copyOf(fin, (updated) => {
                updated.data.splice(i, 1);
              })
            );
          } catch (error) {
            console.log(error);
          }
          
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <Formik
        initialValues={{ title: "", dataName: "", dataText: "" }}
        onSubmit={async (values) => {
          const forms = await DataStore.query(Form);
          const finder = forms.find(
            (findedForm) => findedForm.title === values.title
          );
          if (
            finder === undefined &&
            values.title !== "" &&
            values.dataName !== "" &&
            values.dataText !== ""
          ) {
            await DataStore.save(
              new Form({
                title: values.title,
                data: [
                  {
                    name: values.dataName,
                    text: values.dataText,
                  },
                ],
              })
            );
          } else if (finder !== undefined) {
            addTitle(values, finder);
          } else console.log("Something empty");
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View style={styles.block}>
              <Text style={styles.title}>Chapter</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                placeholder="Chapter"
              />
            </View>
            <View style={styles.block}>
              <Text style={styles.title}>Title</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("dataName")}
                onBlur={handleBlur("dataName")}
                value={values.dataName}
                placeholder="Title"
              />
            </View>
            <View style={styles.block}>
              <Text style={styles.title}>"Read more" text</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("dataText")}
                onBlur={handleBlur("dataText")}
                value={values.dataText}
                placeholder="Read more text"
              />
            </View>
            <Button onPress={handleSubmit} title="Submit" />
            <Button onPress={log} title="logs" />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    borderWidth: 3,
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
  },
  input: {
    padding: 5,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 2,
  },
  button: {
    marginTop: 5,
    marginRight: 40,
    marginLeft: 40,
    backgroundColor: "#00adef",
    borderRadius: 10,
  },
});

export default OnBoardingAdd;
