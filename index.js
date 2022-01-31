const admin = require('./node_modules/firebase-admin');
const prompt = require('prompt-sync')();
const serviceAccount = require("./serviceAccountKey.json");
const data = require("./data.json"); //make sure you clean json file to avoid errors
const collectionKey = prompt('Enter collection key: ');

/** Some things to remember 
 * 1. use https://csvjson.com/csv2json to convert your CSV file to JSON. 
 *    On output remember to select Hash and not Array. Convert then Download.
 * 2. once converted, download json file and save in project folder as data.json
 * 3. generate and download serviceaccountkey.json file from your firebase account
 * 4. always rename collectionKey to the name of your collection
*/

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<firebase_project>.firebaseio.com"
});

const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

if (data && (typeof data === "object")) {
   Object.keys(data).forEach(docKey => {
   firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
      console.log("Document " + docKey + " successfully written!");
   }).catch((error) => {
      console.error("Error writing document: ", error);
   });
});
}

