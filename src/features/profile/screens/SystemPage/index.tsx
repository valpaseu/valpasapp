import { Button, View } from "react-native";
import React from "react";
import { DataStore, Cache, Hub, Auth } from "aws-amplify";
import { User } from "models";

const SystemPage = () => {
  return (
    <View>
      <Button
        title="ddd"
        onPress={async () => {
          
          const authUser = await Auth.currentAuthenticatedUser();
          console.log(authUser.attributes);
          
        }}
      />
      <Button title="log" onPress={async () => {}} />
    </View>
  );
};

export default SystemPage;
