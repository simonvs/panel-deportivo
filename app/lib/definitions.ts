export type Match = {
    id: string;
    team: string;
    goals: number;
    assists: number;
    goaldifference: number;
    duration: number;
    date: string;
};

export type MatchesTable = {
    id: string;
    date: Date;
    team: string;
    goals: number;
    assists: number;
    goaldifference: number;
    duration: number;
};

