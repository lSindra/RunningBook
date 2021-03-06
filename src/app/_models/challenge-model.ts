export class ChallengeModel {
    title: string;
    createdAt: Date;
    description: string;
    level: number;
    reward: number;
    participants: Array<string>;
    category: string;
    uid: string;
}