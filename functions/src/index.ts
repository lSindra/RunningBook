import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as _cors from 'cors';

import { functionsConfig } from './functions-config';

// Config
admin.initializeApp();

const app = express();
const db = admin.firestore();
const cors = _cors;
const CorsOptions = {
    origin: functionsConfig.whitelist,
    optionsSuccessStatus: 200
  }

app.use(cors(CorsOptions));
app.use(express.json());
app.disable('etag');
db.settings({ timestampsInSnapshots: true });

const userCollection = db.collection('users');

//Get user by UID
app.get('/:uid', (req, res) => {
    const uid = req.params['uid'];

    userCollection.doc(uid).get().then(function(user) {
        if (user.exists) {
            res.send(user.data())
        } else {
            console.log("No such user!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
    });
});

//Update user
app.post('/', (req, res) => {
    let user = req.body;
    userCollection.doc(user.uid).set((user)).then(() => res.sendStatus(201));
});

exports.userAPI = functions.https.onRequest(app);
