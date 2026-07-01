import api from "./api";

import type {
    CreateTicketRequest,
    UpdateTicketRequest,
} from "../types/ticket";

export async function getTickets() {

    const response = await api.get("/tickets");

    return response.data;

}

export async function getLatestTickets() {

    const response = await api.get("/tickets/latest");

    return response.data;

}

export async function createTicket(
    ticket: CreateTicketRequest
) {

    const response = await api.post(
        "/tickets",
        ticket
    );

    return response.data;

}

export async function updateTicket(
    id: number,
    ticket: UpdateTicketRequest
) {

    const response = await api.put(
        `/tickets/${id}`,
        ticket
    );

    return response.data;

}

export async function deleteTicket(id: number) {

    const response = await api.delete(
        `/tickets/${id}`
    );

    return response.data;

}

export async function searchTickets(search: string) {

    const response = await api.get(
        `/tickets/search?search=${search}`
    );

    return response.data;

}

export async function filterTickets(
    status?: string,
    priority?: string,
    category?: string
) {

    const params = new URLSearchParams();

    if (status)
        params.append("status", status);

    if (priority)
        params.append("priority", priority);

    if (category)
        params.append("category", category);

    const response = await api.get(
        `/tickets/filter?${params.toString()}`
    );

    return response.data;

}