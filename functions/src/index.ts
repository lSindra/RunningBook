import * as admin from 'firebase-admin';

import { Users } from './routes/users';
import { Challenges } from './routes/challenges';

// Config
admin.initializeApp();

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

const userAPI = new Users(db);
const challengeAPI = new Challenges(db);

exports.userAPI = userAPI.toFunction();
exports.challengeAPI = challengeAPI.toFunction();
