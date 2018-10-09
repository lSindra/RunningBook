import { RunningUserModel } from '../user-model';
import { UserInfo } from 'firebase';

export function populateRunningBookUserModel(user: UserInfo) {
    let runningUser = new RunningUserModel;

    runningUser.displayName= user.displayName;
    runningUser.email= user.email;
    runningUser.phoneNumber= user.phoneNumber;
    runningUser.photoURL= user.photoURL;
    runningUser.providerId= user.providerId;
    runningUser.uid= user.uid;

    //import from database
    
    return runningUser;
}