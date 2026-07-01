import Modal from "../common/Modal";
import type { Ticket } from "../../types/ticket";

interface Props {
    ticket: Ticket | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function TicketDetailsModal({
    ticket,
    isOpen,
    onClose,
}: Props) {

    if (!ticket) return null;

    return (
        <Modal
            isOpen={isOpen}
            title="Ticket Details"
            onClose={onClose}
        >
            <div className="space-y-6">

                <div>
                    <p className="text-sm text-slate-500">
                        Customer
                    </p>

                    <p className="font-medium">
                        {ticket.customer}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-slate-500">
                        Subject
                    </p>

                    <p className="font-medium">
                        {ticket.subject}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-slate-500">
                        Description
                    </p>

                    <p className="whitespace-pre-wrap">
                        {ticket.description || "-"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-5">

                    <div>
                        <p className="text-sm text-slate-500">
                            Category
                        </p>

                        <p>{ticket.category}</p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Priority
                        </p>

                        <p>{ticket.priority}</p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Status
                        </p>

                        <p>{ticket.status}</p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Assigned To
                        </p>

                        <p>
                            {ticket.assigned_to_id ?? "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Created
                        </p>

                        <p>
                            {new Date(
                                ticket.created_at
                            ).toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Updated
                        </p>

                        <p>
                            {new Date(
                                ticket.updated_at
                            ).toLocaleString()}
                        </p>
                    </div>

                </div>

            </div>
        </Modal>
    );
}