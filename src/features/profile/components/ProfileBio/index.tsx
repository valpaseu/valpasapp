import React, { FC, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { UserDatabase } from "models";

import { ProfileBioProps } from "features/types";
import colors from "constants/colors";
import sizes from "constants/size";
import { Auth } from "aws-amplify";

const ProfileBio: FC<ProfileBioProps> = () => {
  const [bio, setBio] = useState("");

  const takeBio = async () => {
    const userPool = await Auth.currentUserInfo()    
    setBio(userPool.attributes["custom:bio"])
  }

  if (bio === "") takeBio()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BIO</Text>
      <Text style={styles.description}>{bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: "5%",
    width: "90%",
    padding: "5%",
    backgroundColor: colors.primaryColors.white,
    borderRadius: 15,
  },
  title: {
    color: colors.primaryColors.primary300,
    fontSize: sizes.profile.bioTitle,
    fontWeight: "500",
    paddingBottom: "3%",
    letterSpacing: 1.5,
  },
  description: {
    color: colors.primaryColors.primary300,
    textAlign: "justify",
    fontSize: sizes.profile.bioDesc,
    lineHeight: 18,
    letterSpacing: 1.2,
  },
});

export default ProfileBio;
