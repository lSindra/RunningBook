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

    //Get relations by user UID
    this.friendsAPI.get('/my-relations/:uid', (req, res) => {
        const uid = req.params['uid'];

        friendsCollection.where("relationUser", "==", uid).get().then(function(snapshot) {
            const friends = snapshot.docs.map(doc => {
                return doc.data();
            });
            res.json(friends);
        }).catch(error => {
            console.log("Error getting document:", error);
        });
    });

    // //Get relations by user UID and TYPE
    this.friendsAPI.get('/my-relations-with-type/:uid,:type', (req, res) => {
        const uid = req.params['uid'];
        const type = req.params['type'];

        let query = friendsCollection.where("relationUser", "==", uid);
        query = query.where("type", "==", type);

        query.get().then(function(snapshot) {
            const friends = snapshot.docs.map(doc => {
                return doc.data();
            });
            res.json(friends);
        }).catch(error => {
            console.log("Error getting document:", error);
        });
    });

    //Get relationship by both UID
    this.friendsAPI.get('/:relationUser,:relatedUser', (req, res) => {
        const relatingID = req.params['relationUser'];
        const relatedID = req.params['relatedUser'];

        let query = friendsCollection.where("relationUser", "==", relatingID);
        query = query.where("relatedUser", "==", relatedID);

        query.get().then(function(snapshot) {
          if (snapshot.docs[0]) {
            const relation = snapshot.docs[0].data();
            res.json(relation);
          } else {
            res.json([]);
          }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    });

    //Update or Create relationship
    this.friendsAPI.post('/', (req, res) => {
      const relationship = req.body;

      let query = friendsCollection.where("relationUser", "==", relationship.relationUser);
      query = query.where("relatedUser", "==", relationship.relatedUser);
      query.get().then(function(snapshot) {
        if (!Array.isArray(snapshot.docs) || !snapshot.docs.length) {
          friendsCollection.doc().create((relationship)).then(() => {
            res.send(Promise.resolve(1));
          }).catch(function(error) {
              console.log("Error updating relationship: ", error);
          });
        } else {
          snapshot.docs.map(doc => {
            const relationshipUID = doc.id;

            if (relationshipUID && (doc.data().type !== 'friend' || relationship.type !== 'request')) {
              friendsCollection.doc(relationshipUID).set((relationship)).then(() => {
                res.send(Promise.resolve(1));
              }).catch(function(error) {
                  console.log("Error updating relationship: ", error);
              });
            };
          });
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
