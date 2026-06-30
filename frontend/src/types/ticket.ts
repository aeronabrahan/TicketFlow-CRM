export interface Ticket {
    id: number;
    customer: string;
    subject: string;
    category: string;
    priority: string;
    status: string;
    created_at: string;
    updated_at: string;
    assigned_to_id?: number | null;
}