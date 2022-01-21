import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { ProfileHeaderProps } from "features/types";
import colors from "../../../../constants/colors";
import sizes from "../../../../constants/size";
import Auth from "@aws-amplify/auth";

const ProfileHeader: FC<ProfileHeaderProps> = () => {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const DBProfile = async () => {
    const userr = await Auth.currentUserInfo();
    if (user.length === 0 || user.username !== user.username) {
      setUser(userr);
      setLoaded(true);
    }
  };
  DBProfile();
  
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{}} />
      {loaded ? (
        <Text style={styles.name}>{user.attributes.name}</Text>
      ) : (
        <Text style={styles.name}>loading</Text>
      )}
      {loaded ? (
        <Text style={styles.subtitle}>{user.attributes.email}</Text>
      ) : (
        <Text style={styles.subtitle}>loading</Text>
      )}
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
