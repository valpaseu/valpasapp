import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import React from "react";

export default function SignInForm() {

  return (
    <Formik
      initialValues={{ Address: "" }}
      onSubmit={(values) => console.log(values)}
    ></Formik>
  );
}
