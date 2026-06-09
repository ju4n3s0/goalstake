export interface Challenge {
    id: string;
    title: string;
    description: string;
    verification: string;
    durationDays: number;
    entryAmount: number;
    type: "verified" | "custom";
    
    participants?: number;
    prizePool?: number;
}