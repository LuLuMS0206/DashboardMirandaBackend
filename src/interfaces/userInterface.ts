export interface User {
    _id?: string; 
    name: string;
    email: string;
    startDate: string;
    description: string;
    contact: string;
    status: "ACTIVE" | "INACTIVE";
    foto: string;
    password?: string;
}
