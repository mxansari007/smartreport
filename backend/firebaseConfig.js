

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSEGING_SENDER,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MESSUREMENTID
};

export default firebaseConfig;