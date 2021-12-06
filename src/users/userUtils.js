// Require and initialise Firebase Admin & Client
const firebaseAdmin = require('firebase-admin');
const firebaseClient = require('firebase/app');

const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

firebaseClient.initializeApp(JSON.parse(process.env.FIREBASE_CLIENT_CONFIG));

// Setup user signup
async function signupUser(userDetails) {
  return firebaseAdmin
    .auth()
    .createUser({
      email: userDetails.email,
      password: userDetails.password,
      username: userDetails.username,
      emailVerified: true,
      // photoURL: "somefreestockwebsite.com/image/someimage.png"
    })
    .then(async (userRecord) => {
      console.log(`\n-- Raw userRecord is ${JSON.stringify(userRecord)}\n`);
      // Set a custom clain, or authorisation or role data
      const defaultUserClaims = firebaseAdmin
        .auth()
        .setCustomUserClaims(userRecord.uid, {
          admin: false,
          regularUser: true,
        })
        .then(() => {
          console.log('Set default claims to the new user.');
        });
      return userRecord;
    })
    .catch((error) => {
      console.log(`Internal sign-up function error:\n--${error}`);
      return { error };
    });
}

// Sign-in Function
async function signInUser(userDetails) {
  const firebaseClientAuth = getAuth();

  const signInResult = signInWithEmailAndPassword(
    firebaseClientAuth,
    userDetails.email,
    userDetails.password,
  )
    .then(async (userRecod) => {
      const userIdToken = await firebaseClientAuth.currentUser.getIdTokenResult(
        false,
      );
      console.log(`userIdToken is\n--${JSON.stringify(userIdToken)}`);

      return {
        idToken: userIdToken.token,
        refreshToken: userCredential.user.refreshToken,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        uid: userCredential.user.uid,
      };
    })
    .catch((error) => {
      console.log(`Internal sign-in error:\n->${error}`);
      return { error };
    });
  return signInResult;
}

module.exports = {
  signupUser,
  signInUser,
};
