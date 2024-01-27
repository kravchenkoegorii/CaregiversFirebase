import { RAFirebaseOptions } from "react-admin-firebase";

export const providerOptions: RAFirebaseOptions = {
  renameMetaFields: {
    created_at: "createdAt", // default: 'createdate'
    created_by: "createdBy", // default: 'createdby'
    updated_at: "updatedAt", // default: 'lastupdate'
    updated_by: "updatedBy" // default: 'updatedby'
  },
  associateUsersById: true
};