import {
  collection, getCountFromServer,
  getDocs,
  limit,
  orderBy,
  OrderByDirection,
  query,
  startAfter,
  Timestamp,
  where,
  Query
} from "firebase/firestore";
import { GetListResult } from "react-admin";
import { FirebaseDataProvider } from "react-admin-firebase";
import { firebaseAuth, firebaseConfig, firebaseFireStore } from "../firebase";
import { firebaseAuthProvider } from "./auth-provider";
import { providerOptions } from "./options";

export const firebaseDataProvider = FirebaseDataProvider(firebaseConfig, providerOptions);

firebaseDataProvider.getList = async (resource, params): Promise<GetListResult> => {
  const user = await firebaseAuthProvider.getAuthUser();
  await firebaseAuth.updateCurrentUser(user);

  const { page, perPage } = params.pagination;

  const { field, order } = params.sort;
  const fixedOrder = order.toLowerCase() as OrderByDirection;
  const filter = { ...params.filter, ...params.meta };

  const ref = collection(firebaseFireStore, resource);

  const filters = Object.keys(filter)
    .map(key => {
      const value = filter[key];
      if (!value?.op) {
        return where(key, "==", filter[key]);
      }

      return where(key, value.op, value.value);
    });

  let resultsQuery: Query;
  const skip = (page - 1) * perPage;
  if (page <= 0) {
    resultsQuery = query(ref, ...filters, orderBy(field, fixedOrder));
  }
  else if (skip > 0) {
    const first = query(ref, ...filters, orderBy(field, fixedOrder), limit(skip));
    const documentSnapshots = await getDocs(first);

    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    resultsQuery = query(ref, ...filters, orderBy(field, fixedOrder),
      startAfter(lastVisible), limit(perPage));
  } else {
    resultsQuery = query(ref, ...filters, orderBy(field, fixedOrder), limit(perPage));
  }

  const resultsQuerySnapshot = await getDocs(resultsQuery);
  const data = resultsQuerySnapshot.docs.map(document => {
    const result = {};
    const documentData = document.data();
    for (const key of Object.keys(documentData)) {
      const value = documentData[key];
      if (documentData[key] instanceof Timestamp) {
        const date = value as Timestamp;
        result[key] = date.toDate();
      } else {
        result[key] = value;
      }
    }

    return result;
  });
  const countQuery = query(ref, ...filters);

  const countSnapshot = await getCountFromServer(countQuery);
  const total = countSnapshot.data().count;

  return {
    data,
    total
  };

};