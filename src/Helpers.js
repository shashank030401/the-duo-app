import { storage } from "./config-firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const handleImageUpload = async (file, userName) => {
  if (file == null || file === undefined) return "";
  const storageRef = ref(storage, `${userName}/${file.name + v4()}`);
  return await uploadBytes(storageRef, file).then(async (snapshot) => {
    return await getDownloadURL(snapshot.ref).then((url) => {
      return url;
    });
  });
};
