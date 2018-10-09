import { UserInfo } from 'firebase';

export class RunningUserModel implements UserInfo {
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
    uid: string;
    //Extended
    username: string;
    birthday: Date;
    city: string;
}

export function cleanUserModel(user: RunningUserModel): RunningUserModel {
    if (!user.username) {
        user.username = "";
    }
    if (!user.birthday) {
        user.birthday = new Date();
    }
    if (!user.city) {
        user.city = "";
    }

    return user;
}