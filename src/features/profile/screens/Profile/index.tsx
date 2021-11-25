import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";

import ProfileBio from "features/profile/components/ProfileBio";
import ProfileHeader from "features/profile/components/ProfileHeader";
import ProfileSetting from "features/profile/components/ProfileSetting";

const mockData = {
  name: "Katja Lairikko",
  email: "katja.lairikko@gmail.com",
  bioDesc:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  photoUrl: "https://ca.slack-edge.com/T7XMSNG7P-UDS8YKR0C-3b35c7f1755a-512",
  location: "Helsinki, Finland",
  futureShifts: [
    { time: "Thu 03.09 08.00-15.00", location: "Bronda Ravintola" },
    { time: "Fri 04.09 15.00-23.00", location: "Gaijin Ravintola" },
    { time: "Sat 05.09 16.00-00.00", location: "Löyly" },
  ],
  earnedIncome: "32339.00",
};

const Profile = () => {
  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <ScrollView>
        <View style={styles.container}>
          <ProfileHeader {...mockData} />
          <ProfileBio {...mockData} />
          <ProfileSetting />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  topNav: {
    marginTop: 20,
    alignSelf: "flex-start",
    padding: "7%",
  },
});

export default Profile;
