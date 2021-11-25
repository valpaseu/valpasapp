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
  AsyncStorage.setItem(gettingStartedKey, "done");
}

export async function enableGettingStartedScreen() {
  await AsyncStorage.removeItem(gettingStartedKey);
}
/*const syncForm = async () => {
  await AsyncStorage.getAllKeys(async (err, result) => {
    if (!err) {
      const dataStoreCache = result?.filter((res) =>
        res.startsWith("@AmplifyDatastore:")
      );
      for (let i = 0; i < dataStoreCache.length; i++) {
        await AsyncStorage.removeItem(dataStoreCache[i]),
          (err) => {
            console.log(err);
          };
      }
    } else console.log(err);
  });
};*/
