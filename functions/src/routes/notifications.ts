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
    })

    this.notificationAPI.delete('/:uid', (req, res) => {
      const notificationID = req.params['uid'];

      notificationCollection.where("uid", "==", notificationID).get().then(function(snapshot) {
        snapshot.forEach(function(doc) {
          doc.ref.delete()
          .catch(error => {
            console.log("Error deleting document:", error);
          });
        });
      }).catch(error => {
          console.log("Error getting document:", error);
      });
    })

    this.notificationAPI.post('/', (req, res) => {
      const notification = req.body;

      notificationCollection.add(notification)
      .then(function(docRef) {
        notification.uid = docRef.id;
        notificationCollection.doc(docRef.id).set(notification).then(() => {
          res.sendStatus(201);
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
      });
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    })
  }

  db;
  notificationAPI;

  toFunction() {
      return functions.https.onRequest(this.notificationAPI);
  }
}
