import firebaseApp from "./firebaseApp";
import { getStorage } from "firebase/storage";

const storage = getStorage(firebaseApp);

export default storage;
