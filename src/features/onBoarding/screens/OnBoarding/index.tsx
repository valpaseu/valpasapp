import Auth from "@aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { useNavigation } from "@react-navigation/native";
import { OnBoardingForm, UserDatabase } from "models";
import React, { useEffect, useState } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";

const OnBoarding = () => {
  const [loading, setLoading] = useState(true);

  const [data, updateList] = useState([]);
  const [user, setUser] = useState([]);
  const [buttons, setButtons] = useState([]);

  const test = async () => {
    try {
      const models = await DataStore.query(OnBoardingForm);
      const users = await DataStore.query(UserDatabase);
      const currentUser = await Auth.currentUserInfo();
      const userq = users.find((e) => e.email === currentUser.attributes.email);

      const q = [];
      var t = "";
      for (let i = 0; i < models.length; i++) {
        if (userq.formChecked.includes(models[i].title)) {
          t = "Readed";
        } else {
          t = "UnReaded";
        }
        q.push({ name: models[i].title, status: t });
      }

      setUser(userq);
      updateList(models);
      setButtons(q);
    } catch (error) {
      console.log(error);
    }
  };

  const changeButtonState = async (title) => {
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].name === title) {
        if (buttons[i].status !== "Readed") {
          buttons.splice(i, 1);
          buttons.push({ name: title, status: "Readed" });
          try {
            await DataStore.save(
              UserDatabase.copyOf(user, (updated) => {
                updated.formChecked.push(title);
              })
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    setButtons(buttons);
  };

  if (data.length === 0) {
    test();
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={{ fontSize: 16 }}>{title.name}</Text>
      <Text style={{ fontSize: 12, marginTop: 6 }}>{title.text}</Text>
    </View>
  );
  if (!loading) {
    return (
      <View>
        <TouchableOpacity
          onPress={async () => {
            console.log(await Auth.currentUserInfo());
          }}
        >
          <Text>Test Button</Text>
        </TouchableOpacity>
        <SectionList
          sections={data}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                }}
              >
                <TouchableOpacity onPress={() => console.log(user)}>
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sectionHeader}
                  onPress={() => changeButtonState(section.title)}
                >
                  <Text style={{ fontSize: 12, padding: 1 }}>
                    {buttons.find((b) => b.name === section.title).status}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  } else {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    width: 300,
    margin: 15,
  },
  sectionHeader: {
    padding: 15,
    fontSize: 14,
    fontWeight: "400",
  },
});

export default OnBoarding;
