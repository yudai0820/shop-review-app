import firebase from 'firebase/app';
import 'firebase/firestore';
import Constants from 'expo-constants';

import { Shop } from '../types/shop';

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest!.extra!.firebase);
}

export const getShops = async () => {
  try {
    const snapshot = await firebase.firestore().collection('shops').get();

    const shops = snapshot.docs.map((doc) => doc.data() as Shop);
    return shops;
  } catch (e) {
    console.log(e);
    return [];
  }
};
