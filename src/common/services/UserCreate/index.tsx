import { Auth, DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";

const userCreate = async () => {
  const userAuth = await Auth.currentAuthenticatedUser();
  const user = await DataStore.query(UserCredentials);

  const add = async () => {
    try {
      await DataStore.save(
        new UserCredentials({
          username: userAuth.username,
          formChecked: [],
          email: userAuth.attributes.email,
          memberships: [],
          name: userAuth.attributes.name,
          activeTimeEntry: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
          profilePicture: "http://undefined.name",
          settings: {
            timeFormat: "",
            timeZone: "",
            dateFormat: "",
          },
          status: "ACTIVE",
          defaultWorkspace: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (user.length === 0) add();
};

export default userCreate;
