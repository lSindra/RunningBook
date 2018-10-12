import * as functions from 'firebase-functions';
import * as algoliasearch from 'algoliasearch';

const env = functions.config();
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('user_search');

export class IndexSearch {
    listenToCreation(collection: string): functions.CloudFunction<functions.firestore.DocumentSnapshot> {
        return functions.firestore
            .document(collection + '/{uid}')
            .onCreate((snap, contect) => {
                const data = snap.data();
                const objectId = snap.id;
                return index.addObject({
                    objectId,
                    ...data
            });
        });
    }
    listenToDeletion(collection: string): functions.CloudFunction<functions.firestore.DocumentSnapshot> {
        return functions.firestore
            .document(collection + '/{uid}')
            .onDelete((snap, context) => {
                const objectId = snap.id;
                return index.deleteObject(objectId);
        });
    }
}