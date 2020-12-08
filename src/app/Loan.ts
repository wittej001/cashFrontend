export interface Loan{
    id : number;
    principal : number;
    rate : number;
    term : number;
    payments : any[];
    type: string;
};