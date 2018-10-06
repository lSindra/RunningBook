import { WordArray } from "crypto-js";

export class UserModel {
    username: string;
    password: WordArray;
    name: string;
    birthday: Date;
    city: string;
}