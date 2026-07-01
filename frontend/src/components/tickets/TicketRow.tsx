import { Eye, Pencil, Trash2 } from "lucide-react";

import type { Ticket } from "../../types/ticket";

interface TicketRowProps {
    ticket: Ticket;
    onView: (ticket: Ticket) => void;
    onEdit: (ticket: Ticket) => void;
    onDelete: (ticket: Ticket) => void;
}

function getStatusClass(status: string) {
    switch (status) {
        case "Open":
            return "bg-green-100 text-green-700";

        case "Pending":
            return "bg-yellow-100 text-yellow-700";

        case "Closed":
            return "bg-red-100 text-red-700";

        default:
            return "bg-slate-100 text-slate-700";
    }
}

function getPriorityClass(priority: string) {
    switch (priority) {
        case "High":
            return "bg-red-100 text-red-700";

        case "Medium":
            return "bg-orange-100 text-orange-700";

        case "Low":
            return "bg-blue-100 text-blue-700";

        default:
            return "bg-slate-100 text-slate-700";
    }
}

export default function TicketRow({
    ticket,
    onView,
    onEdit,
    onDelete,
}: TicketRowProps) {
    return (
        <tr className="border-t hover:bg-slate-50 transition">
            <td className="px-6 py-4">
                {ticket.customer}
            </td>

            <td className="px-6 py-4 font-medium">
                {ticket.subject}
            </td>

            <td className="px-6 py-4">
                <span
                    className={`rounded-full px-3 py-1 text-sm ${getStatusClass(ticket.status)}`}
                >
                    {ticket.status}
                </span>
            </td>

            <td className="px-6 py-4">
                <span
                    className={`rounded-full px-3 py-1 text-sm ${getPriorityClass(ticket.priority)}`}
                >
                    {ticket.priority}
                </span>
            </td>

            <td className="px-6 py-4">
                {ticket.category}
            </td>

            <td className="px-6 py-4">
                {ticket.assigned_to_id ?? "-"}
            </td>

            <td className="px-6 py-4">
                <div className="flex justify-center gap-2">

                    <button
                        onClick={() => onView(ticket)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-100"
                        title="View"
                    >
                        <Eye size={18} />
                    </button>

                    <button
                        onClick={() => onEdit(ticket)}
                        className="rounded-lg p-2 text-amber-600 hover:bg-amber-100"
                        title="Edit"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        onClick={() => onDelete(ticket)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-100"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>

                </div>
            </td>
        </tr>
    );
}