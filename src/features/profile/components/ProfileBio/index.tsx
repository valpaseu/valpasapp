import React, { FC, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { UserDatabase } from "models";

import { ProfileBioProps } from "features/types";
import colors from "constants/colors";
import sizes from "constants/size";
import { Auth } from "aws-amplify";

const ProfileBio: FC<ProfileBioProps> = () => {

  const [user, setUser] = useState([]); 
  setTimeout(async () => {
    if (user.length === 0) {
      const userAuth = await Auth.currentUserInfo()
      setUser(userAuth.attributes)
    }
  }, 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BIO</Text>
      <Text style={styles.description}>{user["custom:bio"]}</Text>
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
    fontFamily: "SourceSansPro-semiBold",
    color: colors.primaryColors.primary300,
    fontSize: sizes.profile.bioTitle,
    fontWeight: "500",
    paddingBottom: "3%",
    letterSpacing: 1.5,
  },
  description: {
    fontFamily: "SourceSansPro-regular",
    color: colors.primaryColors.primary300,
    textAlign: "justify",
    fontSize: sizes.profile.bioDesc,
    lineHeight: 18,
    letterSpacing: 1.2,
  },
});

export default ProfileBio;
