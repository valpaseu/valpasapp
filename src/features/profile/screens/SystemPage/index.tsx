import { Button, View } from "react-native";
import React from "react";
import { DataStore, Cache, Hub } from "aws-amplify";
import { User } from "models";

const SystemPage = () => {
  return (
    <View>
      <Button
        title="ddd"
        onPress={async () => {
          /*const authUser = await Auth.currentAuthenticatedUser();
          await Auth.updateUserAttributes(authUser, {name: "Oleksii", email: "alexey.kovbel@gmail.com"})*/
        }}
      />
      <Button title="log" onPress={async () => {}} />
    </View>
  );
};

export default SystemPage;
