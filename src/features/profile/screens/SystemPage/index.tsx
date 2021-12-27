import { Button, View } from "react-native";
import React from "react";
import { DataStore, Cache, Hub, Auth } from "aws-amplify";
import { User } from "models";
import axios from "axios";

const key =
  process.env.CLOCKIFY_API_KEY ||
  "OWFmOWUxNDItOWVkNy00YjYwLWIzYzAtMTk4Yzg4ZDAxMjY3";
const url = `https://api.clockify.me/api/v1`;

const SystemPage = () => {
  return (
    <View>
      <Button
        title="log"
        onPress={async () => {
          const axiosResponse = await axios.get(`${url}/user`, {
            headers: {
              "X-Api-Key": key,
            },
          });
          console.log(axiosResponse.data);
        }}
      />
    </View>
  );
};

export default SystemPage;
