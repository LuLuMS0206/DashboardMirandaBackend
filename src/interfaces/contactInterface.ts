export interface Contact {
    id: number;
    date: string;
    client: {
        name: string;
        email: string;
    };
    subject: string;
    comment: string;
    status: 'public' | 'archived';
}