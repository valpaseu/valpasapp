import AsyncStorage from "@react-native-async-storage/async-storage";

const gettingStartedKey = "show getting started screen";

export async function checkFirstLaunch(
  setFirstLaunch: React.Dispatch<React.SetStateAction<boolean>>
) {
  await AsyncStorage.getItem(gettingStartedKey, (err, result) => {
    if (err)
      console.log("error occurs checkFirstLaunch gettingStarted service");
    if (!result) {
      setFirstLaunch(true);
    }
  });
}

export function disableGettingStartedScreen() {
  AsyncStorage.setItem(gettingStartedKey, "done")
  syncForm()
}

const syncForm = async () => {
  await AsyncStorage.getAllKeys((err, result) => {
      if (err) {
          console.log(err);
      } else console.log(result);
  })
};

export async function enableGettingStartedScreen() {
  await AsyncStorage.removeItem(gettingStartedKey);
}
