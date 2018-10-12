import * as functions from 'firebase-functions';
import * as express from 'express';
import * as _cors from 'cors';

import { functionsConfig } from '../functions-config';

export class Search {    
    constructor(db: FirebaseFirestore.Firestore) {
        this.searchAPI = express();
        const cors = _cors;
        const CorsOptions = {
            origin: functionsConfig.whitelist,
            optionsSuccessStatus: 200
        }
        
        this.searchAPI.use(cors(CorsOptions));
        this.searchAPI.use(express.json());
        this.searchAPI.disable('etag');

        const usersCollection = db.collection('users');

        // //Get search by UID
        // this.searchAPI.get('/:uid', (req, res) => {
        //     const uid = req.params['uid'];

        //     usersCollection.doc(uid).get().then(function(search) {
        //         if (search.exists) {
        //             res.send(search.data())
        //         } else {
        //             console.log("No such search!");
        //         }
        //     }).catch(function(error) {
        //         console.log("Error getting document:", error);
        //     });
        // });

    }

    db;
    searchAPI;

    toFunction() {
        return functions.https.onRequest(this.searchAPI);
    }
}