const admin = require("firebase-admin");
const serviceAccount = require("./service-key.json");

const data = require("./core-data.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),  
  databaseURL: "https://running-book.firebaseio.com"
});

const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


function isCollection(data, path, depth) {
  if (
    typeof data != 'object' ||
    data == null ||
    data.length === 0 ||
    isEmpty(data)
  ) {
    return false;
  }

  for (const key in data) {
    if (typeof data[key] != 'object' || data[key] == null) {
      return false;
    }
  }

  return true;
}

function isEmpty(obj) {
  for(const key in obj) {
    if(obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

async function upload(data, path) {
  return await firestore
    .doc(path.join('/'))
    .set(data)
    .then(() => console.log(`Document ${path.join('/')} uploaded.`))
    .catch(() => console.error(`Could not write document ${path.join('/')}.`));
}

async function resolve(data, path = []) {
  if (path.length > 0 && path.length % 2 == 0) {

    const documentData = Object.assign({}, data);

    for (const key in data) {
      if (isCollection(data[key], [...path, key])) {
        delete documentData[key];
        resolve(data[key], [...path, key]);
      }
    }

    if (!isEmpty(documentData)) {
      await upload(documentData, path);
    }
  } else {
    for (const key in data) {
      await resolve(data[key], [...path, key]);
    }
  }
}

resolve(data);