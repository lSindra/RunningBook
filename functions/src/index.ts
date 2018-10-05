import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _cors from 'cors';
import * as express from 'express';
import * as encrypt from 'crypto-js/sha256';

import { functionsConfig } from './functions-config';
import { User } from '../_models/user';

// Config
admin.initializeApp(functions.config().firebase);

const options: _cors.CorsOptions = {
    origin: functionsConfig.whitelist
};
const cors = _cors;
const app = express();
const db = admin.firestore();

export const test = functions.https.onRequest((request: functions.Request, response: functions.Response) => {
    cors(options)(request, response, () => {
        response.send("Test")
    });
});

app.get('/users', (req, res) => {
    res.send(db.doc('/users'));
});

app.get('/users/:username', (req, res) => {
    const username = req.params['username'];

    res.send(db.doc(`/users/${username}`));
});

//Register user
app.post('/users', (req, res) => {
    const user = new User;

    user.username = req.body.username;
    user.password = encrypt(req.body['password']);
    user.name = req.body['name'];
    user.birthday = req.body['birthday'];
    user.city = req.body['city'];

    db.collection('/users').add({user}).then(() => {
        res.status(201).send(req.body);
    });    
});

//Update user
app.put('/users/:username', (req, res) => {
    //UPDATE MODULAR
});

//Delete user
app.delete('/users/:username', (req, res) => {
    //DONT DELETE, CHANGE STATUS
});

exports.api = functions.https.onRequest(app);
