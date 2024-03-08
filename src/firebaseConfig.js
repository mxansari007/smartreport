import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeAppCheck,  ReCaptchaV3Provider  } from "firebase/app-check";
const firebaseConfig = {
  apiKey: "AIzaSyBsTJF134vv8FcktrIA8LnHLoDH9ZCqxFk",
  authDomain: "smartreport-8317a.firebaseapp.com",
  projectId: "smartreport-8317a",
  storageBucket: "smartreport-8317a.appspot.com",
  messagingSenderId: "752036967730",
  appId: "1:752036967730:web:5124696afa84c72fc2532b",
  measurementId: "G-5K32L5865V"
};


const app = initializeApp(firebaseConfig);



// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// // key is the counterpart to the secret key you set in the Firebase console.
// Create a ReCaptchaEnterpriseProvider instance using your reCAPTCHA Enterprise
// site key and pass it to initializeAppCheck().
// key is the counterpart to the secret key you set in the Firebase console.
self.FIREBASE_APPCHECK_DEBUG_TOKEN = 'FAC067BF-FB65-4DA2-83AD-30E6B96A309F';
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('mycaptcha'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});



export const authentication = getAuth(app);

