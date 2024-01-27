import { FirebaseAuthProvider } from "react-admin-firebase";
import { DataProviderResources } from "../../abstracts/enums";
import { firebaseConfig } from "../firebase";
import { firebaseDataProvider } from "./data-provider";
import { providerOptions } from "./options";

export const firebaseAuthProvider = FirebaseAuthProvider(firebaseConfig, providerOptions);

firebaseAuthProvider.getPermissions = async (): Promise<string> => {
  const user = await firebaseAuthProvider.getAuthUser();

  if (!user) {
    return null;
  }

  const userData = await firebaseDataProvider.getOne(DataProviderResources.USERS, {id: user.uid});

  return userData.data.role;
};