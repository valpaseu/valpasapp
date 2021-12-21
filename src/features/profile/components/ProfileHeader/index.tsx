import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { ProfileHeaderProps } from "features/types";
import colors from "constants/colors";
import sizes from "constants/size";
import { DataStore } from "@aws-amplify/datastore";
import Auth from "@aws-amplify/auth";
import { UserDatabase } from "models";

const ProfileHeader: FC<ProfileHeaderProps> = ({ photoUrl }) => {
  const [user, setUser] = useState([]);
  setTimeout(async () => {
    if (user.length === 0) {
      const userAuth = await Auth.currentUserInfo();
      setUser(userAuth.attributes);
    }
  }, 100);

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{}} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.subtitle}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: colors.primaryColors.white,
    borderRadius: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 1000,
    borderWidth: 1.5,
    borderColor: colors.primaryColors.primary300,
    position: "absolute",
    top: "-12%",
  },
  name: {
    fontFamily: "SourceSansPro-semiBold",
    marginTop: "25%",
    paddingVertical: "2%",
    color: colors.primaryColors.primary200,
    fontSize: sizes.profile.nameText,
    fontWeight: "500",
    letterSpacing: 2,
  },
  subtitle: {
    fontFamily: "SourceSansPro-regular",
    color: colors.primaryColors.primary200,
    fontSize: sizes.profile.subtitle,
    letterSpacing: 1.5,
    paddingBottom: "10%",
  },
});

export default ProfileHeader;
