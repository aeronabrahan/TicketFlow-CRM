import { useEffect, useState } from "react";

import { getLatestTickets } from "../../services/tickets";

import type { Ticket } from "../../types/ticket";

function RecentTickets() {

    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {

        loadTickets();

    }, []);

    async function loadTickets() {

        const data = await getLatestTickets();

        setTickets(data);

    }

    return (

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">

            <h2 className="text-xl font-semibold mb-4">

                Recent Tickets

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="text-left border-b">

                        <th className="pb-3">Customer</th>

                        <th>Subject</th>

                        <th>Status</th>

                        <th>Priority</th>

                    </tr>

                </thead>

                <tbody>

                    {tickets.map(ticket => (

                        <tr
                            key={ticket.id}
                            className="border-b hover:bg-gray-50"
                        >

                            <td className="py-3">

                                {ticket.customer}

                            </td>

                            <td>

                                {ticket.subject}

                            </td>

                            <td>

                                {ticket.status}

                            </td>

                            <td>

                                {ticket.priority}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default RecentTickets;