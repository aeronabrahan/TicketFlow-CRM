import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import TicketTable from "../components/tickets/TicketTable";

import { getTickets } from "../services/tickets";

import type { Ticket } from "../types/ticket";

export default function Tickets() {

    const [tickets, setTickets] = useState<Ticket[]>([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadTickets();

    }, []);

    async function loadTickets() {

        const data = await getTickets();

        setTickets(data);

    }

    const filteredTickets = tickets.filter(ticket =>

        ticket.customer.toLowerCase().includes(search.toLowerCase()) ||

        ticket.subject.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <MainLayout>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Tickets

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Manage customer support requests

                    </p>

                </div>

                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">

                    + New Ticket

                </button>

            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">

                <input

                    type="text"

                    placeholder="Search tickets..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="w-full rounded-xl border px-4 py-3"

                />

            </div>

            <TicketTable tickets={filteredTickets} />

        </MainLayout>

    );

}