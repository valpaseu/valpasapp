import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { DataStore } from "aws-amplify";
import { TimeEntry, UserCredentials } from "../../../../models";

const date = new Date();

const ActiveWork = () => {
  const [timeWork, setTimeWork] = useState(false);
  const [work, setWork] = useState([]);
  const [user, setUser] = useState([]);
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [test, setTest] = useState(null);

  const worksDB = async () => {
    const userr = await DataStore.query(UserCredentials);
    if (userr[0].activeTimeEntry !== null) {
      const activeTime = await DataStore.query(
        TimeEntry,
        userr[0].activeTimeEntry
      );
      if (activeTime !== undefined) {
        if (activeTime.isActive) {
          const q = [];
          q.push(activeTime);
          setWork(q);
          setTimeWork(true);
        }
      }
    }
  };
  if (work.length === 0) worksDB();

  const userDB = async () => {
    const userr = await DataStore.query(UserCredentials);
    setUser(userr[0]);
  };
  if (user.length === 0) userDB();

  useEffect(() => {
    let isCancelled = false;

    const advanceTime = () => {
      setTimeout(() => {
        if (work.length !== 0) {
          const datee = new Date();
          const subDate = new Date(
            datee - new Date(work[0].timeInterval.start)
          );
          setTimer({
            seconds: subDate.getSeconds(),
            minutes: subDate.getMinutes(),
            hours: subDate.getHours() - 2,
          });
        }
      }, 1000);
    };
    advanceTime();

    return () => {
      isCancelled = true;
    };
  }, [timer]);

  if (work !== null && user.length !== 0 && timeWork) {
    return (
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <View style={{}}>
          <Text>Work</Text>
          <Text>
            {timer.hours}:{timer.minutes}:{timer.seconds}
          </Text>
        </View>
        {work[0].description != "" ? (
          <Text>{work[0].description}</Text>
        ) : (
          <Text>Without description</Text>
        )}
        <Text
          onPress={async () => {
            const qqq = new Date();
            await DataStore.save(
              TimeEntry.copyOf(work[0], (updated) => {
                updated.timeInterval.end = qqq.toISOString();
                updated.isActive = false;
              })
            );
            //await DataStore.delete(TimeEntry, work[0].id);
            setTimeWork(false);
          }}
        >
          Stop
        </Text>
      </View>
    );
  } else return <View></View>;
};

export default ActiveWork;
