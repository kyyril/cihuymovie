import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useToast } from "@chakra-ui/react";

export const useFirestore = () => {
  const toast = useToast();
  //add new document
  const addDocument = async (collectionName: any, data: any) => {
    const docRef = await addDoc(collection(db, collectionName), data);
  };

  const addToWatchlist = async (userId: any, dataId: any, data: any) => {
    try {
      if (await checkIfInWatchlist(userId, dataId)) {
        toast({
          title: "Add Error",
          description: "This item already in watchlist",
          duration: 5000,
          status: "warning",
          isClosable: true,
        });
        return false;
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
      toast({
        title: "Success add",
        description: "Success adding to watchlist",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error(error, "error adding to watchlist");
      toast({
        title: "Error",
        description: "Error adding to watchlist",
        status: "error",
        isClosable: true,
      });
    }
  };

  return {
    addDocument,
    addToWatchlist,
  };
};

const checkIfInWatchlist = async (userId: any, dataId: any) => {
  const docRef = doc(
    db,
    "users",
    userId.toString(),
    "watchlist",
    dataId?.toString()
  );
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};
