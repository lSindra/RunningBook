import * as admin from 'firebase-admin';

import { Users } from './routes/users';
import { Challenges } from './routes/challenges';
import { Friends } from './routes/friends';
import { IndexSearch } from './index-search';
import { NotificationsAPI } from './routes/notifications';

// Config
admin.initializeApp();
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

const userAPI = new Users(db);
const challengeAPI = new Challenges(db);
const friendsAPI = new Friends(db);
const notificationsAPI = new NotificationsAPI(db);
const indexSearch = new IndexSearch();

exports.userAPI = userAPI.toFunction();
exports.challengeAPI = challengeAPI.toFunction();
exports.friendsAPI = friendsAPI.toFunction();
exports.notificationsAPI = notificationsAPI.toFunction();

exports.indexUser = indexSearch.listenToCreation('users');
exports.updateUser = indexSearch.listenToUpdate('users');
exports.unindexUser = indexSearch.listenToDeletion('users');

exports.indexChallenges = indexSearch.listenToCreation('challenges');
exports.updateChallenges = indexSearch.listenToUpdate('challenges');
exports.unindexChallenges = indexSearch.listenToDeletion('challenges');
