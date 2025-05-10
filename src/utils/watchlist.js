import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';



export const getUserWatchlist = async (uid) => {
  const docRef = doc(db, 'watchlists', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().symbols || [];
  } else {
    return [];
  }
};


export const addToWatchlist = async (uid, symbol) => {
  const docRef = doc(db, 'watchlists', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      symbols: arrayUnion(symbol),
    });
  } else {
    await setDoc(docRef, {
      symbols: [symbol],
    });
  }
};

export const removeFromWatchlist = async (uid, symbol) => {
  const docRef = doc(db, 'watchlists', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      symbols: arrayRemove(symbol),
    });
  }
};
