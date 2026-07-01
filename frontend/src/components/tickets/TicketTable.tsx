import type { Ticket } from "../../types/ticket";

import TicketRow from "./TicketRow";

interface Props {
    tickets: Ticket[];
    onView: (ticket: Ticket) => void;
    onEdit: (ticket: Ticket) => void;
    onDelete: (ticket: Ticket) => void;
}

export default function TicketTable({
    tickets,
    onView,
    onEdit,
    onDelete,
}: Props) {

    return (

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow">

            <table className="min-w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="px-6 py-4 text-left">
                            Customer
                        </th>

                        <th className="px-6 py-4 text-left">
                            Subject
                        </th>

                        <th className="px-6 py-4 text-left">
                            Status
                        </th>

                        <th className="px-6 py-4 text-left">
                            Priority
                        </th>

                        <th className="px-6 py-4 text-left">
                            Category
                        </th>

                        <th className="px-6 py-4 text-left">
                            Assigned
                        </th>

                        <th className="px-6 py-4 text-center">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {tickets.map((ticket) => (

                        <TicketRow
                            key={ticket.id}
                            ticket={ticket}
                            onView={onView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

}