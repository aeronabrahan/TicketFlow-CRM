import type { Ticket } from "../../types/ticket";

interface Props {
    tickets: Ticket[];
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

function TicketTable({

    tickets

}: Props) {

    return (

        <div className="overflow-hidden rounded-2xl bg-white shadow border border-slate-200">

            <table className="min-w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="px-6 py-4 text-left">Customer</th>

                        <th className="px-6 py-4 text-left">Subject</th>

                        <th className="px-6 py-4 text-left">Status</th>

                        <th className="px-6 py-4 text-left">Priority</th>

                        <th className="px-6 py-4 text-left">Category</th>

                        <th className="px-6 py-4 text-left">Assigned</th>

                        <th className="px-6 py-4 text-center">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        tickets.map((ticket) => (

                            <tr
                                key={ticket.id}
                                className="border-t hover:bg-slate-50 transition"
                            >

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

                                        <button className="rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">

                                            View

                                        </button>

                                        <button className="rounded-lg bg-amber-500 px-3 py-1 text-white hover:bg-amber-600">

                                            Edit

                                        </button>

                                        <button className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600">

                                            Delete

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default TicketTable;