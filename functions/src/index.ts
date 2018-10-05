import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as _cors from 'cors';
import * as encrypt from 'crypto-js';
import * as bodyParser from 'body-parser';

import { UserModel } from '../_models/user-model';
import { UserData } from '../_data/user-data';
import { functionsConfig } from './functions-config';

// Config
admin.initializeApp(functions.config().firebase);

const app = express();
const db = admin.firestore();
const cors = _cors;
const CorsOptions = {
    origin: functionsConfig.whitelist,
    optionsSuccessStatus: 200
  }

app.use(cors(CorsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.settings({ timestampsInSnapshots: true });

app.get('/', (req, res) => {
    console.log("ALL users")
    db.collection('users').get().then(snapshot => {
        snapshot.docs.map(doc => res.send(doc.data()));
    }).catch(reason => {
        res.send(reason)
    })
});

app.get('/:username', (req, res) => {
    const username = req.params['username'];

    console.log(`Get ${username}`);

    db.collection('users').where('username', '==', username).get().then(snapshot => {
        snapshot.docs.map(doc => res.send(doc.data()));        
    }).catch(reason => {
        res.send(reason)
    })
});

//Register user
app.post('/', (req, res) => {
    console.log("Registering");

    db.collection('users').add({
        username: req.body.username,
        // password: encrypt.SHA256(req.body["password"]),
        // name: req.body["name"],
        // birthday: admin.firestore.Timestamp.fromDate(req.body["birthday"]),
        // city: req.body["city"]
    }).then(() => {
        res.status(201).send(req.body);
    }).catch(reason => {
        res.send(reason)
    })  
});

//Update user
app.put('/:username', (req, res) => {
    //UPDATE MODULAR
});

//Delete user
app.delete('/:username', (req, res) => {
    //DONT DELETE, CHANGE STATUS
});

exports.users = functions.https.onRequest(app);
