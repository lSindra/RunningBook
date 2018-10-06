import { WordArray } from "crypto-js";
import { Timestamp } from "firestore";

export class UserModel {
    username: string;
    password: WordArray;
    name: string;
    birthday: Timestamp;
    city: string;
}