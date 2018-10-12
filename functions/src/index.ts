import * as admin from 'firebase-admin';

import { Users } from './routes/users';
import { Challenges } from './routes/challenges';
import { Friends } from './routes/friends';

// Config
admin.initializeApp();
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

const userAPI = new Users(db);
const challengeAPI = new Challenges(db);
const friendsAPI = new Friends(db);

exports.userAPI = userAPI.toFunction();
exports.challengeAPI = challengeAPI.toFunction();
exports.friendsAPI = friendsAPI.toFunction();
