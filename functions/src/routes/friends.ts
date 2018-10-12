import * as functions from 'firebase-functions';
import * as express from 'express';
import * as _cors from 'cors';

import { functionsConfig } from '../functions-config';

export class Friends {    
    constructor(db: FirebaseFirestore.Firestore) {
        this.friendsAPI = express();
        const cors = _cors;
        const CorsOptions = {
            origin: functionsConfig.whitelist,
            optionsSuccessStatus: 200
        }
        
        this.friendsAPI.use(cors(CorsOptions));
        this.friendsAPI.use(express.json());
        this.friendsAPI.disable('etag');

        // const friendsCollection = db.collection('friends');
        const friendsCollection = db.collection('user-relation');

        //Get friends by user UID
        this.friendsAPI.get('/my-friends/:uid', (req, res) => {
            const uid = req.params['uid'];

            friendsCollection.where("relating-user", "==", uid).get().then(function(snapshot) {
                let friends = snapshot.docs.map(doc => {
                    return doc.data();
                });
                res.json(friends);
            }).catch(error => {
                console.log("Error getting document:", error);
            });
        });

        // //Get friends by user UID and TYPE
        this.friendsAPI.get('/my-friends-with-type/:uid/:type', (req, res) => {
            const uid = req.params['uid'];
            const type = req.params['type'];
            let query;

            query = query.where("relating-user", "==", uid);
            query = query.where("type", "==", type);

            query.get().then(function(snapshot) {
                let friends = snapshot.docs.map(doc => {
                    return doc.data();
                });
                res.json(friends);
            }).catch(error => {
                console.log("Error getting document:", error);
            });
        });

        //Get relationship by both UID
        this.friendsAPI.get('/relationship/:relatingID/:relatedID', (req, res) => {
            const relatingID = req.params['relatingID'];
            const relatedID = req.params['relatedID'];
            let query;

            query = query.where("relating-user", "==", relatingID);
            query = query.where("related-user", "==", relatedID);

            query.get().then(function(relation) {
                if (relation.exists) {
                    res.send(relation.data())
                } else {
                    console.log("No such relation!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        });
    }

    db;
    friendsAPI;

    toFunction() {
        return functions.https.onRequest(this.friendsAPI);
    }
}