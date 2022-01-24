import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { View } from "native-base";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import routes from "../../../../constants/routes";
import colors from "../../../../constants/colors";
import { TimeEntry, UserCredentials, AllWorkSpaces } from "../../../../models";
import { Auth, DataStore } from "aws-amplify";
import DropDownPicker from "react-native-dropdown-picker";
import { Modalize } from "react-native-modalize";
import ActiveWork from "../../components/ActiveWork";

DataStore.start();

const PositionList = () => {
  const [list, setList] = useState([]);
  const navigation: any = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [work, setWork] = useState([]);
  const [stopCheckList, setStopCheckList] = useState(false);
  const [stopCheckItems, setStopCheckItems] = useState(false);
  const [stopCheckWork, setStopCheckWork] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  const modalizeRef = useRef<Modalize>(null);

  const dbWork = async () => {
    const w = await DataStore.query(AllWorkSpaces);
    if (w.length !== 0) setWork(w);
    else setStopCheckWork(true);
  };
  if (work.length === 0 && !stopCheckWork) dbWork();

  const dbList = async () => {
    const w = await DataStore.query(TimeEntry);
    if (w.length !== 0) setList(w);
    else setStopCheckList(true);
  };
  if (list.length === 0 && !stopCheckList) dbList();

  const dbItem = async () => {
    const w = await DataStore.query(AllWorkSpaces);
    if (w.length !== 0) {
      const q = [];
      for (let i = 0; i < w.length; i++) {
        q.push({ label: w[i].name, value: w[i].id });
      }
      setItems(q);
    } else setStopCheckItems(true);
  };
  if (items.length === 0 && !stopCheckItems) dbItem();

  const deleteTime = async () => {
    const timeToDelete = await DataStore.query(TimeEntry, currentTime);
    try {
      DataStore.delete(timeToDelete);
      setList([]);
      dbList();
      dbItem();
      setValue(null);
      modalizeRef.current?.close();
    } catch (error) {
      console.log(error);
    }
  };

  const RenderContent = () => (
    <View>
      <TouchableOpacity style={styles.subMenuIcon}>
        <Icon
          as={FontAwesome}
          name="edit"
          size="6"
          style={styles.subMenuIconSet}
        />
        <Text style={styles.subMenuText}>Edit</Text>
        <Text style={styles.subMenuText}>dont work</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subMenuIcon} onPress={deleteTime}>
        <Icon
          as={FontAwesome}
          name="trash"
          size="6"
          style={styles.subMenuIconSet}
        />
        <Text style={styles.subMenuText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView>
      {list.length == 0 && items.length == 0 && work.length == 0 ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      ) : (
        <View>
          <ActiveWork />
          <View style={styles.wrapperJobList}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setList([]);
                dbList();
                dbItem();
                setValue(null);
              }}
            >
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
            <DropDownPicker
              style={{ marginTop: 10, borderRadius: 5 }}
              containerStyle={{ borderWidth: 0, borderRadius: 5 }}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
            <ScrollView>
              {list.map((data) => {
                if (
                  (data.workspaceId === value || value === null) &&
                  !data.isActive
                ) {
                  return (
                    <View style={{ marginTop: 5, marginBottom: 5 }}>
                      <Text style={styles.timeEntryDate}>
                        {new Date(data.timeInterval.start).toDateString()}
                      </Text>
                      <View style={styles.timeElement}>
                        <View style={styles.firmName}>
                          {work.length != 0 && data.workspaceId != null ? (
                            <Text>
                              {work.find((w) => w.id === data.workspaceId).name}
                            </Text>
                          ) : (
                            <Text>Without work</Text>
                          )}

                          <Icon
                            as={FontAwesome}
                            name="ellipsis-h"
                            size="6"
                            onPress={() => {
                              modalizeRef.current?.open();
                              setCurrentTime(data.id);
                            }}
                          />
                        </View>
                        {data.billable == true ? (
                          <Text>Paid</Text>
                        ) : (
                          <Text>UnPaid</Text>
                        )}
                        {data.description != "" ? (
                          <Text>{data.description}</Text>
                        ) : (
                          <Text>Without description</Text>
                        )}
                        <Text>
                          Substant: {""}
                          {new Date(
                            new Date(data?.timeInterval?.end) -
                              new Date(data?.timeInterval?.start)
                          ).toLocaleTimeString("es-ES", {
                            timeZone: "Africa/Casablanca",
                          })}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate(
                routes.mainScreens.positions.positionAdd.screen,
                {
                  value,
                }
              )
            }
            style={styles.TouchableOpacityStyle}
          >
            <Icon
              as={FontAwesome}
              name="plus"
              size={6}
              color="white"
              style={{
                left: 2.5,
              }}
            />
          </TouchableOpacity>
          <Modalize ref={modalizeRef} adjustToContentHeight={true}>
            <RenderContent />
          </Modalize>
        </View>
      )}
    </SafeAreaView>
  );
};

const leftandright = Dimensions.get("screen").width * 0.02;

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  firmName: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeEntryDate: {
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 4,
  },
  viewScreen: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subMenuIcon: {
    flexDirection: "row",
    backgroundColor: colors.primaryColors.white,
    padding: 15,
    borderColor: colors.primaryColors.primary300,
    borderBottomWidth: 1,
  },
  subMenuIconSet: { marginLeft: 5, marginRight: 5 },
  subMenuText: {
    paddingTop: 3,
    paddingLeft: 10,
    fontSize: 16,
  },
  timeElement: {
    backgroundColor: colors.primaryColors.white,
    padding: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowColor: colors.primaryColors.primary700,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.textColors.white,
    fontFamily: "SourceSansPro-regular",
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primaryColors.syan,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 13,
    paddingRight: 13,
    borderRadius: 4,
    shadowColor: colors.primaryColors.primary200,
    shadowOpacity: 0.3,
  },
  wrapperJobList: {
    padding: leftandright + 5,
    height: hp("78%"),
  },
});

export default PositionList;
