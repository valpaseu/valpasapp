import { Button, View } from "react-native";
import React from "react";
import { Auth, DataStore } from "aws-amplify";
import { UserDatabase } from "models";

const SystemPage = () => {
  return (
    <View>
      <Button
        title="ddd"
        onPress={async () => {
          const authUser = await Auth.currentUserInfo();
          await DataStore.save(
            new UserDatabase({
              username: "Lorem ipsum dolor sit amet",
              email: "Lorem ipsum dolor sit amet",
              times: [],
              formChecked: [],
              address: "Lorem ipsum dolor sit amet",
              bio: "Lorem ipsum dolor sit amet",
              location: "Lorem ipsum dolor sit amet",
              name: "Lorem ipsum dolor sit amet",
              owner: authUser.username,
            })
          );
        }}
      />
    </View>
  );
};

export default SystemPage;
