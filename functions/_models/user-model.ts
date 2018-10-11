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
    level: number;
    experience: number;
}