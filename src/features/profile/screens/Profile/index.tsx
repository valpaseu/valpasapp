import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  AppState,
} from "react-native";

import ProfileBio from "features/profile/components/ProfileBio";
import ProfileHeader from "features/profile/components/ProfileHeader";
import ProfileSetting from "features/profile/components/ProfileSetting";
import { Hub } from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";

const Profile = () => {
  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <ScrollView>
        <View style={styles.container}>
          <ProfileHeader />
          <ProfileBio />
          <ProfileSetting />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
  },
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});

export default Profile;
