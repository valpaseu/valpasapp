import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";
import { View } from "native-base";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import routes from "../../../../constants/routes";
import colors from "../../../../constants/colors";
import { TimeEntry, UserCredentials, AllWorkSpaces } from "../../../../models";
import { DataStore } from "aws-amplify";
import DropDownPicker from "react-native-dropdown-picker";
import { Modalize } from "react-native-modalize";

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
  const [hide, setHide] = useState(false);
  const [height, setHeight] = useState("82%");
  const [timeWork, setTimeWork] = useState(false);
  const [activeWork, setActiveWork] = useState([]);
  const [user, setUser] = useState([]);
  const [update, setUpdate] = useState(0);
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      setList([]);
      dbList();
      dbItem();
      setValue(null);
    });
  }, []);

  const modalizeRef = useRef<Modalize>(null);

  const dbWork = async () => {
    const w = await DataStore.query(AllWorkSpaces);
    if (w.length !== 0) setWork(w);
    else setStopCheckWork(true);
  };
  if (work.length === 0 && !stopCheckWork) dbWork();

  const dbList = async () => {
    const w = await DataStore.query(TimeEntry);
    if (w.length !== 0) {
      setList(w);
    } else setStopCheckList(true);
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

  const userDB = async () => {
    const userr = await DataStore.query(UserCredentials);
    setUser(userr[0]);
  };

  const worksDB = async () => {
    const userr = await DataStore.query(UserCredentials);
    if (userr[0].activeTimeEntry !== null) {
      const activeTime = await DataStore.query(
        TimeEntry,
        userr[0].activeTimeEntry
      );
      if (activeTime !== undefined) {
        if (activeTime.isActive) {
          setTimeWork(true);
          const q = [];
          q.push(activeTime);
          setActiveWork(q);
        }
      }
    }
  };

  useEffect(() => {
    if (!timeWork) {
      setHeight("82%");
      setHide(false);
    }
    setTimeout(() => {
      if (timeWork) {
        setHide(true);
        setHeight("65%");
        let dateActivator = new Date();
        let subDate = new Date(
          dateActivator - new Date(activeWork[0].timeInterval.start)
        );
        setTimer({
          seconds: subDate.getSeconds(),
          minutes: subDate.getMinutes(),
          hours: subDate.getHours() - 2,
        });
      }
      let q = update;
      q++;
      setUpdate(q);
      if (activeWork.length === 0) worksDB();
      if (user.length === 0) userDB();
    }, 1000);
  }, [update]);

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

  if (list.length !== 0 && items.length !== 0 && work.length !== 0) {
    return (
      <SafeAreaView>
        <DropDownPicker
          style={{ borderRadius: 5, top: 5 }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        {activeWork.length !== 0 && user.length !== 0 && timeWork ? (
          <View style={{ paddingBottom: 5 }}>
            <View style={styles.currentlyRun}>
              <Text style={styles.textMain}>Currently running</Text>
            </View>
            <View style={styles.element}>
              <View style={styles.spaces}>
                <Text style={styles.textMain}>Work</Text>
                <Text style={styles.textMain}>
                  {timer.hours}:{String("0" + timer.minutes).slice(-2)}:
                  {String("0" + timer.seconds).slice(-2)}
                </Text>
              </View>
              {activeWork[0].description != "" ? (
                <Text style={styles.textMain}>{activeWork[0].description}</Text>
              ) : (
                <Text style={styles.textMain}>Without description</Text>
              )}
              <Text
                style={styles.textMain}
                onPress={async () => {
                  try {
                    const qqq = new Date();
                    await DataStore.save(
                      TimeEntry.copyOf(activeWork[0], (updated) => {
                        updated.timeInterval.end = qqq.toISOString();
                        updated.isActive = false;
                      })
                    );
                    setTimeWork(false);
                    setActiveWork([]);
                    setUser([]);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Stop
              </Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}
        <ScrollView
          style={{
            padding: leftandright,
            height: hp(height),
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {list
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((data) => {
              if (
                (data.workspaceId === value || value === null) &&
                !data.isActive
              ) {
                const dateEro = new Date(Date.parse(data?.timeInterval?.end) - Date.parse(data?.timeInterval?.start))
                return (
                  <View style={{ marginTop: 0, marginBottom: 5 }}>
                    <View style={styles.timeEntryDate}>
                      <Text style={styles.textMain}>
                        {new Date(data.timeInterval.start).toDateString()}
                      </Text>
                    </View>

                    <View style={styles.timeElement}>
                      <View style={styles.firmName}>
                        {work.length != 0 && data.workspaceId != null ? (
                          <Text style={styles.textMain}>
                            {work.find((w) => w.id === data.workspaceId).name}
                          </Text>
                        ) : (
                          <Text style={styles.textMain}>Without work</Text>
                        )}
                        <View
                          style={{
                            width: 80,
                            justifyContent: "space-between",
                            flexDirection: "row",
                          }}
                        >
                          <Text style={styles.textMain}>
                            {dateEro.getUTCHours()}:{String("0" + dateEro.getUTCMinutes()).slice(-2)}:{String("0" + dateEro.getUTCSeconds()).slice(-2)}
                          </Text>
                          <Icon
                            as={FontAwesome}
                            name="ellipsis-h"
                            size="4"
                            onPress={() => {
                              modalizeRef.current?.open();
                              setCurrentTime(data.id);
                            }}
                          />
                        </View>
                      </View>
                      {data.billable == true ? (
                        <Text style={styles.textMain}>Paid</Text>
                      ) : (
                        <Text style={styles.textMain}>UnPaid</Text>
                      )}
                      {data.description != "" ? (
                        <Text style={styles.textMain}>{data.description}</Text>
                      ) : (
                        <Text style={styles.textMain}>Without description</Text>
                      )}
                    </View>
                  </View>
                );
              }
            })}
        </ScrollView>
        {!hide ? (
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
        ) : (
          <View></View>
        )}
        <Modalize ref={modalizeRef} adjustToContentHeight={true}>
          <RenderContent />
        </Modalize>
      </SafeAreaView>
    );
  } else
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.textMain}>Loading</Text>
      </View>
    );
};

const leftandright = Dimensions.get("screen").width * 0.02;

const styles = StyleSheet.create({
  textMain: { fontFamily: "SourceSansPro-regular", fontSize: 14 },
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
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: "SourceSansPro-regular",
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
  element: {
    backgroundColor: "white",
    padding: 15,
    paddingRight: 55,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  spaces: { flexDirection: "row", justifyContent: "space-between" },
  currentlyRun: {
    padding: 15,
  },
});

export default PositionList;
