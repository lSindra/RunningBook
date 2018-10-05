import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as encrypt from 'crypto-js/sha256';

import { UserModel } from '../_models/user-model';
import { UserData } from '../_data/user-data';

// Config
admin.initializeApp(functions.config().firebase);

const app = express();
const db = admin.firestore();

app.get('', (req, res) => {
    let users = []
    db.collection('users').get().then(snapshot => {
        snapshot.forEach(doc => {
            const user = doc.data() as UserData;
            users = users.concat(user);
        });
        res.send(users)
    }).catch(reason => {
        res.send(reason)
    })
});

app.get(':username', (req, res) => {
    const username = req.params['username'];

    db.collection('users').where('username', '==', username).get().then(snapshot => {
        res.send(`Total: ${snapshot[0].doc.data() as UserData}`);
    });
});

//Register user
app.post('', (req, res) => {
    const user = new UserModel;

    user.username = req.body.username;
    user.password = encrypt(req.body['password']);
    user.name = req.body['name'];
    user.birthday = req.body['birthday'];
    user.city = req.body['city'];

    db.collection('users').add({user}).then(() => {
        res.status(201).send(req.body);
    });    
});

//Update user
app.put(':username', (req, res) => {
    //UPDATE MODULAR
});

//Delete user
app.delete(':username', (req, res) => {
    //DONT DELETE, CHANGE STATUS
});

exports.users = functions.https.onRequest(app);
