import * as functions from 'firebase-functions';
import * as express from 'express';
import * as _cors from 'cors';

import { functionsConfig } from '../functions-config';

export class NotificationsAPI {
  constructor(db: FirebaseFirestore.Firestore) {
    this.notificationAPI = express();
    const cors = _cors;
    const CorsOptions = {
      origin: functionsConfig.whitelist,
      optionsSuccessStatus: 200
    }

    this.notificationAPI.use(cors(CorsOptions));
    this.notificationAPI.use(express.json());
    this.notificationAPI.disable('etag');

    const notificationCollection = db.collection('notifications');

    //Get notification by user id
    this.notificationAPI.get('/:userID', (req, res) => {
      const userID = req.params['userID'];

      notificationCollection.where("userID", "==", userID).get().then(function(snapshot) {
        const notifications = snapshot.docs.map(doc => {
            return doc.data();
        });
        res.json(notifications);
      }).catch(error => {
          console.log("Error getting document:", error);
      });
    }
  )}

  db;
  notificationAPI;

  toFunction() {
      return functions.https.onRequest(this.notificationAPI);
  }
}
