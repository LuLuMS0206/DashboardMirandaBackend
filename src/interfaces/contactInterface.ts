export interface Contact {
    id: number;
    date: string;
    client: {
        name: string;
        email: string;
        phone: string;
    };
    subject: string;
    comment: string;
    status: 'public' | 'archived';
}
