import * as functions from 'firebase-functions';
import * as express from 'express';
import * as _cors from 'cors';

import { functionsConfig } from '../functions-config';

export class Challenges {
    constructor(db: FirebaseFirestore.Firestore) {
        this.challengeAPI = express();
        const cors = _cors;
        const CorsOptions = {
            origin: functionsConfig.whitelist,
            optionsSuccessStatus: 200
        }

        this.challengeAPI.use(cors(CorsOptions));
        this.challengeAPI.use(express.json());
        this.challengeAPI.disable('etag');

        const challengeCollection = db.collection('challenges');

        //Get all challenges
        this.challengeAPI.get('/', (req, res) => {
            challengeCollection.get().then(function(snapshot) {
                let challenges = snapshot.docs.map(doc => {
                    return doc.data();
                });
                res.json(challenges);
            }).catch(error => {
                console.log("Error getting document:", error);
            });
        });

        //Get challenge by UID
        this.challengeAPI.get('/:uid', (req, res) => {
            const uid = req.params['uid'];

            challengeCollection.doc(uid).get().then(function(challenge) {
                if (challenge.exists) {
                    res.send(challenge.data());
                } else {
                    console.log("No such challenge!");
                }
            }).catch(error => {
                console.log("Error getting document:", error);
            });
        });
    }

    db;
    challengeAPI;

    toFunction() {
        return functions.https.onRequest(this.challengeAPI);
    }
}
