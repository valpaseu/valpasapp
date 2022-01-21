import React, { useState } from "react";
import { Text, View } from "react-native";
import { DataStore } from "aws-amplify";
import { TimeEntry, UserCredentials } from "../../../../models";
import { useEffect } from "react";

const date = new Date();

const ActiveWork = () => {
  const [time, setTime] = useState([]);
  const [user, setUser] = useState([]);
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const timeDB = async () => {
    const user = await DataStore.query(UserCredentials);
    const activeTime = await DataStore.query(
      TimeEntry,
      user[0].activeWorkspace
    );
    setTime(activeTime);
  };
  if (time.length === 0) timeDB();

  const userDB = async () => {
    const user = await DataStore.query(UserCredentials);
    setUser(user[0]);
  };
  if (user.length === 0) userDB();

  useEffect(() => {
    let isCancelled = false;

    const advanceTime = () => {
      setTimeout(() => {
        let nSeconds = timer.seconds;
        let nMinutes = timer.minutes;
        let nHours = timer.hours;

        nSeconds++;

        if (nSeconds > 59) {
          nMinutes++;
          nSeconds = 0;
        }
        if (nMinutes > 59) {
          nHours++;
          nMinutes = 0;
        }
        if (nHours > 24) {
          nHours = 0;
        }

        setTimer({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };
    advanceTime();

    return () => {
      //final time:
      console.log(timer);
      isCancelled = true;
    };
  }, [timer]);

  return (
    <View style={{ backgroundColor: "white", padding: 15 }}>
      <View style={{}}>
        <Text>Work</Text>
        <Text>{timer.hours}:{timer.minutes}:{timer.seconds}</Text>
      </View>
      {time.description != "" ? (
        <Text>{time.description}</Text>
      ) : (
        <Text>Without description</Text>
      )}
      <Text>Stop</Text>
    </View>
  );
};

export default ActiveWork;
