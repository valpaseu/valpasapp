import React, { FC, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { ProfileBioProps } from "features/types";
import colors from "../../../../constants/colors";
import size from "../../../../constants/size";
import { Auth } from "aws-amplify";

const ProfileBio: FC<ProfileBioProps> = (q) => {
  const [user, setUser] = useState([]);
  const [loaded, setLoaded] = useState(false);
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
      <Text style={styles.title}>BIO</Text>
      
      {loaded ? (
        <Text style={styles.description}>{user.attributes["custom:bio"]}</Text>
      ) : (
        <Text style={styles.description}>loading</Text>
      )}
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
    fontSize: size.profile.bioTitle,
    fontWeight: "500",
    paddingBottom: "3%",
    letterSpacing: 1.5,
  },
  description: {
    fontFamily: "SourceSansPro-regular",
    color: colors.primaryColors.primary300,
    textAlign: "justify",
    fontSize: size.profile.bioDesc,
    lineHeight: 18,
    letterSpacing: 1.2,
  },
});

export default ProfileBio;
