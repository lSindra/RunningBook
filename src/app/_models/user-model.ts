import { UserInfo } from 'firebase';

export class RunningUserModel implements UserInfo {
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
    uid: string;
    // Extended
    username: string;
    birthday: Date;
    city: string;
    level: number;
    experience: number;
}

export function cleanUserModel(user: RunningUserModel): RunningUserModel {
    if (!user.username) {
        user.username = '';
    }
    if (!user.birthday) {
        user.birthday = new Date();
    }
    if (!user.city) {
        user.city = '';
    }
    if (!user.photoURL) {
        user.photoURL = 'https://www.w3schools.com/howto/img_avatar.png';
    }

    return user;
}
