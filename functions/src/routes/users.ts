import * as functions from 'firebase-functions';
import * as express from 'express';
import * as _cors from 'cors';

import { functionsConfig } from '../functions-config';

export class Users {
    constructor(db: FirebaseFirestore.Firestore) {
        this.userAPI = express();
        const cors = _cors;
        const CorsOptions = {
            origin: functionsConfig.whitelist,
            optionsSuccessStatus: 200
        }

        this.userAPI.use(cors(CorsOptions));
        this.userAPI.use(express.json());
        this.userAPI.disable('etag');

        const userCollection = db.collection('users');

        //Get user by UID
        this.userAPI.get('/:uid', (req, res) => {
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
        this.userAPI.post('/', (req, res) => {
            const user = req.body;
            userCollection.doc(user.uid).set((user)).then(() => {
                res.sendStatus(201);
            }).catch(function(error) {
                console.log("Error updating user: ", error);
            });
        });
    }

    db;
    userAPI;

    toFunction() {
        return functions.https.onRequest(this.userAPI);
    }
}
