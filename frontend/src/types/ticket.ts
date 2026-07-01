export interface Ticket {
    id: number;
    customer: string;
    subject: string;
    description: string;
    category: string;
    priority: string;
    status: string;
    created_at: string;
    updated_at: string;
    assigned_to_id?: number | null;
}

export interface CreateTicketRequest {
    customer: string;
    subject: string;
    description: string;
    category: string;
    priority: string;
}

export interface UpdateTicketRequest {
    subject?: string;
    description?: string;
    category?: string;
    priority?: string;
    status?: string;
    assigned_to_id?: number | null;
}